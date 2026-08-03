# SEM Campaign Operations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce and, once authorized account access exists, apply a Google Ads search structure where every ad group targets one commercial intent, one matching landing page, and one measurable lead action.

**Architecture:** A versioned campaign operations document is the source of truth for the initial launch. It holds language, location, keywords, negatives, responsive-search-ad assets, URL templates and conversion definitions. Google Ads is changed only after the document is approved and account-level budget, geography and conversion settings are verified.

**Tech Stack:** Google Ads Search, GA4 consent-gated events, Calendly, Next.js campaign landing pages, UTM parameters.

---

## File structure

- Modify: `docs/campana-espana-operacion.md` — Spanish search campaign build sheet.
- Modify: `docs/campana-us-operacion.md` — U.S. search campaign build sheet.
- Create: `docs/sem-launch-checklist.md` — access, billing, conversion and launch gate checklist.
- Modify: `PROJECT_CONTEXT.md` — record which account actions were applied and their date; never record credentials.

### Task 1: Define conversions and URL attribution before ad creation

**Files:**
- Create: `docs/sem-launch-checklist.md`
- Modify: `docs/campana-espana-operacion.md`
- Modify: `docs/campana-us-operacion.md`

- [ ] **Step 1: List the three lead-intent conversions**

Define `book_consultation`, `contact_whatsapp`, and `generate_lead` as consent-gated events. Treat a scheduled meeting and a qualified lead in CRM as downstream business outcomes; do not optimize toward page views or button clicks as sales.

- [ ] **Step 2: Define final URL templates**

Use a market-specific template. Replace the brace values in Google Ads tracking fields rather than publishing the braces directly in an ad.

```text
https://devruby.org/espana/automatizacion-de-procesos?utm_source=google&utm_medium=cpc&utm_campaign=es_search_automation&utm_content={adgroupid}&utm_term={keyword}
https://devruby.org/us/workflow-automation?utm_source=google&utm_medium=cpc&utm_campaign=us_search_workflow&utm_content={adgroupid}&utm_term={keyword}
```

- [ ] **Step 3: Add launch blockers**

Require Ads account access, billing owner approval, a confirmed geographic target, a daily budget ceiling, and a live conversion test after analytics consent. Do not enable campaigns if any item is absent.

- [ ] **Step 4: Commit documentation**

```bash
git add docs/sem-launch-checklist.md docs/campana-espana-operacion.md docs/campana-us-operacion.md
git commit -m "docs: define SEM launch measurement"
```

### Task 2: Build the Spanish campaign sheet

**Files:**
- Modify: `docs/campana-espana-operacion.md`

- [ ] **Step 1: Define the campaign settings**

Set search-only, Spanish language, Spain target, and manual CPC or Maximize Clicks with a capped budget during data collection. Do not enable Display expansion, search partners, automatic recommendations, broad match, or automated sales bidding at launch.

- [ ] **Step 2: Add four exact/phrase intent groups**

Create groups and final URLs: `software_a_medida` → `/espana/desarrollo-software-a-medida`; `automatizacion_procesos` → `/espana/automatizacion-de-procesos`; `integracion_api` → `/espana/integracion-api-sistemas`; `auditoria_seguridad` → `/espana/auditoria-seguridad-aplicaciones`. Seed with exact and phrase versions of the terms in the design spec; exclude informational phrases from every group.

- [ ] **Step 3: Write compliant Spanish RSA assets**

For each group document 10–15 headlines and 4 descriptions. Include the primary intent in at least three headlines, the operational problem in at least two, remote delivery truthfully in one, and `Consulta inicial de 30 minutos` in one. Do not state `líder`, `mejor`, savings, guarantees or certifications without evidence.

- [ ] **Step 4: Add account and campaign negatives**

Add `empleo`, `trabajo`, `sueldo`, `curso`, `tutorial`, `plantilla`, `gratis`, `open source`, `descargar`, `software gratis`, and names of unrelated support products after reviewing search terms. Keep negatives as a table with match type and scope.

- [ ] **Step 5: Commit**

```bash
git add docs/campana-espana-operacion.md
git commit -m "docs: prepare Spain search campaign"
```

### Task 3: Build the U.S. campaign sheet

**Files:**
- Modify: `docs/campana-us-operacion.md`

- [ ] **Step 1: Define the campaign settings**

Set search-only, English language, U.S. target, and a capped learning budget using manual CPC or Maximize Clicks. Exclude Display expansion and automatic conversion bidding until qualified conversion volume exists.

- [ ] **Step 2: Add four exact/phrase intent groups**

Create `custom_internal_tools` → `/us/custom-internal-tools`; `workflow_automation` → `/us/workflow-automation`; `api_integration` → `/us/api-integration-services`; `application_security_audit` → `/us/application-security-audit`. Use only the commercial terms set in the design spec plus close variants discovered in the Search Terms report after launch.

- [ ] **Step 3: Write compliant English RSA assets**

For each group document 10–15 headlines and 4 descriptions. Include its keyword in at least three headlines, a concrete operations problem in two, `U.S. company · remote nationwide` in one, and `30-minute discovery call` in one. Do not promise incident prevention, compliance certification, fixed costs, or outcomes.

- [ ] **Step 4: Add account and campaign negatives**

Add `jobs`, `job`, `salary`, `career`, `course`, `tutorial`, `template`, `free software`, `open source`, `download`, and irrelevant vendor-support terms. Review actual queries weekly before expanding negatives.

- [ ] **Step 5: Commit**

```bash
git add docs/campana-us-operacion.md
git commit -m "docs: prepare US search campaign"
```

### Task 4: Apply Google Ads changes after authorized access

**Files:**
- Modify: `PROJECT_CONTEXT.md`

- [ ] **Step 1: Confirm authority in the account**

Verify that the connected user can create campaigns and that the billing profile belongs to the business. Record account ID only if the owner explicitly authorizes it; never copy credentials to the repository.

- [ ] **Step 2: Create campaigns paused**

Enter the approved campaign settings, ad groups, keywords, negatives, RSAs, sitelinks, callouts, final URLs and URL templates from Tasks 2–3. Keep both campaigns paused.

- [ ] **Step 3: Validate conversion routing**

Open each final URL, grant analytics consent in a test session, execute a test agenda/contact/WhatsApp path, and verify the expected GA4 event and UTM values reach the lead record.

- [ ] **Step 4: Obtain budget approval and enable**

Before enabling, obtain a written budget ceiling and confirmation that the owner accepts the exact locations, language and daily spending. Enable only the approved market campaign.

- [ ] **Step 5: Record the applied state**

Append the date, markets enabled, budget ceilings, conversion test results and campaign status to `PROJECT_CONTEXT.md` without account secrets.

- [ ] **Step 6: Commit the deployment record**

```bash
git add PROJECT_CONTEXT.md
git commit -m "docs: record SEM campaign launch"
```

### Task 5: First 30-day operating cadence

**Files:**
- Modify: `docs/sem-launch-checklist.md`

- [ ] **Step 1: Create a weekly query review table**

Track date, campaign, search term, match type, clicks, spend, leads, qualified leads, action, and rationale. Add a negative only if it is irrelevant or has repeated low-intent cost.

- [ ] **Step 2: Define optimization thresholds**

Do not use target CPA or automated sales bidding until enough qualified lead conversions exist to represent the business outcome. Pause or reduce terms only after reviewing spend, search intent and follow-up quality together.

- [ ] **Step 3: Commit**

```bash
git add docs/sem-launch-checklist.md
git commit -m "docs: add SEM review cadence"
```

