// ─── WhatsApp Cloud API Webhook ───────────────────────────────────────────────
// Handles incoming WhatsApp messages via webhook.
// GET  → Verification handshake from Meta
// POST → Incoming messages / status updates

import { type NextRequest, NextResponse } from "next/server";

/** WhatsApp webhook verification (GET) */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  // In production: look up verifyToken from Channel config for the matching company
  const expectedToken = process.env.WHATSAPP_VERIFY_TOKEN ?? "my-verify-token";

  if (mode === "subscribe" && token === expectedToken) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

/** WhatsApp incoming message processing (POST) */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Verify X-Hub-Signature-256 header in production
    // const signature = req.headers.get("x-hub-signature-256");
    // verifyWebhookSignature(body, signature, appSecret);

    // Parse WhatsApp webhook payload
    for (const entry of body.entry ?? []) {
      for (const change of entry.changes ?? []) {
        if (change.field !== "messages") continue;

        const value = change.value;
        const phoneNumberId = value.metadata?.phone_number_id;

        // Process incoming messages
        for (const message of value.messages ?? []) {
          await processWhatsAppMessage({
            phoneNumberId,
            from: message.from,
            messageId: message.id,
            type: message.type,
            text: message.text?.body,
            interactive: message.interactive,
            timestamp: message.timestamp,
          });
        }

        // Process status updates (sent, delivered, read, failed)
        for (const status of value.statuses ?? []) {
          console.log(`[WhatsApp] Status update: ${status.id} → ${status.status}`);
          // In production: update message delivery status in DB
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[webhook/whatsapp]", err);
    // Always return 200 to avoid Meta retrying aggressively
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}

interface WhatsAppMessage {
  phoneNumberId: string;
  from: string;
  messageId: string;
  type: string;
  text?: string;
  interactive?: {
    type: "button_reply" | "list_reply";
    button_reply?: { id: string; title: string };
    list_reply?: { id: string; title: string };
  };
  timestamp: string;
}

async function processWhatsAppMessage(msg: WhatsAppMessage) {
  // In production:
  // 1. Find channel by phoneNumberId → get companyId
  // 2. Find or create conversation for msg.from
  // 3. Save inbound message to DB
  // 4. If conversation.status === BOT → run flow engine
  //    If conversation.status === LIVE → route to assigned agent via WebSocket
  //    If conversation.status === WAITING → notify agents
  // 5. Emit real-time event via Socket.IO

  console.log(`[WhatsApp] Incoming ${msg.type} from ${msg.from}: ${msg.text ?? "(non-text)"}`);
}
