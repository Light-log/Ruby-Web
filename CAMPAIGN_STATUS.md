# DEVRUBY — Estado de campañas y activos comerciales

Última revisión: 2026-07-28.

## Propuesta comercial vigente

DEVRUBY LLC desarrolla aplicaciones web, APIs, sistemas internos, automatizaciones e inspecciones técnicas de seguridad para empresas. La oferta no usa testimonios, número de clientes, porcentajes de ahorro ni garantías que no puedan probarse.

La consulta inicial dura 30 minutos. La vía principal es Calendly y las alternativas son WhatsApp (`+58 416 411 8747`) y formulario.

## Fundamentos de conversión construidos

- Marca pública: **DEVRUBY**. Entidad legal: **DEVRUBY LLC**.
- CTA principal enviado a `/agenda`; Calendly se resuelve con `NEXT_PUBLIC_BOOKING_URL` o con su URL de respaldo.
- Formulario con validación, honeypot, rate limit básico y envío por SMTP.
- Banner de cookies que carga GA4 solo después del consentimiento.
- Eventos de intención: agenda, salida a Calendly, WhatsApp, inicio de contacto y formulario enviado correctamente.
- El formulario y la agenda conservan el origen `espana`; los emails de esa campaña llegan con el asunto `Nuevo contacto [España]` y `Origen: espana`.
- Metadatos, canonical, Open Graph, robots y sitemap disponibles.

## Campaña España publicada

| URL | Intención |
| --- | --- |
| `/espana` | Página central: software, automatización e integraciones para operaciones dispersas. |
| `/espana/desarrollo-software-a-medida` | Sistema interno, portal o aplicación web a medida. |
| `/espana/automatizacion-de-procesos` | Trabajo manual, aprobaciones y backoffice. |
| `/espana/integracion-api-sistemas` | Conexión de CRM, ERP, SaaS y datos. |
| `/espana/auditoria-seguridad-aplicaciones` | Revisión técnica de aplicaciones, APIs y cloud. |

Cada página incorpora contenido propio, CTA a agenda y WhatsApp, FAQ visible y JSON-LD `Service` + `FAQPage`. No hay redirecciones por IP ni afirmaciones de tener oficina española.

## Verificación de producción realizada

El 2026-07-28 se verificó públicamente que las cinco rutas de España, `/agenda` y `/contacto` responden HTTP 200. Las URLs España están incluidas en `https://devruby.org/sitemap.xml`; `https://devruby.org/robots.txt` permite rastreo. La página de software a medida expone title, description, canonical, schema y enlaces a Calendly/WhatsApp.

## Casos y activos disponibles

- **RubyQ:** plataforma SaaS de atención omnicanal con IA; pública en `q.devruby.org`.
- **Ekono:** aplicación móvil publicada en Google Play.
- **Obelium App, Altum Legal, ODAV, Titan Fitness:** productos listados en `/proyectos` con sus características públicas.
- **Maintenance Check:** suite Windows para alertas overlay y mantenimiento en equipos médicos. Caso de éxito autorizado por el usuario, sin resultados cuantificados publicados.
- **Lazo:** aplicación publicada en Apple App Store y Google Play; caso de éxito autorizado por el usuario. Faltan URLs de tienda, descripción verificada, capturas y autorización de copy antes de publicarlo como ficha detallada.

## Límites conocidos

- No existen aún métricas propias de impresiones, clics, reservas, leads cualificados o ventas; no se debe inferir rendimiento comercial hasta tenerlas.
- La atribución de España está en el repositorio (`b469dd3`) y debe validarse de nuevo en producción después de que el hosting termine ese despliegue.
- Antes de publicidad dirigida a la UE se debe validar la política de privacidad y los proveedores reales con asesoría adecuada.
