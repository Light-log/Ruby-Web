import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { z } from "zod";
import type { CanonicalBlock } from "@/lib/canonical/types";

const messageSchema = z.object({
  content: z.string().min(1).max(4000),
  type: z.union([z.literal("TEXT"), z.literal("BUTTONS"), z.literal("QUICK_REPLIES"), z.literal("CARD"), z.literal("CARD_LIST")]).default("TEXT"),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const params = await context.params;
  const { id } = params;

  // In production: fetch from DB with Prisma
  // SELECT * FROM Message WHERE conversationId = id ORDER BY createdAt ASC
  return NextResponse.json({
    conversationId: id,
    messages: [],
    pagination: { total: 0, page: 1, pageSize: 50 },
  });
}

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
    const { content, type } = messageSchema.parse(body);

    // Build canonical block
    const block: CanonicalBlock = { type: "TEXT", text: content };

    // In production:
    // 1. Get conversation from DB (including channel type and recipient ID)
    // 2. Render canonical block for the conversation's channel
    // 3. Send to channel's API (WhatsApp, Messenger, etc.)
    // 4. Save message to DB
    // 5. Emit via WebSocket to other agents viewing this conversation

    return NextResponse.json({
      ok: true,
      messageId: `msg-${Date.now()}`,
      conversationId: id,
      block,
      sentAt: new Date().toISOString(),
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos inválidos", issues: err.issues }, { status: 400 });
    }
    console.error("[conversations/messages]", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
