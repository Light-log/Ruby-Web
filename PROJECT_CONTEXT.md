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

La campaña de EE. UU. está en `origin/main` desde el commit `1c18a8e`: `/us` y cuatro rutas de servicio en inglés, con schema, sitemap, CTA y origen `us`. En la comprobación posterior al push, `https://devruby.org/us` devolvía 404; falta esperar o revisar el despliegue automático antes de declarar la campaña pública.
