import assert from "node:assert/strict";
import test from "node:test";
import { FALLBACK, daysUntil, parseLockfile, verdict } from "../lib/expiry.ts";

const lock = `GEM
  remote: https://rubygems.org/
  specs:
    actionpack (7.2.2)
    rails (7.2.2)
      actionpack (= 7.2.2)
    railties (7.2.2)

RUBY VERSION
   ruby 3.3.4p94

BUNDLED WITH
   2.5.11
`;

test("lee Rails y Ruby del Gemfile.lock", () => {
  assert.deepEqual(parseLockfile(lock), { rails: "7.2.2", ruby: "3.3.4" });
});

test("sin gema rails usa railties, y sin RUBY VERSION devuelve null", () => {
  const apiOnly = "GEM\n  specs:\n    railties (8.0.2)\n      actionpack (= 8.0.2)\n";
  assert.deepEqual(parseLockfile(apiOnly), { rails: "8.0.2", ruby: null });
  assert.deepEqual(parseLockfile("no es un lockfile"), { rails: null, ruby: null });
});

test("veredictos con las fechas de endoflife.date", () => {
  const hoy = "2026-10-19";
  const r72 = verdict("rails", "7.2.2", FALLBACK.rails, hoy);
  assert.equal(r72.status, "expired");
  assert.equal(r72.latestPatch, "7.2.4");
  assert.equal(verdict("rails", "8.0.5.1", FALLBACK.rails, hoy).status, "security-only");
  assert.equal(verdict("rails", "8.0.5.1", FALLBACK.rails, hoy).latestPatch, undefined);
  assert.equal(verdict("rails", "8.1.0", FALLBACK.rails, "2026-10-01").status, "supported");
  assert.equal(verdict("rails", "5.2.8", FALLBACK.rails, hoy).status, "expired");
  assert.equal(verdict("rails", "9.0.0", FALLBACK.rails, hoy).status, "unknown");
  assert.equal(verdict("ruby", "3.3.4", FALLBACK.ruby, hoy).status, "supported");
  assert.equal(verdict("ruby", "3.2.9", FALLBACK.ruby, hoy).status, "expired");
});

test("días hasta el fin de parches", () => {
  assert.equal(daysUntil("2026-11-07", "2026-10-19"), 19);
  assert.equal(daysUntil("2026-08-09", "2026-10-19"), -71);
});
