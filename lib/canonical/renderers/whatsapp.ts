// ─── WhatsApp Channel Renderer ────────────────────────────────────────────────
// Renders canonical blocks to WhatsApp Business API payloads.
// Supports: text, reply buttons (up to 3), list messages, media, location.
// Carousels degrade to text + URL list.
// Reference: https://developers.facebook.com/docs/whatsapp/cloud-api/messages

import type { CanonicalBlock, RenderedMessage } from "../types";

export function renderWhatsApp(block: CanonicalBlock, recipientPhone: string): RenderedMessage {
  switch (block.type) {
    case "TEXT":
      return {
        payload: {
          messaging_product: "whatsapp",
          to: recipientPhone,
          type: "text",
          text: { body: block.text },
        },
        fallbackText: block.text,
        degraded: false,
      };

    case "BUTTONS": {
      const buttons = block.buttons.slice(0, 3); // WA max 3 buttons
      const replyButtons = buttons.filter((b) => b.type === "postback");

      if (replyButtons.length > 0) {
        return {
          payload: {
            messaging_product: "whatsapp",
            to: recipientPhone,
            type: "interactive",
            interactive: {
              type: "button",
              body: { text: block.text },
              action: {
                buttons: replyButtons.map((b) => ({
                  type: "reply",
                  reply: { id: b.value, title: b.label.slice(0, 20) },
                })),
              },
            },
          },
          fallbackText: block.text + "\n" + buttons.map((b, i) => `${i + 1}. ${b.label}`).join("\n"),
          degraded: false,
        };
      }

      // Fallback for URL buttons
      return {
        payload: {
          messaging_product: "whatsapp",
          to: recipientPhone,
          type: "text",
          text: {
            body: block.text + "\n\n" + buttons.map((b) => `• ${b.label}: ${b.value}`).join("\n"),
          },
        },
        fallbackText: block.text,
        degraded: true,
        degradedTo: "TEXT",
      };
    }

    case "QUICK_REPLIES": {
      const rows = block.replies.slice(0, 10); // WA list max 10 rows per section
      return {
        payload: {
          messaging_product: "whatsapp",
          to: recipientPhone,
          type: "interactive",
          interactive: {
            type: "list",
            body: { text: block.text },
            action: {
              button: "Ver opciones",
              sections: [
                {
                  rows: rows.map((r) => ({
                    id: r.value,
                    title: r.label.slice(0, 24),
                  })),
                },
              ],
            },
          },
        },
        fallbackText: block.text + "\n" + rows.map((r, i) => `${i + 1}. ${r.label}`).join("\n"),
        degraded: false,
      };
    }

    case "LIST_PICKER":
      return {
        payload: {
          messaging_product: "whatsapp",
          to: recipientPhone,
          type: "interactive",
          interactive: {
            type: "list",
            header: { type: "text", text: block.title.slice(0, 60) },
            body: { text: block.title },
            action: {
              button: block.buttonLabel.slice(0, 20),
              sections: block.sections.map((s) => ({
                title: s.title?.slice(0, 24),
                rows: s.rows.slice(0, 10).map((r) => ({
                  id: r.id,
                  title: r.title.slice(0, 24),
                  description: r.description?.slice(0, 72),
                })),
              })),
            },
          },
        },
        fallbackText: block.title,
        degraded: false,
      };

    case "CARD": {
      const { item } = block;
      const text = [
        item.title,
        item.description,
        item.actions?.map((a) => `• ${a.label}: ${a.value}`).join("\n"),
      ]
        .filter(Boolean)
        .join("\n\n");

      if (item.imageUrl) {
        return {
          payload: {
            messaging_product: "whatsapp",
            to: recipientPhone,
            type: "image",
            image: { link: item.imageUrl, caption: text.slice(0, 1024) },
          },
          fallbackText: text,
          degraded: true,
          degradedTo: "IMAGE+TEXT",
        };
      }

      return {
        payload: {
          messaging_product: "whatsapp",
          to: recipientPhone,
          type: "text",
          text: { body: text },
        },
        fallbackText: text,
        degraded: true,
        degradedTo: "TEXT",
      };
    }

    case "CARD_LIST": {
      // WA doesn't have native carousel; degrade to list message or text
      const textBody = [
        block.title,
        ...block.items.map(
          (item, i) =>
            `${i + 1}. *${item.title}*${item.description ? `\n   ${item.description}` : ""}${
              item.actions?.[0] ? `\n   ${item.actions[0].value}` : ""
            }`
        ),
      ]
        .filter(Boolean)
        .join("\n\n");

      return {
        payload: {
          messaging_product: "whatsapp",
          to: recipientPhone,
          type: "text",
          text: { body: textBody.slice(0, 4096) },
        },
        fallbackText: textBody,
        degraded: true,
        degradedTo: "TEXT",
      };
    }

    case "IMAGE":
    case "VIDEO":
    case "FILE": {
      const mediaType = block.type === "IMAGE" ? "image" : block.type === "VIDEO" ? "video" : "document";
      return {
        payload: {
          messaging_product: "whatsapp",
          to: recipientPhone,
          type: mediaType,
          [mediaType]: { link: block.url, caption: block.caption },
        },
        fallbackText: block.caption ?? block.url,
        degraded: false,
      };
    }

    case "LOCATION":
      return {
        payload: {
          messaging_product: "whatsapp",
          to: recipientPhone,
          type: "location",
          location: {
            latitude: block.latitude,
            longitude: block.longitude,
            name: block.label,
            address: block.address,
          },
        },
        fallbackText: block.label ?? `${block.latitude},${block.longitude}`,
        degraded: false,
      };

    case "FORM":
      // WA doesn't support forms natively; degrade to text with questions
      return {
        payload: {
          messaging_product: "whatsapp",
          to: recipientPhone,
          type: "text",
          text: {
            body: [
              block.title,
              block.description,
              "Por favor responde las siguientes preguntas:",
              ...block.fields.map((f, i) => `${i + 1}. ${f.label}${f.required ? " *" : ""}`),
            ]
              .filter(Boolean)
              .join("\n"),
          },
        },
        fallbackText: block.title ?? "Formulario",
        degraded: true,
        degradedTo: "TEXT",
      };

    default:
      return {
        payload: {
          messaging_product: "whatsapp",
          to: recipientPhone,
          type: "text",
          text: { body: "Mensaje no soportado en este canal." },
        },
        fallbackText: "Mensaje no soportado.",
        degraded: true,
        degradedTo: "TEXT",
      };
  }
}
