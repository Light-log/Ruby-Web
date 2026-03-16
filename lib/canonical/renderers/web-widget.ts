// ─── Web Widget Renderer ──────────────────────────────────────────────────────
// The web widget is the richest channel — we control the full frontend,
// so canonical blocks can be rendered with zero degradation.
// The renderer simply passes the canonical block through with a typed wrapper
// that the widget frontend knows how to render.

import type { CanonicalBlock, RenderedMessage } from "../types";

/**
 * Web widget rendered payload — the frontend receives this directly via
 * WebSocket / SSE and renders the appropriate React component per type.
 */
export interface WebWidgetPayload {
  type: CanonicalBlock["type"];
  block: CanonicalBlock;
  timestamp: string;
}

export function renderWebWidget(block: CanonicalBlock): RenderedMessage {
  const payload: WebWidgetPayload = {
    type: block.type,
    block,
    timestamp: new Date().toISOString(),
  };

  const fallbackText = buildFallbackText(block);

  return {
    payload,
    fallbackText,
    degraded: false, // Web widget supports all canonical types natively
  };
}

function buildFallbackText(block: CanonicalBlock): string {
  switch (block.type) {
    case "TEXT":
      return block.text;
    case "BUTTONS":
      return block.text + "\n" + block.buttons.map((b) => `• ${b.label}`).join("\n");
    case "QUICK_REPLIES":
      return block.text + "\n" + block.replies.map((r) => `• ${r.label}`).join("\n");
    case "CARD":
      return block.item.title;
    case "CARD_LIST":
      return block.title ?? block.items.map((i) => i.title).join(", ");
    case "FORM":
      return block.title ?? "Formulario";
    case "IMAGE":
    case "VIDEO":
    case "FILE":
      return block.caption ?? block.url;
    case "LOCATION":
      return block.label ?? `${block.latitude},${block.longitude}`;
    case "LIST_PICKER":
      return block.title;
    default:
      return "";
  }
}
