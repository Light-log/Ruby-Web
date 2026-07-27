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
