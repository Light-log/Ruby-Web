# DEVRUBY LLC

La marca pública es DEVRUBY y la entidad legal es DEVRUBY LLC. El sitio se orienta a aplicaciones web, APIs, sistemas internos y auditorías técnicas para empresas.

## Conversión

- Calendly: `https://calendly.com/hola-devruby/30min`
- Variable local: `NEXT_PUBLIC_BOOKING_URL`
- Ruta principal: `/agenda`
- Alternativa de contacto: WhatsApp y formulario.

## Confianza

No usar testimonios, calificaciones, número de clientes, porcentajes de ahorro o garantías hasta que exista evidencia verificable. Se mantiene el compromiso explícito de respuesta en menos de 24 horas hábiles y soporte 24/7 post-entrega.

## Visual

Paleta: azul noche `#1A1A2E`, marfil `#F5F1EC`, carmesí `#C41E3A` y lavanda `#7C5CBF`.

El hero mantiene su composición original con `GLSLHills`; se descartaron las
imágenes generadas en el hero y CTA porque reducían el contraste. Los assets
generados se conservan como alternativas no activas. Las siguientes mejoras
visuales deben concentrarse en las imágenes de casos de proyecto, sin alterar
logotipos ni interfaces de los productos.

La portada de RubyQ fue refinada de forma no destructiva como
`public/RubyQ-refined.png` y está activa en las dos vistas de portafolio. Se
retiraron contadores y métricas de proyectos sin evidencia verificable. El
servidor local se reinició tras regenerar la caché `.next` y responde en el
puerto 3000.

## Despliegue

El commit `67aac99` está enviado a `origin/main`: fija Calendly en el código,
elimina métricas internas obsoletas y añade `public/og-devruby.png` (1200×630)
para redes sociales. El dominio público seguía sirviendo la versión anterior
de Consultora Ruby tras el push; falta identificar o esperar su integración de
despliegue.

## Siguiente fase

La campaña SEO de España se estructura en `/espana` y cuatro páginas específicas: software a medida, automatización de procesos, integraciones API y auditoría de seguridad de aplicaciones. No usar redirecciones por IP ni simular una oficina española; DEVRUBY LLC presta el servicio en remoto.

Las CTA de la campaña llevan agenda/WhatsApp y los eventos de intención se miden solo tras consentimiento de analítica. Antes de anunciarse en la UE, revisar legalmente los proveedores reales y transferencias internacionales indicados en `docs/campana-espana-operacion.md`.

La campaña fue comprobada en producción: sus cinco rutas responden 200, aparecen en sitemap y exponen canonical, schema y CTA. El commit `6302b0b` añade atribución de origen para que los contactos españoles lleguen identificados al correo y Calendly conserve UTM de campaña.

La campaña de EE. UU. está activa: `/us` y sus cuatro rutas de servicio en inglés responden HTTP 200. Incluyen schema, sitemap, CTA y origen `us`.

La evidencia comercial autorizada incluye Lazo (publicada en Google Play y App Store) y Maintenance Check. Lazo se presenta como producto móvil con cuentas vinculadas, actividades diarias y notificaciones. Maintenance Check se describe con precisión como una aplicación Windows para alertas y registro de mantenimiento, conectada a un panel web para equipos, actividad QR, personal y empresa. No publicar capturas ni datos internos de clínicas, empleados, números de serie o actividad sin anonimización y autorización específica.

## Dependencias y seguridad — 2026-07-30

Se cerraron las 18 vulnerabilidades reportadas (1 crítica, 11 altas, 6
moderadas) más 2 que aparecieron durante la actualización. `npm audit` queda en
cero.

Next 14.2.35 estaba EOL para esos avisos: no había parche en la línea 14.x, así
que se subió a **Next 15.5.22**, el salto mínimo que cubre los 21 avisos de Next
(el más exigente pedía 15.5.21). Eso obliga a **React 19**, y a la API async de
`params`/`searchParams` en `app/espana/[service]`, `app/us/[service]` y
`app/agenda`. Se mantuvo `framer-motion@11`, que ya declara compatibilidad con
React 19; no se subió a Next 16 para conservar `next lint` y evitar la migración
a eslint 9 flat config.

`nodemailer` subió de 7 a **9.0.3** (major). El uso en `app/api/contact/route.ts`
es mínimo —`createTransport` + `sendMail`— y se verificó que sigue funcionando.
`@types/nodemailer` se quedó en 8.0.1 porque no existe la línea 9.x todavía.

Hay tres `overrides` en `package.json` y conviene no borrarlos sin revisar:

