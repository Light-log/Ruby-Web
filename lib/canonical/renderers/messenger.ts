// ─── Facebook Messenger / Instagram Renderer ──────────────────────────────────
// Renders canonical blocks to Messenger Send API payloads.
// Generic template: image + title + subtitle + up to 3 buttons per bubble.
// Button template: text + up to 3 buttons.
// Both Messenger and Instagram support these templates.
// Reference: https://developers.facebook.com/docs/messenger-platform/send-messages/templates

import type { CanonicalBlock, RenderedMessage } from "../types";

function buildMessengerButton(action: { type: string; label: string; value: string }) {
  if (action.type === "url") {
    return { type: "web_url", title: action.label.slice(0, 20), url: action.value };
  }
  return { type: "postback", title: action.label.slice(0, 20), payload: action.value };
}

export function renderMessenger(
  block: CanonicalBlock,
  recipientId: string
): RenderedMessage {
  const to = { id: recipientId };

  switch (block.type) {
    case "TEXT":
      return {
        payload: { recipient: to, message: { text: block.text } },
        fallbackText: block.text,
        degraded: false,
      };

    case "BUTTONS": {
      const buttons = block.buttons.slice(0, 3); // Messenger max 3 buttons
      return {
        payload: {
          recipient: to,
          message: {
            attachment: {
              type: "template",
              payload: {
                template_type: "button",
                text: block.text.slice(0, 640),
                buttons: buttons.map(buildMessengerButton),
              },
            },
          },
        },
        fallbackText: block.text + "\n" + buttons.map((b) => `• ${b.label}`).join("\n"),
        degraded: false,
      };
    }

    case "QUICK_REPLIES": {
      return {
        payload: {
          recipient: to,
          message: {
            text: block.text,
            quick_replies: block.replies.slice(0, 13).map((r) => ({
              content_type: "text",
              title: r.label.slice(0, 20),
              payload: r.value,
            })),
          },
        },
        fallbackText: block.text + "\n" + block.replies.map((r) => `• ${r.label}`).join("\n"),
        degraded: false,
      };
    }

    case "CARD": {
      const { item } = block;
      return {
        payload: {
          recipient: to,
          message: {
            attachment: {
              type: "template",
              payload: {
                template_type: "generic",
                elements: [
                  {
                    title: item.title.slice(0, 80),
                    subtitle: item.description?.slice(0, 80),
                    image_url: item.imageUrl,
                    buttons: item.actions?.slice(0, 3).map(buildMessengerButton),
                  },
                ],
              },
            },
          },
        },
        fallbackText: item.title,
        degraded: false,
      };
    }

    case "CARD_LIST": {
      // Generic template supports up to 10 elements
      const elements = block.items.slice(0, 10).map((item) => ({
        title: item.title.slice(0, 80),
        subtitle: item.description?.slice(0, 80),
        image_url: item.imageUrl,
        buttons: item.actions?.slice(0, 3).map(buildMessengerButton),
      }));

      return {
        payload: {
          recipient: to,
          message: {
            attachment: {
              type: "template",
              payload: { template_type: "generic", elements },
            },
          },
        },
        fallbackText: block.title ?? block.items.map((i) => i.title).join(", "),
        degraded: false,
      };
    }

    case "IMAGE":
    case "VIDEO":
    case "FILE": {
      const attachmentType =
        block.type === "IMAGE" ? "image" : block.type === "VIDEO" ? "video" : "file";
      return {
        payload: {
          recipient: to,
          message: {
            attachment: {
              type: attachmentType,
              payload: { url: block.url, is_reusable: true },
            },
          },
        },
        fallbackText: block.caption ?? block.url,
        degraded: false,
      };
    }

    case "LIST_PICKER": {
      // Render as quick replies or button template
      const allRows = block.sections.flatMap((s) => s.rows).slice(0, 13);
      return {
        payload: {
          recipient: to,
          message: {
            text: block.title,
            quick_replies: allRows.map((r) => ({
              content_type: "text",
              title: r.title.slice(0, 20),
              payload: r.id,
            })),
          },
        },
        fallbackText: block.title,
        degraded: true,
        degradedTo: "QUICK_REPLIES",
      };
    }

    case "FORM": {
      // Messenger doesn't support forms; degrade to text
      const text = [
        block.title,
        block.description,
        block.fields.map((f, i) => `${i + 1}. ${f.label}`).join("\n"),
      ]
        .filter(Boolean)
        .join("\n\n");

      return {
        payload: { recipient: to, message: { text: text.slice(0, 2000) } },
        fallbackText: block.title ?? "Formulario",
        degraded: true,
        degradedTo: "TEXT",
      };
    }

    default:
      return {
        payload: { recipient: to, message: { text: "Mensaje no soportado en este canal." } },
        fallbackText: "Mensaje no soportado.",
        degraded: true,
        degradedTo: "TEXT",
      };
  }
}
