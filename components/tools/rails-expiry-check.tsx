"use client";

import * as React from "react";
import { CalendarDays, Copy, EyeOff, FileUp, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { type Cycle, type Product, type Verdict, daysUntil, parseLockfile, verdict } from "@/lib/expiry";

const TOOL_URL = "https://devruby.org/us/rails-expiry-check";
const NAMES: Record<Product, string> = { rails: "Rails", ruby: "Ruby" };

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

function stamp(v: Verdict, today: string) {
  if (v.status === "expired")
    return { text: "EXPIRED", sub: v.eol ? `No security patches since ${fmt(v.eol)}` : "Older than every supported release", tone: "crimson" };
  if (v.status === "unknown") return { text: "UNKNOWN", sub: "Newer than the published support data", tone: "muted" };
  const days = daysUntil(v.eol!, today);
  if (v.status === "security-only")
    return { text: `EXPIRES ${fmt(v.eol!).toUpperCase()}`, sub: `Security patches only · ${days} days left`, tone: "amber" };
  return { text: "SUPPORTED", sub: `Security patches until ${fmt(v.eol!)}`, tone: "lavender" };
}

const TONES: Record<string, string> = {
  crimson: "border-crimson text-crimson",
  amber: "border-amber-600 text-amber-700",
  lavender: "border-lavender text-lavender-dark",
  muted: "border-black/25 text-ivory-muted",
};

function summary(verdicts: Verdict[], today: string) {
  const lines = verdicts.map((v) => {
    const s = stamp(v, today);
    return `- ${NAMES[v.product]} ${v.version}: ${s.text.toLowerCase()} (${s.sub}).${v.latestPatch ? ` Latest patch in this series: ${v.latestPatch}.` : ""}`;
  });
  return [
    "Our Rails app's security patch status, checked today:",
    "",
    ...lines,
    "",
    "Once a version stops getting security patches, newly found vulnerabilities in it are not fixed upstream.",
    "Dates from endoflife.date. Checked with the free Rails Expiry Check (the file never left the browser):",
    TOOL_URL,
  ].join("\n");
}

export function RailsExpiryCheck({ cycles, bookingUrl }: { cycles: Record<Product, Cycle[]>; bookingUrl: string }) {
  const [text, setText] = React.useState("");
  const [manual, setManual] = React.useState<Partial<Record<Product, string>>>({});
  const [copied, setCopied] = React.useState(false);
  const counted = React.useRef(false);
  const today = new Date().toISOString().slice(0, 10);

  const parsed = React.useMemo(() => parseLockfile(text), [text]);
  const verdicts = (["rails", "ruby"] as const).flatMap((p) => {
    const fromLock = parsed[p];
    const version = fromLock ?? manual[p];
    if (!version) return [];
    const v = verdict(p, version, cycles[p], today);
    return [fromLock ? v : { ...v, latestPatch: undefined }]; // elegida a mano: solo sabemos la serie
  });
  const missing = text.trim() ? (["rails", "ruby"] as const).filter((p) => !parsed[p]) : [];

  React.useEffect(() => {
    if (!verdicts.length || counted.current) return;
    counted.current = true;
    const ref = new URLSearchParams(window.location.search).get("ref") ?? "";
    fetch("/api/uso", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ h: "rails-expiry-check", ref }), keepalive: true }).catch(() => {});
    (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", "use_tool", { tool: "rails-expiry-check" });
    window.fbq?.("trackCustom", "UseTool", { tool: "rails-expiry-check" });
  }, [verdicts.length]);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setText(await file.text());
  }

  const mail = `mailto:?subject=${encodeURIComponent("Our Rails app: security patch status")}&body=${encodeURIComponent(summary(verdicts, today))}`;

  return (
    <div className="grid gap-6">
      <Card className="p-6 md:p-8">
        <label htmlFor="lockfile" className="font-display text-xl text-ivory">Paste your Gemfile.lock</label>
        <textarea
          id="lockfile"
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
          rows={8}
          placeholder={"GEM\n  remote: https://rubygems.org/\n  specs:\n    rails (7.2.2)\n...\nRUBY VERSION\n   ruby 3.3.4p94"}
          className="mt-4 w-full rounded-xl border border-black/12 bg-white/80 p-4 font-mono text-sm text-ivory focus:outline-none focus:ring-2 focus:ring-crimson/30"
        />
        <div className="mt-4 flex flex-col gap-3 text-sm text-ivory-dim sm:flex-row sm:items-center sm:justify-between">
          <label className="inline-flex cursor-pointer items-center gap-2 font-semibold text-crimson hover:text-crimson-dark">
            <FileUp className="h-4 w-4" /> or open the file
            <input type="file" accept=".lock,text/plain" onChange={onFile} className="sr-only" />
          </label>
          <span className="inline-flex items-center gap-2"><EyeOff className="h-4 w-4 text-lavender" /> Runs in your browser. Nothing is uploaded: our fox keeps its eyes closed.</span>
        </div>
      </Card>

      {missing.map((p) => (
        <Card key={p} className="p-6">
          <label htmlFor={`pick-${p}`} className="text-sm font-semibold text-ivory">
            {p === "ruby" ? "Your Gemfile.lock doesn't list the Ruby version (no RUBY VERSION section). Which one do you run?" : "We couldn't find the rails or railties gem. Which Rails version do you run?"}
          </label>
          <select
            id={`pick-${p}`}
            value={manual[p] ?? ""}
            onChange={(e) => setManual((m) => ({ ...m, [p]: e.target.value || undefined }))}
            className="mt-3 w-full rounded-xl border border-black/12 bg-white px-4 py-3 text-sm text-ivory sm:w-auto"
          >
            <option value="">Choose {NAMES[p]}…</option>
            {cycles[p].map((c) => <option key={c.cycle} value={c.cycle}>{NAMES[p]} {c.cycle}</option>)}
          </select>
        </Card>
      ))}

      {verdicts.length > 0 && (
        <div aria-live="polite" className="grid gap-6">
          <div className="grid gap-6 md:grid-cols-2">
            {verdicts.map((v) => {
              const s = stamp(v, today);
              return (
                <Card key={v.product} className="p-7 text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ivory-muted">{NAMES[v.product]} {v.version}</p>
                  <p className={`mx-auto mt-5 inline-block -rotate-3 rounded-lg border-4 px-5 py-2 font-display text-2xl tracking-wider md:text-3xl ${TONES[s.tone]}`}>{s.text}</p>
                  <p className="mt-5 text-sm text-ivory-dim">{s.sub}</p>
                  {v.support && v.status === "supported" && <p className="mt-1 text-xs text-ivory-muted">Bug fixes until {fmt(v.support)}</p>}
                  {v.latestPatch && <p className="mt-3 text-xs font-semibold text-crimson-dark">You're behind on patches: latest {NAMES[v.product]} {v.cycle} is {v.latestPatch}.</p>}
                </Card>
              );
            })}
          </div>

          <Card className="border-crimson/15 bg-crimson/5 p-7 md:p-9">
            <h2 className="font-display text-2xl text-ivory">Send this to whoever signs off the budget</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ivory-dim">
              A plain-English summary they can read in a minute: what is running, when the patches stop and why it matters.
            </p>
            <pre className="mt-5 whitespace-pre-wrap rounded-xl bg-white/80 p-4 text-xs leading-relaxed text-ivory-dim">{summary(verdicts, today)}</pre>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={mail}><Button as="span" variant="outline" className="w-full sm:w-auto"><Mail className="h-4 w-4" /> Email it</Button></a>
              <Button
                variant="outline"
                onClick={() => navigator.clipboard?.writeText(summary(verdicts, today)).then(() => setCopied(true))}
              >
                <Copy className="h-4 w-4" /> {copied ? "Copied" : "Copy summary"}
              </Button>
              <a href={bookingUrl} target="_blank" rel="noreferrer" data-track="booking">
                <Button as="span" className="w-full sm:w-auto">Plan the upgrade with us <CalendarDays className="h-4 w-4" /></Button>
              </a>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