- `brace-expansion: ^5.0.8` — CVE-2026-14257 solo tiene parche en la 5.x; las
  líneas 1.x y 2.x que arrastra la cadena de eslint no lo reciben.
- `postcss: $postcss` — Next vendorizaba su propio postcss 8.4.31; el override
  lo fuerza al 8.5.25 de la dependencia directa.
- `sharp: ^0.35.3` — Next 15 pasa a depender de sharp (Next 14 no lo hacía) y la
  0.34.x hereda CVEs de libvips. El sitio usa `images: { unoptimized: true }`,
  así que sharp no se ejecuta, pero se fija igual.

El lockfile venía desincronizado del parcheo anterior (`npm ci` fallaba por
`nanoid`); se regeneró completo.

**Actualización 2026-08-19:** aparecieron 3 avisos altos nuevos
(`brace-expansion` 5.0.8, `js-yaml` 4.3.0, `nanoid` 3.3.16) y se cerraron sin
cambios mayores; el override de `brace-expansion` pasa a `^5.0.9`, se añade uno
para `js-yaml` en `^4.3.1` y `postcss` sube a `^8.5.26`. `npm audit` vuelve a
cero. Los overrides son ahora cuatro y conviene revisarlos, no borrarlos.

**Actualización 2026-09-14:** el build de Hostinger reportaba 4 avisos nuevos
(1 crítico, 3 altos), todos posteriores a la ronda del 19-ago:

| Paquete | Estaba | Aviso | Ahora |
| --- | --- | --- | --- |
| `next` | 15.5.22 | GHSA-p293-qw3h-jr36 y GHSA-2xp9-vwfh-vxw4, RCE sin autenticación (Windows y AVIF en Image Optimization) | 15.5.25 |
| `nodemailer` | 9.0.3 | GHSA-8m3c-c648-2xjj, GHSA-wmmp-3585-3rmp, GHSA-cc9r-2j5m-2m83, GHSA-2x7j-588g-ccc2: bypass de dominio de destino y DoS en `addressparser` | 9.1.1 |
| `sharp` (override) | 0.35.3 | GHSA-rgj7-g3m4-5g8c, libheif | 0.35.4 |
| `js-yaml` (override) | 4.3.1 | GHSA-2883-xcg3-v3hh, CPU sin límite con merge keys vacíos | 4.3.2 |

Se mantuvo la línea 15.x de Next (`eslint-config-next` acompaña a 15.5.25) y la
9.x de nodemailer; ninguno de los dos saltos de major era necesario. `npm audit`
vuelve a cero también con `--omit=dev`. Verificado con `tsc` limpio, 20/20
tests, `next build` con 33 rutas y `npm ci --dry-run`.

Pendiente conocido, preexistente: **no hay configuración de ESLint en el repo**,
por lo que `npm run lint` abre el asistente interactivo de `next lint` en vez de
analizar. Además `next lint` desaparece en Next 16. Falta decidir la config y
migrar a la CLI de ESLint.

Verificación tras la actualización: `tsc --noEmit` limpio, `next build` genera
las 25 rutas, los 11 tests de `tests/site.test.mjs` pasan, y con el servidor de
producción las 10 rutas comprobadas responden 200, un slug inexistente da 404 y
`/agenda?origen=espana` conserva el `utm_campaign`.

## Search Console — 2026-07-28

El sitemap se reenvió correctamente. Google registraba 136 impresiones, 7 clics y posición media 25,6 en los últimos tres meses; la portada concentraba casi todo el tráfico. `/espana` y `/us` aparecen como “descubierta: actualmente sin indexar”, por lo que se enviaron solicitudes de indexación. Esperar el siguiente rastreo antes de evaluar cambios; no crear más páginas solo por este primer conjunto de datos.

## Espaciado inicial — 2026-08-03

Los heroes de las rutas comerciales comienzan con `pt-3` (12 px) bajo el `Navbar` sticky, conservando su padding inferior. La portada mantiene la misma regla y su chip inicial no usa `FadeIn`, porque la traslación inicial de 18 px de esa animación desplazaba visualmente el primer elemento hasta 30 px bajo la barra. La comprobación visual en escritorio, tablet y móvil confirmó el offset de 12 px, incluido con el menú móvil abierto y cerrado.

## SEO, copy y SEM — 2026-08-03

