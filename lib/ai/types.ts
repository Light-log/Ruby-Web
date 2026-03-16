// ─── AI Provider Router – Shared Types ────────────────────────────────────────

export type AIProviderName = "openai" | "gemini";

export type AIUseCase =
  | "classification"
  | "generation"
  | "extraction"
  | "summarization"
  | "suggestion";

// ─── Normalized Input Types ────────────────────────────────────────────────────

export interface NormalizedPrompt {
  system?: string;
  messages: Array<{ role: "user" | "assistant" | "system"; content: string }>;
  temperature?: number;
  maxTokens?: number;
  /** Gemini thinking level: none | low | medium | high */
  thinkingLevel?: "none" | "low" | "medium" | "high";
  tools?: AITool[];
}

export interface IntentInput {
  text: string;
  availableIntents: string[];
  language?: string;
}

export interface ExtractionInput {
  text: string;
  fields: Array<{
    name: string;
    type: "string" | "number" | "boolean" | "date" | "email" | "phone";
    description?: string;
    required?: boolean;
  }>;
}

export interface SummaryInput {
  messages: Array<{ role: "user" | "assistant" | "bot"; content: string }>;
  maxLength?: number;
}

// ─── AI Tool / Function Calling ───────────────────────────────────────────────

export interface AITool {
  name: string;
  description: string;
  parameters: Record<string, unknown>; // JSON Schema
}

export interface AIToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
}

// ─── Normalized Output Types ──────────────────────────────────────────────────

export interface AIResult {
  text: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  toolCalls?: AIToolCall[];
  provider: AIProviderName;
  model: string;
}

export interface IntentResult {
  intent: string;
  confidence: number;
  entities?: Record<string, string | number>;
}

export interface ExtractionResult {
  fields: Record<string, string | number | boolean | null>;
  confidence: number;
}

export interface SummaryResult {
  summary: string;
  keyPoints: string[];
}

// ─── Provider Configuration ───────────────────────────────────────────────────

export interface AIProviderConfig {
  apiKey: string;
  primaryModel: string;
  fallbackModel?: string;
  /** Per-use-case model overrides */
  modelsByUseCase?: Partial<Record<AIUseCase, string>>;
}

export interface AIRouterConfig {
  primary: {
    provider: AIProviderName;
    config: AIProviderConfig;
  };
  fallback?: {
    provider: AIProviderName;
    config: AIProviderConfig;
  };
  defaultTemperature?: number;
  defaultMaxTokens?: number;
  defaultThinkingLevel?: "none" | "low" | "medium" | "high";
}

// ─── Provider Interface ────────────────────────────────────────────────────────

export interface IAIProvider {
  name: AIProviderName;
  generateText(input: NormalizedPrompt): Promise<AIResult>;
  classifyIntent(input: IntentInput): Promise<IntentResult>;
  summarizeConversation(input: SummaryInput): Promise<SummaryResult>;
  extractStructuredData(input: ExtractionInput): Promise<ExtractionResult>;
}
