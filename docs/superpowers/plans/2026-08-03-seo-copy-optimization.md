# SEO and Commercial Copy Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every commercial route describe the same evidence-based offer, match a search intent, and expose correct search metadata and structured data.

**Architecture:** The service and market catalogs remain the single source of truth for service copy and route metadata. Reusable page components render the content and shared JSON-LD helpers add navigational context without duplicating invisible claims. Page-level copy strengthens the path from problem to a 30-minute consultation while preserving existing source attribution.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Schema.org JSON-LD, Node test runner.

---

## File structure

- Modify: `lib/services-catalog.ts` — precise outcome-led copy and metadata for the eight global service intents.
- Modify: `lib/spain-campaign.ts` — Spanish-market titles, descriptions and service evidence.
- Modify: `lib/us-campaign.ts` — U.S. English intent language and consistent offer vocabulary.
- Create: `lib/structured-data.ts` — small pure functions for organization, service FAQ and breadcrumbs JSON-LD.
- Modify: `app/layout.tsx` — organization schema aligned with the public offer; remove keyword stuffing.
- Modify: `app/servicios/page.tsx`, `app/servicios/[slug]/page.tsx` — category/ficha metadata, topical copy and schema.
- Modify: `app/espana/page.tsx`, `app/espana/[service]/page.tsx`, `components/sections/spain-service-page.tsx` — Spain-specific conversion path and breadcrumbs.
- Modify: `app/us/page.tsx`, `app/us/[service]/page.tsx`, `components/sections/us-service-page.tsx` — U.S. metadata, locale and conversion path.
- Modify: `components/sections/{hero,services,proof,process,portfolio,cta-section,contact,footer,navbar}.tsx` — homepage and shared navigation copy/internal linking.
- Modify: `app/{nosotros,proceso,proyectos,contacto,agenda}/page.tsx` — corporate-page copy, metadata and precise CTAs.
- Modify: `tests/site.test.mjs` — route, metadata, schema and campaign-link assertions.

### Task 1: Add regression coverage for commercial SEO

**Files:**
- Modify: `tests/site.test.mjs`

- [ ] **Step 1: Write the failing assertions**

Add routes and expected values to the existing server-backed test table. The assertions must cover `/servicios`, every `serviceSlugs` route, `/espana`, its four service routes, `/us`, its four service routes, `/contacto`, and `/agenda`. For each page assert HTTP 200, exactly one canonical pointing to the route, a non-empty title and description, one H1, and at least one conversion CTA.

```js
assert.match(html, /<link rel="canonical" href="https:\/\/devruby\.org\/us\/workflow-automation"/);
assert.match(html, /<h1[^>]*>.*Remove manual handoffs/s);
assert.match(html, /data-track="agenda"|data-track="booking"|data-track="contact"/);
```

- [ ] **Step 2: Run the targeted test to verify the baseline**

Run: `node --test tests/site.test.mjs`

Expected: the existing suite passes or exposes only assertions caused by the intended, not-yet-implemented SEO requirements.

- [ ] **Step 3: Add structured-data assertions**

Parse script tags with `type="application/ld+json"` and assert that a service page contains `Service`, `FAQPage`, and `BreadcrumbList`; assert every breadcrumb final URL equals the canonical URL.

```js
const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
  .flatMap(([, json]) => JSON.parse(json)["@graph"] ?? [JSON.parse(json)]);
assert.ok(blocks.some((item) => item["@type"] === "BreadcrumbList"));
```

- [ ] **Step 4: Run the test to verify the new requirements fail**

Run: `node --test tests/site.test.mjs`

Expected: FAIL until breadcrumb JSON-LD is implemented.

- [ ] **Step 5: Commit the test-only change**

```bash
git add tests/site.test.mjs
git commit -m "test: cover commercial SEO metadata"
```

### Task 2: Centralize safe structured data

**Files:**
- Create: `lib/structured-data.ts`
- Modify: `app/layout.tsx`
- Modify: `app/servicios/[slug]/page.tsx`
- Modify: `app/espana/[service]/page.tsx`
- Modify: `app/us/[service]/page.tsx`