Se reforzaron las rutas de servicio globales, España y EE. UU. con breadcrumbs
visibles y JSON-LD `BreadcrumbList` compartido, manteniendo `Service` y
`FAQPage` alineados con el contenido visible. El schema de organización se
concentró en software a medida, automatización, integraciones API y auditorías
de seguridad; se retiró la lista `keywords` genérica. Las rutas de EE. UU.
ahora declaran su contenido `en-US` dentro de la página.

Los paquetes operativos de búsqueda de España y EE. UU. quedaron documentados
en `docs/campana-espana-operacion.md`, `docs/campana-us-operacion.md` y
`docs/sem-launch-checklist.md`: grupos por intención, keywords iniciales,
negativas, activos RSA y UTMs. No se creó ni activó ninguna campaña de Ads:
faltan acceso autorizado a la cuenta, titular de facturación, límite diario y
prueba de conversiones tras consentimiento.

El usuario confirmó que la adquisición de pago activa es **Google Ads Search**.
La estructura publicada debe respetar las campañas/grupos, negativas, URLs y
controles de medición documentados; no se verificó ni modificó la cuenta desde
este entorno.

Verificación local: `node --test tests/site.test.mjs`, `npx tsc --noEmit` y
`npm run build` completados correctamente. No se añadieron `hreflang` entre
España y EE. UU. porque no son equivalentes directos de idioma/mercado.

## Cumplimiento y accesibilidad — 2026-09-25

Checklist legal/UX aplicada (19 puntos): páginas `/privacidad` (reescrita, con
proveedores, transferencias y conservación), `/cookies` (tabla de cookies) y
`/aviso-legal` (titular, marcas de terceros, contratación, `#reembolsos` "según
contrato", soporte 24/7 según plan). Las tres usan `components/sections/legal-page.tsx`
y están en footer y sitemap. Los datos registrales viven en `site.registry`
(`lib/site.ts`), tomados de `~/Descargas/Docs/Empresa_LLC/Ficha_Identificacion_DEVRUBY_LLC.pdf`:
LLC de Nuevo México, NM SOS Business ID 0008118174. El EIN no se publica a propósito.

Contraste: `crimson.light` → `#D21F3D` y `lavender` → `#6E4FB0` (≥4,5:1), y los
placeholders sin opacidad. Teclado: `<Button as="span">` dentro de enlaces (había
37 controles anidados) y `:focus-visible` global. Formulario: campos opcionales
etiquetados, `maxLength`, consentimiento exigido también en servidor y registrado
en el correo, y error SMTP genérico (el detalle solo va al log).

Revisión legal 2026-09-25 (segunda pasada): la privacidad cubre ya el art. 13 RGPD
(obligatoriedad de datos, decisiones automatizadas, menores, tratamiento desde
EE. UU./Venezuela y Unsplash como tercero, que recibe la IP al servir fotos de
servicios). Al retirar el consentimiento, `consent-banner.tsx` activa
`ga-disable-<ID>` y borra `_ga*`; se comprobó en el navegador. El "soporte 24/7"
se matiza como "según plan contratado", porque el contrato real excluye el
mantenimiento posterior a la entrega salvo adenda.

## Checklist de lanzamiento (20 puntos) — 2026-10-03

Auditoría contra la lista "20 cosas antes de lanzar tu web". Cerrado en código:
404 propia en español (`app/not-found.tsx`); favicon por convención de Next
(`app/favicon.ico`, `icon.png`, `apple-icon.png`) en lugar de `logo.svg`, que
pesaba 290 KB por llevar un PNG en base64 (el logo visible usa ahora
`public/logo-mark.webp`, 28 KB); RubyQ y Altum en WebP; og-image en JPG (84 KB;
WhatsApp no muestra previews pesadas); botón flotante de WhatsApp
(`components/ui/whatsapp-button.tsx`, bajo el banner de cookies); HSTS sin
`includeSubDomains`; orden de encabezados del footer.

Velocidad: three.js sale del bundle inicial (`next/dynamic`, First Load de `/`
394 → 248 KB), el párrafo LCP del hero ya no anima desde opacity 0, el shader se
pausa fuera de pantalla y, sin WebGL, la página ya no revienta. Lighthouse
móvil local sin WebGL: 61 (antes 35 en producción). Con WebGL, Lighthouse en
esta máquina emula la GPU por CPU y no es representativo. Lo que queda es el
intro de saludos de `ArcRevealHero` (~5 s en la primera visita): es decisión de
diseño, no se tocó.

Los PNG generados que no se usan siguen en `public/` a propósito (alternativas
no activas, ver "Visual"); no afectan a la carga. El test "launch checklist"
de `tests/site.test.mjs` falla si una imagen referenciada pasa de 300 KB.
