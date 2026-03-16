import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { z } from "zod";

const handoffSchema = z.object({
  action: z.enum(["takeover", "release", "transfer", "resolve"]),
  toUserId: z.string().optional(),
  toQueueId: z.string().optional(),
  reason: z.string().optional(),
  message: z.string().optional(),
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
    const { action, toUserId, toQueueId, reason, message } = handoffSchema.parse(body);

    // In production:
    // takeover  → set conversation.status = LIVE, assign to agent, pause bot
    // release   → set conversation.status = BOT, unassign, resume bot
    // transfer  → create ConversationTransfer, reassign to toUserId/toQueueId
    // resolve   → set conversation.status = RESOLVED, close conversation

    console.log(`[handoff] conv=${id} action=${action} agent=${session.userId}`);

    return NextResponse.json({
      ok: true,
      conversationId: id,
      action,
      performedBy: session.userId,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
