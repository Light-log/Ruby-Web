// ─── Messenger Platform Webhook ───────────────────────────────────────────────
// Handles Facebook Messenger and Instagram messaging events.
// The same endpoint can serve both Messenger and Instagram since they share
// the same webhook infrastructure.

import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const expectedToken = process.env.MESSENGER_VERIFY_TOKEN ?? "my-verify-token";

  if (mode === "subscribe" && token === expectedToken) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.object !== "page" && body.object !== "instagram") {
      return NextResponse.json({ error: "Unknown object" }, { status: 400 });
    }

    for (const entry of body.entry ?? []) {
      // Messenger events
      for (const messaging of entry.messaging ?? []) {
        if (messaging.message) {
          await processMessengerMessage({
            pageId: entry.id,
            senderId: messaging.sender.id,
            recipientId: messaging.recipient.id,
            messageId: messaging.message.mid,
            text: messaging.message.text,
            attachments: messaging.message.attachments,
            quickReply: messaging.message.quick_reply,
            timestamp: messaging.timestamp,
            channel: body.object === "instagram" ? "INSTAGRAM" : "FACEBOOK_MESSENGER",
          });
        }

        if (messaging.postback) {
          await processPostback({
            pageId: entry.id,
            senderId: messaging.sender.id,
            payload: messaging.postback.payload,
            title: messaging.postback.title,
            channel: body.object === "instagram" ? "INSTAGRAM" : "FACEBOOK_MESSENGER",
          });
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[webhook/messenger]", err);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}

interface MessengerMessage {
  pageId: string;
  senderId: string;
  recipientId: string;
  messageId: string;
  text?: string;
  attachments?: unknown[];
  quickReply?: { payload: string };
  timestamp: number;
  channel: "FACEBOOK_MESSENGER" | "INSTAGRAM";
}

interface PostbackEvent {
  pageId: string;
  senderId: string;
  payload: string;
  title: string;
  channel: "FACEBOOK_MESSENGER" | "INSTAGRAM";
}

async function processMessengerMessage(msg: MessengerMessage) {
  // In production: same flow as WhatsApp
  // 1. Find channel by pageId → companyId
  // 2. Find/create conversation for senderId
  // 3. Save message, run flow engine or route to agent
  console.log(`[${msg.channel}] Message from ${msg.senderId}: ${msg.text}`);
}

async function processPostback(event: PostbackEvent) {
  // Handle button/card postbacks (user clicked a button)
  console.log(`[${event.channel}] Postback from ${event.senderId}: ${event.payload}`);
}
