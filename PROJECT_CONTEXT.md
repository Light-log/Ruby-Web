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