- [ ] **Step 1: Implement a pure breadcrumb builder**

Create a function that accepts a current page name and absolute URL and returns visible navigation only. Do not add a language alternate or geographic claim.

```ts
export function breadcrumbList(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
```

- [ ] **Step 2: Render breadcrumb JSON-LD per service route**

Use `Home → Services → current service` for global services, `Home → Spain → current service` for Spain, and `Home → United States → current service` for U.S. services. Include the returned breadcrumb in the existing `@graph` next to only the visible service and FAQs.

- [ ] **Step 3: Align root organization schema**

Set `serviceType` to the public core offer: `Custom Software Development`, `Workflow Automation`, `API Integration Services`, and `Application Security Audits`. Preserve legal name, remote delivery, phone/email, and existing verified location; remove technology labels and unverified capability categories from the organization schema.

- [ ] **Step 4: Run tests**

Run: `node --test tests/site.test.mjs`

Expected: PASS, including structured-data assertions.

- [ ] **Step 5: Commit**

```bash
git add lib/structured-data.ts app/layout.tsx app/servicios/[slug]/page.tsx app/espana/[service]/page.tsx app/us/[service]/page.tsx tests/site.test.mjs
git commit -m "feat: add service breadcrumbs to structured data"
```

### Task 3: Refocus catalogs and metadata on search intent

**Files:**
- Modify: `lib/services-catalog.ts`
- Modify: `lib/spain-campaign.ts`
- Modify: `lib/us-campaign.ts`
- Modify: `app/servicios/page.tsx`

- [ ] **Step 1: Rewrite global catalog fields, not service scope**

For every service, update `title`, `description`, `summary`, `intro`, capabilities and FAQ answers so the primary term appears naturally in the title/H1/intro and the copy states a workflow problem, delivery, and bounded next step. Keep claims conditional when technical feasibility depends on discovery.

```ts
description: "Automatización de procesos para empresas: conecta tareas, validaciones y avisos para reducir trabajo manual sin eliminar el control del equipo.",
```

- [ ] **Step 2: Align Spain and U.S. core vocabulary**

Use `software a medida`, `automatización de procesos`, `integración de sistemas/API` and `auditoría de seguridad de aplicaciones` in Spanish. Use `custom internal tools`, `workflow automation`, `API integration services`, and `application security audit` in U.S. pages. Retain separate copy; never translate a page word-for-word or claim an office in Spain.

- [ ] **Step 3: Update the catalog-page metadata and hero**

Replace the generic hero with a search-aligned message such as: `Servicios de software para operaciones que necesitan más control` and a supporting line explaining internal tools, automation, integrations and technical review. Remove the `keywords` metadata array; it is not used by modern search engines and encourages unfocused terms.

- [ ] **Step 4: Run TypeScript and SEO tests**

Run: `npx tsc --noEmit && node --test tests/site.test.mjs`

Expected: both commands exit 0.

- [ ] **Step 5: Commit**

```bash
git add lib/services-catalog.ts lib/spain-campaign.ts lib/us-campaign.ts app/servicios/page.tsx
git commit -m "feat: align service copy with search intent"
```

### Task 4: Improve landing-page conversion copy and internal links

**Files:**
- Modify: `components/sections/service-detail-page.tsx`
- Modify: `components/sections/spain-service-page.tsx`
- Modify: `components/sections/us-service-page.tsx`
- Modify: `app/espana/page.tsx`
- Modify: `app/us/page.tsx`

- [ ] **Step 1: Make each hero answer problem, approach, and next action**

Keep one H1. The paragraph must state the operational context; the primary CTA must state the 30-minute call outcome (`Valorar el siguiente alcance` / `Book a discovery call`) and the secondary CTA must link to a relevant adjacent service or a contact path. Preserve existing `data-track` values and origin/UTM functions.

- [ ] **Step 2: Add visible breadcrumbs matching the JSON-LD**

