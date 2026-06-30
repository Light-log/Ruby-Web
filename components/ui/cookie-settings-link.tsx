"use client";

import { COOKIE_SETTINGS_EVENT } from "@/components/ui/consent-banner";

/**
 * Enlace para reabrir el panel de preferencias de cookies y permitir
 * retirar o modificar el consentimiento en cualquier momento (RGPD Art. 7.3).
 */
export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))}
      className={className}
    >
      Gestionar cookies
    </button>
  );
}
