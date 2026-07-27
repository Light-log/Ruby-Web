# Campaña España: diseño

## Objetivo

Convertir búsquedas con intención comercial de empresas españolas en solicitudes de diagnóstico para DEVRUBY LLC. La campaña no aparenta una oficina local: comunica prestación remota internacional y una entidad legal estadounidense.

## Público y posicionamiento

La prioridad es la empresa con una operación que depende de hojas de cálculo, correos, herramientas inconexas o un ERP/CRM que necesita extenderse. El mensaje principal es: *software a medida, automatización e integraciones para ordenar la operación*. La auditoría se limita a aplicaciones, APIs y cloud; no afirma certificaciones, pentesting acreditado ni asesoría de cumplimiento normativo.

## Arquitectura

- `/espana`: página de campaña que diagnostica el problema y enlaza a cada solución.
- `/espana/desarrollo-software-a-medida`: intención de compra para sistemas y portales empresariales.
- `/espana/automatizacion-de-procesos`: intención de compra para flujos manuales y backoffice.
- `/espana/integracion-api-sistemas`: intención de compra para conectar CRM, ERP, SaaS y datos.
- `/espana/auditoria-seguridad-aplicaciones`: intención de compra para revisar una aplicación, API o entorno cloud.

Cada página tendrá metadata única, canonical, JSON-LD de `Service` y FAQ, enlaces internos contextuales, una CTA a Calendly con origen de campaña y WhatsApp. La página central será enlazada desde footer, no se usan redirecciones por IP ni páginas de ciudades artificiales.

## Conversión y analítica

El CTA principal es una consulta inicial de 30 minutos; el alternativo, WhatsApp. Los enlaces incluyen `data-track` para que el cliente de analítica registre `generate_lead`, `book_consultation` y `contact_whatsapp` solo tras consentimiento de analítica. El formulario conserva la ruta de contacto y pasa una etiqueta de origen cuando el visitante llega desde la campaña.

## Criterios de calidad

- Sin testimonios, cifras, logos de clientes ni promesas de ahorro no verificables.
- Lenguaje de España natural y específico sin alegar presencia física.
- HTML útil sin JavaScript para contenido, FAQs y enlaces.
- Sitemap actualizado y pruebas que cubren las nuevas rutas, schema y tracking.
