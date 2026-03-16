// ─── Canonical Message Engine ─────────────────────────────────────────────────
// Accepts a canonical block and a target channel, returns the rendered payload.
// Applies the fallback chain: rich → simplified → text

import type { CanonicalBlock, ChannelType, RenderedMessage } from "./types";
import { renderWhatsApp } from "./renderers/whatsapp";
import { renderMessenger } from "./renderers/messenger";
import { renderWebWidget } from "./renderers/web-widget";

export interface RenderContext {
  channel: ChannelType;
  /** Recipient identifier (phone for WA, PSID for Messenger, connection ID for web) */
  recipientId: string;
  /** Optional override: force text-only output */
  forceTextOnly?: boolean;
}

export function renderCanonicalBlock(
  block: CanonicalBlock,
  context: RenderContext
): RenderedMessage {
  if (context.forceTextOnly) {
    return renderAsText(block, context);
  }

  switch (context.channel) {
    case "WEB_WIDGET":
      return renderWebWidget(block);

    case "WHATSAPP":
      return renderWhatsApp(block, context.recipientId);

    case "FACEBOOK_MESSENGER":
    case "INSTAGRAM":
      // Both use Messenger Send API with button/generic templates
      return renderMessenger(block, context.recipientId);

    case "TIKTOK":
    case "LINKEDIN":
    case "EMAIL":
      // These channels support text only for now; degrade gracefully
      return renderAsText(block, context);

    default:
      return renderAsText(block, context);
  }
}

/** Text-only fallback — used for unsupported channels or forced text mode */
function renderAsText(block: CanonicalBlock, context: RenderContext): RenderedMessage {
  const text = buildPlainText(block);
  return {
    payload: { text, channel: context.channel },
    fallbackText: text,
    degraded: true,
    degradedTo: "TEXT",
  };
}

function buildPlainText(block: CanonicalBlock): string {
  switch (block.type) {
    case "TEXT":
      return block.text;

    case "BUTTONS":
      return block.text + "\n\n" + block.buttons.map((b, i) => `${i + 1}. ${b.label}`).join("\n");

    case "QUICK_REPLIES":
      return block.text + "\n\n" + block.replies.map((r, i) => `${i + 1}. ${r.label}`).join("\n");

    case "CARD":
      return [
        block.item.title,
        block.item.description,
        block.item.actions?.map((a) => `• ${a.label}: ${a.value}`).join("\n"),
      ]
        .filter(Boolean)
        .join("\n");

    case "CARD_LIST":
      return [
        block.title,
        ...block.items.map(
          (item) =>
            `• ${item.title}${item.description ? ` – ${item.description}` : ""}${
              item.actions?.[0] ? ` (${item.actions[0].value})` : ""
            }`
        ),
      ]
        .filter(Boolean)
        .join("\n");

    case "FORM":
      return [
        block.title,
        block.description,
        block.fields.map((f, i) => `${i + 1}. ${f.label}${f.required ? " *" : ""}`).join("\n"),
      ]
        .filter(Boolean)
        .join("\n");

    case "IMAGE":
    case "VIDEO":
    case "FILE":
      return block.caption ? `${block.caption}\n${block.url}` : block.url;

    case "LOCATION":
      return [block.label, block.address, `${block.latitude},${block.longitude}`]
        .filter(Boolean)
        .join("\n");

    case "LIST_PICKER":
      return (
        block.title +
        "\n\n" +
        block.sections
          .flatMap((s) => s.rows)
          .map((r, i) => `${i + 1}. ${r.title}${r.description ? ` – ${r.description}` : ""}`)
          .join("\n")
      );

    default:
      return "";
  }
}
