import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

test("publishes DEVRUBY LLC public configuration", () => {
  const source = fs.readFileSync("lib/site.ts", "utf8");

  assert.match(source, /brand:\s*"DEVRUBY"/);
  assert.match(source, /legalName:\s*"DEVRUBY LLC"/);
  assert.match(source, /https:\/\/wa\.me\//);
});

test("booking configuration only accepts HTTPS URLs", () => {
  const source = fs.readFileSync("lib/site.ts", "utf8");

  assert.match(source, /url\.protocol === "https:"/);
  assert.match(source, /return null/);
});

test("counter renders its final value before client animation", () => {
  const source = fs.readFileSync("components/animate/counter.tsx", "utf8");

  assert.match(source, /useState\(String\(value\)\)/);
});

test("agenda page provides booking and WhatsApp fallback", () => {
  const source = fs.readFileSync("app/agenda/page.tsx", "utf8");

  assert.match(source, /bookingUrl\(\)/);
  assert.match(source, /site\.whatsAppUrl/);
  assert.match(source, /data-track="booking"/);
});

test("primary CTAs link to the agenda route", () => {
  for (const file of ["navbar", "cta-section"]) {
    const source = fs.readFileSync(`components/sections/${file}.tsx`, "utf8");
    assert.match(source, /href="\/agenda"/);
  }
});

test("Spain campaign publishes specific commercial routes", () => {
  const campaign = fs.readFileSync("lib/spain-campaign.ts", "utf8");
  const route = fs.readFileSync("app/espana/[service]/page.tsx", "utf8");
  const hub = fs.readFileSync("app/espana/page.tsx", "utf8");
  const sitemap = fs.readFileSync("app/sitemap.ts", "utf8");

  for (const slug of [
    "desarrollo-software-a-medida",
    "automatizacion-de-procesos",
    "integracion-api-sistemas",
    "auditoria-seguridad-aplicaciones",
  ]) {
    assert.match(campaign, new RegExp(`"${slug}"`));
    assert.match(sitemap, new RegExp(`/espana/${slug}`));
  }
  assert.match(hub, /trabaja en remoto con empresas de España/);
  assert.match(route, /FAQPage/);
  assert.match(route, /areaServed/);
});

test("lead tracking runs only after analytics consent and records successful forms", () => {
  const banner = fs.readFileSync("components/ui/consent-banner.tsx", "utf8");
  const tracking = fs.readFileSync("components/analytics/conversion-events.tsx", "utf8");
  const contact = fs.readFileSync("components/sections/contact.tsx", "utf8");

  assert.match(banner, /analyticsGranted &&/);
  assert.match(banner, /<ConversionEvents/);
  assert.match(tracking, /book_consultation/);
  assert.match(tracking, /contact_whatsapp/);
  assert.match(tracking, /generate_lead/);
  assert.match(contact, /LEAD_SUBMITTED_EVENT/);
});

test("contact emails do not retain visitor IP addresses", () => {
  const route = fs.readFileSync("app/api/contact/route.ts", "utf8");
  const privacy = fs.readFileSync("app/privacidad/page.tsx", "utf8");

  assert.doesNotMatch(route, /IP:\s*\$\{ip\}/);
  assert.match(privacy, /No la\s+incluimos en el correo de contacto/);
});
