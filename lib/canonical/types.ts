// ─── Canonical Message Engine – Types ─────────────────────────────────────────
// The admin creates ONE canonical message. The renderer converts it to the
// appropriate format per channel. This avoids coupling message design to
// channel limitations.

export type ChannelType =
  | "WEB_WIDGET"
  | "WHATSAPP"
  | "FACEBOOK_MESSENGER"
  | "INSTAGRAM"
  | "TIKTOK"
  | "LINKEDIN"
  | "EMAIL";

// ─── Action Types ─────────────────────────────────────────────────────────────

export type ActionType = "url" | "postback" | "phone" | "share" | "location";

export interface CanonicalAction {
  type: ActionType;
  label: string;
  /** URL for type=url, payload for type=postback, phone number for type=phone */
  value: string;
}

// ─── Block Types ──────────────────────────────────────────────────────────────

export interface TextBlock {
  type: "TEXT";
  text: string;
  /** Markdown or plain text */
  format?: "plain" | "markdown";
}

export interface ButtonsBlock {
  type: "BUTTONS";
  text: string;
  buttons: CanonicalAction[];
}

export interface QuickRepliesBlock {
  type: "QUICK_REPLIES";
  text: string;
  replies: Array<{ label: string; value: string }>;
}

export interface CardItem {
  title: string;
  description?: string;
  imageUrl?: string;
  actions?: CanonicalAction[];
  metadata?: Record<string, string>;
}

export interface CardBlock {
  type: "CARD";
  item: CardItem;
}

export interface CardListBlock {
  type: "CARD_LIST";
  title?: string;
  items: CardItem[];
}

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "phone" | "number" | "select" | "textarea" | "date";
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
}

export interface FormBlock {
  type: "FORM";
  title?: string;
  description?: string;
  fields: FormField[];
  submitLabel?: string;
}

export interface MediaBlock {
  type: "IMAGE" | "VIDEO" | "FILE";
  url: string;
  caption?: string;
  mimeType?: string;
  size?: number;
}

export interface LocationBlock {
  type: "LOCATION";
  latitude: number;
  longitude: number;
  label?: string;
  address?: string;
}

export interface ListPickerBlock {
  type: "LIST_PICKER";
  title: string;
  buttonLabel: string;
  sections: Array<{
    title?: string;
    rows: Array<{ id: string; title: string; description?: string }>;
  }>;
}

export type CanonicalBlock =
  | TextBlock
  | ButtonsBlock
  | QuickRepliesBlock
  | CardBlock
  | CardListBlock
  | FormBlock
  | MediaBlock
  | LocationBlock
  | ListPickerBlock;

// ─── Rendered Output ──────────────────────────────────────────────────────────

/** What actually gets sent to a channel's API */
export interface RenderedMessage {
  /** The channel-specific payload */
  payload: unknown;
  /** Fallback text representation for unsupported channels */
  fallbackText: string;
  /** Whether the original block was fully supported or degraded */
  degraded: boolean;
  /** What the block degraded to (if degraded) */
  degradedTo?: string;
}
