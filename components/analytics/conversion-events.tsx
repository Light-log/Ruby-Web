"use client";

import * as React from "react";

type TrackName = "agenda" | "booking" | "whatsapp" | "contact" | "download";

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params: Record<string, string>) => void;
  }
}

const events: Record<TrackName, string> = {
  agenda: "view_schedule",
  booking: "book_consultation",
  whatsapp: "contact_whatsapp",
  contact: "begin_contact",
  download: "download_template",
};

/** Eventos estándar del píxel de Meta (solo se envían si el píxel está cargado). */
const metaEvents: Record<TrackName, string> = {
  agenda: "ViewContent",
  booking: "Schedule",
  whatsapp: "Contact",
  contact: "Contact",
  download: "Lead",
};

export const LEAD_SUBMITTED_EVENT = "devruby:lead-submitted";

function pageCategory() {
  return window.location.pathname.startsWith("/espana") ? "espana" : "general";
}

export function ConversionEvents() {
  React.useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-track]") : null;
      const track = target?.dataset.track as TrackName | undefined;
      if (!track || !(track in events)) return;
      window.gtag?.("event", events[track], { page_category: pageCategory(), link_text: target?.textContent?.trim().slice(0, 100) ?? "" });
      window.fbq?.("track", metaEvents[track]);
    };
    const onLeadSubmitted = () => {
      window.gtag?.("event", "generate_lead", { page_category: pageCategory(), method: "contact_form" });
      window.fbq?.("track", "Lead");
    };
    document.addEventListener("click", onClick);
    window.addEventListener(LEAD_SUBMITTED_EVENT, onLeadSubmitted);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener(LEAD_SUBMITTED_EVENT, onLeadSubmitted);
    };
  }, []);

  return null;
}
