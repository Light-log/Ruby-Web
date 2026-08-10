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
  assert.match(source, /utm_campaign/);
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
  }

  // El sitemap deriva las rutas de los catálogos en vez de repetir los slugs a
  // mano, así que el contrato que hay que sostener es la derivación: si se
  // añade un servicio al catálogo, entra en el sitemap sin tocar nada más.
  assert.match(sitemap, /spainServiceSlugs\.map\(\(slug\) => entry\(`\/espana\/\$\{slug\}`/);
  assert.match(sitemap, /usServiceSlugs\.map\(\(slug\) => entry\(`\/us\/\$\{slug\}`/);
  assert.match(sitemap, /serviceSlugs\.map\(\(slug\) => entry\(`\/servicios\/\$\{slug\}`/);
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

test("Spain leads retain their campaign origin through booking and contact", () => {
  const agenda = fs.readFileSync("app/agenda/page.tsx", "utf8");
  const contact = fs.readFileSync("components/sections/contact.tsx", "utf8");
  const route = fs.readFileSync("app/api/contact/route.ts", "utf8");

  assert.match(agenda, /\["espana", "us"\]\.includes/);
  assert.match(contact, /get\("origen"\)/);
  assert.match(route, /Nuevo contacto\$\{sourceLabel\}/);
  assert.match(route, /Origen:/);
});

test("U.S. campaign publishes English service pages and retains its origin", () => {
  const campaign = fs.readFileSync("lib/us-campaign.ts", "utf8");
  const hub = fs.readFileSync("app/us/page.tsx", "utf8");
  const route = fs.readFileSync("app/us/[service]/page.tsx", "utf8");
  const agenda = fs.readFileSync("app/agenda/page.tsx", "utf8");
  const sitemap = fs.readFileSync("app/sitemap.ts", "utf8");
  const contactRoute = fs.readFileSync("app/api/contact/route.ts", "utf8");

  for (const slug of ["custom-internal-tools", "workflow-automation", "api-integration-services", "application-security-audit"]) {
    assert.match(campaign, new RegExp(`"${slug}"`));
  }
  // Cobertura en el sitemap por derivación desde el catálogo (ver el test de España).
  assert.match(sitemap, /usServiceSlugs\.map\(\(slug\) => entry\(`\/us\/\$\{slug\}`/);
  assert.match(hub, /U\.S\. company working remotely nationwide/);
  assert.match(route, /FAQPage/);
  assert.match(agenda, /"us"/);
  assert.match(contactRoute, /\[U\.S\.\]/);
});

test("contact emails do not retain visitor IP addresses", () => {
  const route = fs.readFileSync("app/api/contact/route.ts", "utf8");
  const privacy = fs.readFileSync("app/privacidad/page.tsx", "utf8");

  assert.doesNotMatch(route, /IP:\s*\$\{ip\}/);
  assert.match(privacy, /No la\s+incluimos en el correo de contacto/);
});

test("general sales pages avoid unsupported results and compliance claims", () => {
  const process = fs.readFileSync("app/proceso/page.tsx", "utf8");
  const services = fs.readFileSync("app/servicios/page.tsx", "utf8");
  const about = fs.readFileSync("app/nosotros/page.tsx", "utf8");

  assert.doesNotMatch(process, /Sin sorpresas ni retrasos|Calidad garantizada|4-8 semanas/);
  assert.doesNotMatch(services, /pentesting básico|Cumplimiento de normativas básicas/);
  assert.doesNotMatch(about, /hemos acompañado a startups/i);
});

test("service landing pages publish breadcrumb structured data", () => {
  const helper = fs.readFileSync("lib/structured-data.ts", "utf8");
  assert.match(helper, /"@type": "BreadcrumbList"/);

  for (const file of [
    "app/servicios/[slug]/page.tsx",
    "app/espana/[service]/page.tsx",
    "app/us/[service]/page.tsx",
  ]) {
    const source = fs.readFileSync(file, "utf8");
    assert.match(source, /breadcrumbList/);
  }
});

test("service landing pages expose matching visible breadcrumbs", () => {
  for (const file of [
    "components/sections/service-detail-page.tsx",
    "components/sections/spain-service-page.tsx",
    "components/sections/us-service-page.tsx",
  ]) {
    const source = fs.readFileSync(file, "utf8");
    assert.match(source, /aria-label="Breadcrumb"/);
  }
});

test("organization schema describes the focused commercial offer", () => {
  const layout = fs.readFileSync("app/layout.tsx", "utf8");

  assert.match(layout, /"Workflow Automation"/);
  assert.match(layout, /"API Integration Services"/);
  assert.doesNotMatch(layout, /"Inteligencia de Datos"/);
  assert.doesNotMatch(layout, /keywords:/);
});

test("U.S. routes expose English content language", () => {
  for (const file of ["app/us/page.tsx", "components/sections/us-service-page.tsx"]) {
    const source = fs.readFileSync(file, "utf8");
    assert.match(source, /lang="en-US"/);
  }
});

test("production assets use a path outside Hostinger's broken _next proxy rule", () => {
  const config = fs.readFileSync("next.config.mjs", "utf8");

  assert.match(config, /assetPrefix:\s*isDevelopment\s*\?\s*undefined\s*:\s*"\/devruby-assets"/);
});

test("slug guards reject prototype members instead of returning 500", () => {
  // `value in catalog` acierta sobre Object.prototype, así que /servicios/toString
  // pasaba el guard y reventaba el render con un 500 en lugar de devolver 404.
  for (const file of ["lib/services-catalog.ts", "lib/spain-campaign.ts", "lib/us-campaign.ts"]) {
    const source = fs.readFileSync(file, "utf8");
    assert.match(source, /Object\.hasOwn\(/);
    assert.doesNotMatch(source, /return value in \w+;/);
    assert.doesNotMatch(source, /=>\s*value in \w+;/);
  }
});

test("regional landing pages declare a reciprocal hreflang cluster", () => {
  const seo = fs.readFileSync("lib/seo.ts", "utf8");
  const espana = fs.readFileSync("app/espana/page.tsx", "utf8");
  const us = fs.readFileSync("app/us/page.tsx", "utf8");
  const espanaRoute = fs.readFileSync("app/espana/[service]/page.tsx", "utf8");
  const usRoute = fs.readFileSync("app/us/[service]/page.tsx", "utf8");

  assert.match(seo, /"es-ES":/);
  assert.match(seo, /"en-US":/);
  assert.match(seo, /"x-default":/);
  for (const source of [espana, espanaRoute]) assert.match(source, /spainAlternates\(/);
  for (const source of [us, usRoute]) assert.match(source, /usAlternates\(/);
});

test("social cards use a raster og:image, never SVG", () => {
  const seo = fs.readFileSync("lib/seo.ts", "utf8");
  assert.match(seo, /og-devruby\.png/);

  for (const file of [
    "app/contacto/page.tsx",
    "app/nosotros/page.tsx",
    "app/proceso/page.tsx",
    "app/proyectos/page.tsx",
    "app/servicios/page.tsx",
    "app/servicios/[slug]/page.tsx",
    "app/espana/page.tsx",
    "app/espana/[service]/page.tsx",
    "app/us/page.tsx",
    "app/us/[service]/page.tsx",
  ]) {
    const source = fs.readFileSync(file, "utf8");
    assert.match(source, /images: ogImages/);
    assert.doesNotMatch(source, /images: \[\{ url: "\/logo\.svg"/);
  }
});

test("sitemap lastmod tracks content, not build time", () => {
  const sitemap = fs.readFileSync("app/sitemap.ts", "utf8");

  assert.doesNotMatch(sitemap, /lastModified: new Date\(\)/);
  assert.match(sitemap, /CONTENT_UPDATED = new Date\("\d{4}-\d{2}-\d{2}"\)/);
  assert.match(sitemap, /entry\("\/privacidad"/);
});
