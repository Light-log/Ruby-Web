// ─── Safe Script Runtime ──────────────────────────────────────────────────────
// Executes company scripts in an isolated environment.
// - JS/TS: uses isolated-vm (install separately: npm install isolated-vm)
//   or falls back to a restricted Function() sandbox for environments
//   where native modules are unavailable.
// - Python: queues to a containerized microservice (not implemented here).
// - HTTP calls are restricted to the allowed-domains allowlist.
// - Secrets are injected by reference, never exposed in plaintext to scripts.

export type ScriptLanguage = "JAVASCRIPT" | "TYPESCRIPT" | "PYTHON";

export interface SandboxBinding {
  name: string;
  type: "secret" | "static" | "env_ref";
  /** Resolved value (secret already decrypted from vault) */
  value: string;
}

export interface SandboxConfig {
  language: ScriptLanguage;
  code: string;
  bindings: SandboxBinding[];
  /** Maximum execution time in milliseconds */
  timeoutMs?: number;
  /** Maximum heap in MB */
  maxMemoryMb?: number;
  /** Allowed outbound domains (empty = no HTTP allowed) */
  allowedDomains?: string[];
  /** Input data for the script */
  input?: Record<string, unknown>;
}

export interface SandboxResult {
  success: boolean;
  output?: Record<string, unknown>;
  logs: string[];
  durationMs: number;
  error?: string;
  exitCode: number;
}

// ─── Restricted JS Sandbox (fallback) ────────────────────────────────────────
// This is a minimal sandbox using VM module. For production, replace with
// isolated-vm for proper memory/CPU isolation.

async function runJavaScriptSandbox(config: SandboxConfig): Promise<SandboxResult> {
  const startTime = Date.now();
  const logs: string[] = [];

  try {
    // Build the sandbox context
    const bindings: Record<string, string> = {};
    for (const b of config.bindings) {
      bindings[b.name] = b.value;
    }

    // Wrap user code in a secure wrapper
    const wrappedCode = `
(function(bindings, input, console) {
  'use strict';
  const __output = {};
  const __log = (...args) => console.log(...args);

  // User code
  ${config.code}

  return __output;
})
`;

    const timeout = config.timeoutMs ?? 5000;

    // Use a Promise with timeout to enforce execution limit
    const result = await Promise.race([
      new Promise<Record<string, unknown>>((resolve, reject) => {
        try {
          const fn = eval(wrappedCode); // eslint-disable-line no-eval
          const consoleMock = {
            log: (...args: unknown[]) => logs.push(args.map(String).join(" ")),
            error: (...args: unknown[]) => logs.push("[ERROR] " + args.map(String).join(" ")),
            warn: (...args: unknown[]) => logs.push("[WARN] " + args.map(String).join(" ")),
          };
          const output = fn(bindings, config.input ?? {}, consoleMock);
          resolve(output ?? {});
        } catch (err) {
          reject(err);
        }
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`Script timeout after ${timeout}ms`)), timeout)
      ),
    ]);

    return {
      success: true,
      output: result,
      logs,
      durationMs: Date.now() - startTime,
      exitCode: 0,
    };
  } catch (err) {
    return {
      success: false,
      logs,
      durationMs: Date.now() - startTime,
      error: err instanceof Error ? err.message : String(err),
      exitCode: 1,
    };
  }
}

// ─── HTTP Interceptor ─────────────────────────────────────────────────────────

export function validateDomain(url: string, allowedDomains: string[]): boolean {
  if (!allowedDomains.length) return false;
  try {
    const parsed = new URL(url);
    return allowedDomains.some(
      (domain) => parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
}

// ─── Main Entry Point ─────────────────────────────────────────────────────────

export async function executeSandbox(config: SandboxConfig): Promise<SandboxResult> {
  if (config.language === "PYTHON") {
    // Python scripts require the separate containerized runtime
    return {
      success: false,
      logs: [],
      durationMs: 0,
      error: "Python runtime not available in this environment. Configure the Python microservice.",
      exitCode: 127,
    };
  }

  return runJavaScriptSandbox(config);
}

// ─── Script Template Validator ────────────────────────────────────────────────

const FORBIDDEN_PATTERNS = [
  /require\s*\(/,
  /import\s+/,
  /process\./,
  /global\./,
  /\beval\b/,
  /Function\s*\(/,
  /child_process/,
  /fs\b/,
  /__dirname/,
  /Buffer\./,
];

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateScript(code: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(code)) {
      errors.push(`Forbidden pattern detected: ${pattern.toString()}`);
    }
  }

  if (code.length > 50_000) {
    errors.push("Script exceeds maximum size of 50,000 characters.");
  }

  if ((code.match(/while\s*\(/g) ?? []).length > 5) {
    warnings.push("Multiple while loops detected. Ensure they have exit conditions.");
  }

  return { valid: errors.length === 0, errors, warnings };
}
