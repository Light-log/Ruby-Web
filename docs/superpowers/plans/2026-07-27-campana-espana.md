# Campaña España Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar una campaña SEO de España que atraiga solicitudes cualificadas para software, automatización, integraciones y auditoría técnica.

**Architecture:** Un módulo de datos concentra metadatos, copy, FAQs y schema de las páginas de servicio. Una plantilla server-rendered produce cada ruta y reutiliza navegación, footer y CTA. Un cliente de eventos mide los CTA únicamente cuando existe consentimiento.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, JSON-LD, Google Analytics con consentimiento.

---

### Task 1: Datos y plantilla de campaña

**Files:**
- Create: `lib/spain-campaign.ts`
- Create: `components/sections/spain-service-page.tsx`
- Create: `app/espana/page.tsx`
- Create: `app/espana/[service]/page.tsx`

- [x] Definir los cuatro servicios, copy comercial verificable, preguntas frecuentes, metadata y rutas.
- [x] Renderizar una página central y las páginas específicas con schema `Service` y `FAQPage`.
- [x] Enlazar consulta y WhatsApp con origen de campaña.

### Task 2: Descubrimiento y medición

**Files:**
- Create: `components/analytics/conversion-events.tsx`
- Modify: `components/ui/consent-banner.tsx`
- Modify: `components/sections/footer.tsx`
- Modify: `app/sitemap.ts`

- [x] Escuchar CTA etiquetados tras consentimiento y enviar eventos GA4 de intención de lead.
- [x] Añadir la página central al footer y las cinco rutas al sitemap.

### Task 3: Verificación y operación

**Files:**
- Modify: `tests/site.test.mjs`
- Modify: `PROJECT_CONTEXT.md`
- Create: `docs/campana-espana-operacion.md`

- [ ] Probar estructura, metadatos y tracking con pruebas fuente, TypeScript, build y navegador local. El navegador local queda pendiente por una restricción temporal del entorno.
- [x] Documentar Search Console, conversiones y proceso comercial de respuesta a leads.
- [ ] Hacer commit y push de los cambios intencionados.
