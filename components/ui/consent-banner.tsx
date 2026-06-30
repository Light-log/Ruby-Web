"use client";

import * as React from "react";
import Link from "next/link";
import Script from "next/script";
import { Cookie, ShieldCheck, BarChart3, Check } from "lucide-react";

const GA_ID = "G-SEZY0Q1JSN";
const STORAGE_KEY = "ruby-cookie-consent";
/** Versión de la política. Si cambia, se vuelve a pedir el consentimiento. */
const POLICY_VERSION = "2025-06-29";
/** Evento global para reabrir el panel (p. ej. desde el footer). */
export const COOKIE_SETTINGS_EVENT = "cookie:open";

type StoredConsent = {
  analytics: boolean;
  version: string;
  ts: number;
};

function readConsent(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== POLICY_VERSION) return null; // política nueva → re-pedir
    return parsed;
  } catch {
    return null;
  }
}

export function ConsentBanner() {
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [showPrefs, setShowPrefs] = React.useState(false);
  const [analytics, setAnalytics] = React.useState(false);
  const [analyticsGranted, setAnalyticsGranted] = React.useState(false);

  React.useEffect(() => {
    const stored = readConsent();
    if (stored) {
      setAnalytics(stored.analytics);
      setAnalyticsGranted(stored.analytics);
    } else {
      setVisible(true);
    }
    setMounted(true);

    const open = () => {
      const current = readConsent();
      setAnalytics(current?.analytics ?? false);
      setShowPrefs(true);
      setVisible(true);
    };
    window.addEventListener(COOKIE_SETTINGS_EVENT, open);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, open);
  }, []);

  function persist(analyticsValue: boolean) {
    const wasGranted = analyticsGranted;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          analytics: analyticsValue,
          version: POLICY_VERSION,
          ts: Date.now(),
        } satisfies StoredConsent)
      );
    } catch {
      /* sin almacenamiento: la elección no se recordará */
    }
    setVisible(false);
    setShowPrefs(false);

    // Si se retira un consentimiento ya activo, recargamos para detener GA.
    if (wasGranted && !analyticsValue) {
      window.location.reload();
      return;
    }
    setAnalyticsGranted(analyticsValue);
  }

  return (
    <>
      {analyticsGranted && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-gtag" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {mounted && visible && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-desc"
          className="fixed inset-x-4 bottom-4 z-[1000] mx-auto w-auto max-w-md animate-slide-up sm:inset-x-auto sm:right-6 sm:bottom-6"
        >
          <div className="overflow-hidden rounded-2xl border border-black/8 bg-white shadow-card-hover">
            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-crimson/8 text-crimson ring-1 ring-crimson/15">
                  <Cookie className="h-5 w-5" />
                </span>
                <h2
                  id="cookie-title"
                  className="font-display text-lg font-semibold text-ivory"
                >
                  Tu privacidad nos importa
                </h2>
              </div>

              <p
                id="cookie-desc"
                className="mt-4 text-sm leading-relaxed text-ivory-dim"
              >
                Usamos cookies propias para que el sitio funcione y, con tu
                permiso, cookies de analítica (Google Analytics) para medir y
                mejorar la experiencia. Consulta nuestra{" "}
                <Link
                  href="/privacidad"
                  className="font-semibold text-crimson underline underline-offset-2 transition-colors hover:text-crimson-dark"
                >
                  Política de Privacidad
                </Link>
                .
              </p>

              {showPrefs && (
                <div className="mt-5 grid gap-3">
                  <CategoryRow
                    icon={<ShieldCheck className="h-4 w-4" />}
                    title="Necesarias"
                    desc="Imprescindibles para el funcionamiento del sitio. Siempre activas."
                    locked
                  />
                  <CategoryRow
                    icon={<BarChart3 className="h-4 w-4" />}
                    title="Analítica"
                    desc="Estadísticas anónimas de uso (Google Analytics)."
                    checked={analytics}
                    onToggle={() => setAnalytics((v) => !v)}
                  />
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {!showPrefs ? (
                  <button
                    type="button"
                    onClick={() => setShowPrefs(true)}
                    className="touch-manipulation order-2 text-sm font-semibold text-ivory-muted underline-offset-2 transition-colors hover:text-crimson hover:underline focus:outline-none focus:ring-2 focus:ring-crimson/30 sm:order-1"
                  >
                    Preferencias
                  </button>
                ) : (
                  <span className="hidden sm:block" />
                )}

                <div className="order-1 flex items-center gap-3 sm:order-2">
                  <button
                    type="button"
                    onClick={() => persist(false)}
                    className="touch-manipulation flex-1 rounded-xl border border-black/12 px-5 py-2.5 text-sm font-semibold text-ivory transition-colors hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-crimson/30 sm:flex-none"
                  >
                    Rechazar
                  </button>
                  {showPrefs ? (
                    <button
                      type="button"
                      onClick={() => persist(analytics)}
                      className="touch-manipulation flex-1 rounded-xl bg-crimson px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-crimson-light focus:outline-none focus:ring-2 focus:ring-crimson/40 sm:flex-none"
                    >
                      Guardar
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => persist(true)}
                      className="touch-manipulation flex-1 rounded-xl bg-crimson px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-crimson-light focus:outline-none focus:ring-2 focus:ring-crimson/40 sm:flex-none"
                    >
                      Aceptar
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function CategoryRow({
  icon,
  title,
  desc,
  checked,
  locked,
  onToggle,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  checked?: boolean;
  locked?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-black/8 bg-dark-200/60 px-4 py-3">
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-crimson/8 text-crimson">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-ivory">{title}</div>
        <div className="text-xs leading-relaxed text-ivory-muted">{desc}</div>
      </div>
      {locked ? (
        <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700">
          <Check className="h-3 w-3" /> Activas
        </span>
      ) : (
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={`Activar cookies de ${title}`}
          onClick={onToggle}
          className={`relative mt-1 inline-flex h-6 w-11 shrink-0 touch-manipulation items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-crimson/30 ${
            checked ? "bg-crimson" : "bg-black/15"
          }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
              checked ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      )}
    </div>
  );
}
