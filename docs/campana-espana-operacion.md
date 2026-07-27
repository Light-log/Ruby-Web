# Operación de campaña España

## Propuesta que se comunica

DEVRUBY LLC presta de forma remota desarrollo de software a medida, automatización, integraciones API y auditorías técnicas de aplicaciones. La campaña se dirige a empresas españolas con procesos manuales, datos dispersos o sistemas que necesitan conectarse. No comunica una oficina española, casos de éxito no verificados, certificaciones ni resultados cuantificados.

## Rutas publicadas

- `/espana`: página central de campaña.
- `/espana/desarrollo-software-a-medida`
- `/espana/automatizacion-de-procesos`
- `/espana/integracion-api-sistemas`
- `/espana/auditoria-seguridad-aplicaciones`

## Medición

Los eventos se emiten solo después de que la persona acepte analítica:

| Evento GA4 | Señal |
| --- | --- |
| `view_schedule` | Abre la agenda desde el sitio |
| `book_consultation` | Sale a Calendly |
| `contact_whatsapp` | Abre WhatsApp |
| `begin_contact` | Inicia la vía de contacto |
| `generate_lead` | El formulario respondió correctamente |

En GA4, marcar como conversiones `book_consultation`, `contact_whatsapp` y `generate_lead`. Una reserva debe confirmarse después en Calendly; el clic no prueba que la reunión se haya reservado.

## Rutina comercial

1. Responder cada lead en menos de 24 horas laborables.
2. Pedir antes de la reunión: proceso afectado, resultado esperado, sistemas implicados, responsable de decisión y plazo deseado.
3. En la consulta, cerrar con uno de tres resultados: no encaja, diagnóstico adicional pagado o propuesta con un primer alcance pequeño.
4. Registrar fuente (`espana`, orgánico, WhatsApp, Calendly), estado, próximo paso y motivo de pérdida en una hoja o CRM. Los contactos que lleguen desde la campaña incluyen `Origen: espana` en el correo y el asunto se marca con `[España]`.
5. Revisar semanalmente impresiones, clics, consultas y conversiones por cada URL en Search Console y GA4.

## Lanzamiento técnico

1. En el hosting, desactivar las opciones de **sitio estático** y **SPA** y quitar la configuración Nginx destinada a `index.html`. El proyecto debe arrancar con `npm run start`, no con `nginx:alpine`, porque necesita rutas server-rendered y `/api/contact`.
2. Configurar `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` y `CONTACT_TO`; enviar un formulario de prueba y confirmar su recepción.
3. Verificar que `https://devruby.org/sitemap.xml` sirve las rutas nuevas y enviarlo desde la propiedad correcta de Search Console.
4. Comprobar en modo de vista previa de GA4 que los eventos aparecen solo tras aceptar analítica.
5. Solicitar indexación de `/espana` y de las cuatro páginas de servicio. No usar redirecciones por IP ni crear páginas de ciudades sin contenido propio.

## Privacidad antes de invertir en publicidad de la UE

La política se ha alineado para no incluir la IP en los correos de leads. Aun así, antes de hacer una campaña de pago dirigida a la UE, DEVRUBY debe revisar con asesoría especializada la política y los contratos de sus proveedores reales de hosting, SMTP, Calendly y Google Analytics. La información del RGPD debe reflejar destinatarios, plazo de conservación y transferencias internacionales reales; no se deben inventar esos datos.
