import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { executeSandbox, validateScript } from "@/lib/runtime/sandbox";
import { z } from "zod";

const executeSchema = z.object({
  code: z.string().min(1).max(50000),
  input: z.record(z.string(), z.unknown()).optional(),
  language: z.union([z.literal("JAVASCRIPT"), z.literal("TYPESCRIPT"), z.literal("PYTHON")]).default("JAVASCRIPT"),
});

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const params = await context.params;
  const { id } = params;

  try {
    const body = await req.json();
    const { code, input, language } = executeSchema.parse(body);

    // Validate script before execution
    const validation = validateScript(code);
    if (!validation.valid) {
      return NextResponse.json(
        { ok: false, error: "Script inválido", issues: validation.errors },
        { status: 400 }
      );
    }

    // In production: load bindings from DB for this script
    // const script = await prisma.scriptTemplate.findUnique({ where: { id }, include: { bindings: true } });
    // const resolvedBindings = await resolveBindings(script.bindings); // decrypt from vault

    const result = await executeSandbox({
      language,
      code,
      bindings: [], // In production: resolved from DB
      input,
      timeoutMs: 5000,
      maxMemoryMb: 64,
      allowedDomains: [], // In production: from AllowedDomain table
    });

    // Log execution to DB
    // await prisma.scriptExecution.create({ data: { scriptId: id, ... } });

    return NextResponse.json({
      ok: result.success,
      scriptId: id,
      ...result,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }
    console.error("[scripts/execute]", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