Use plain `Link` elements above the H1 with accessible labels. Every item except the current page must be clickable. Do not hide this navigation in CSS.

```tsx
<nav aria-label="Breadcrumb" className="text-sm text-ivory-muted">
  <Link href="/espana">España</Link><span aria-hidden> / </span><span>{service.shortTitle}</span>
</nav>
```

- [ ] **Step 3: Link campaign service cards to precise landing pages**

On `/espana` and `/us`, use descriptive anchor text matching each service title and include a contextual link from the final CTA to `/contacto?origen=espana` or `/contacto?origen=us`.

- [ ] **Step 4: Run tests and build**

Run: `node --test tests/site.test.mjs && npm run build`

Expected: exit 0 and build lists all static market/service routes.

- [ ] **Step 5: Commit**

```bash
git add components/sections/service-detail-page.tsx components/sections/spain-service-page.tsx components/sections/us-service-page.tsx app/espana/page.tsx app/us/page.tsx
git commit -m "feat: improve campaign landing conversion paths"
```

### Task 5: Rewrite shared and corporate-page copy

**Files:**
- Modify: `components/sections/hero.tsx`
- Modify: `components/sections/services.tsx`
- Modify: `components/sections/proof.tsx`
- Modify: `components/sections/process.tsx`
- Modify: `components/sections/portfolio.tsx`
- Modify: `components/sections/cta-section.tsx`
- Modify: `components/sections/contact.tsx`
- Modify: `components/sections/footer.tsx`
- Modify: `components/sections/navbar.tsx`
- Modify: `app/nosotros/page.tsx`
- Modify: `app/proceso/page.tsx`
- Modify: `app/proyectos/page.tsx`
- Modify: `app/contacto/page.tsx`
- Modify: `app/agenda/page.tsx`

- [ ] **Step 1: Rewrite homepage copy around the central offer**

The hero describes a company with disconnected operational work, the services section names the four central offers, and the CTA requests a relevant first conversation. Preserve only verified project statements in proof and portfolio modules.

- [ ] **Step 2: Tighten corporate pages to support purchase decisions**

`/nosotros` explains how DEVRUBY works remotely without generic self-praise. `/proceso` explains discovery, scope, delivery and handoff without fixed-duration or outcome guarantees. `/proyectos` identifies what is public and avoids unverified attribution. `/contacto` and `/agenda` explain what to prepare and when DEVRUBY replies.

- [ ] **Step 3: Add contextual internal links**

Link process stages to the relevant service and portfolio evidence to the related service only when accurate. Nav/footer include `/servicios`, `/espana`, `/us`, `/proyectos`, `/proceso`, `/contacto`, and `/agenda`; do not create links to nonexistent routes.

- [ ] **Step 4: Run format checks, type-check, build and tests**

Run: `git diff --check && npx tsc --noEmit && npm run build && node --test tests/site.test.mjs`

Expected: each command exits 0.

- [ ] **Step 5: Commit**

```bash
git add components/sections app/nosotros/page.tsx app/proceso/page.tsx app/proyectos/page.tsx app/contacto/page.tsx app/agenda/page.tsx
git commit -m "feat: strengthen commercial site copy"
```

### Task 6: Verify production-ready SEO

**Files:**
- Modify: `PROJECT_CONTEXT.md`

- [ ] **Step 1: Start the production server**

Run: `npm run build && npm run start`

Expected: server starts on the configured port.

- [ ] **Step 2: Inspect route output**

Run: `curl -fsS http://localhost:3000/servicios/automatizacion-de-procesos | rg -o '<title>[^<]+|rel="canonical" href="[^"]+|BreadcrumbList|FAQPage|Service'`

Expected: a unique title, correct canonical, and all three JSON-LD types.

- [ ] **Step 3: Record verification evidence**

Append the exact commands and successful date to `PROJECT_CONTEXT.md`, including that no market-specific `hreflang` was added because no true page equivalents exist.

- [ ] **Step 4: Commit verification record**

```bash
git add PROJECT_CONTEXT.md
git commit -m "docs: record SEO copy verification"
```

