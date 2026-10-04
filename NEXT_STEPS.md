# DEVRUBY — Próximos pasos comerciales

Objetivo: convertir la infraestructura publicada en reuniones cualificadas y primeras ventas, sin basar decisiones en métricas inventadas.

## Prioridad 0 — completar esta semana

- **Legal, decisiones de Dav:** (1) representante en la UE (art. 27 RGPD) o justificar la excepción de tratamiento ocasional; (2) actualizar `/politicas-ekono` y `/privacidad-cascada-app`, que aún nombran a "Consultora Ruby" (y Cascada usa consultoraruby@gmail.com), cuidando la coherencia con las fichas de las tiendas; (3) tener por escrito la autorización de portafolio de cada proyecto publicado (la cláusula 12 del contrato tipo la exige); (4) revisar "Distribución homologada" en ODAV.
- **Directorios (03/10):** ver estado en `docs/directorios-ficha.md`. Pendiente de Dav: verificar Google Business (vídeo/llamada), pedir reseñas en Clutch a clientes reales, terminar GoodFirms cuando su formulario funcione y crear la página de LinkedIn.
- **Ficha de Google (Business Profile):** crearla como empresa de zona de servicio, sin dirección pública (no hay oficina), con web `https://devruby.org` y categoría de desarrollo de software. Es el único punto de la checklist de lanzamiento que no se resuelve en código.
- **Aviso legal:** revisar con un asesor los textos de `/privacidad`, `/cookies` y `/aviso-legal`, y confirmar la retención configurada en GA4.

0. **Servidor (16/09):** confirmar que tras el build del blog `/espana`, `/sitemap.xml` y `www.` responden 200/301 en <2 s. Si siguen en 504, reiniciar la app Node en hPanel (la API devolvía 503) y abrir ticket con Hostinger. Ver BUGS.md.

0b. **Search Console (05/10 o después):** cuota diaria agotada el 04/10 tras 11 solicitudes. Pedir indexación de `/blog/automatizacion-procesos-administrativos-ejemplos` y `/us/blog/rails-8-0-to-8-1-upgrade` (script: inspección de URL → «Solicitar indexación»).
1. **Search Console (03/10):** pedir indexación de los 6 artículos nuevos (`/blog/make-vs-n8n-vs-zapier`, `/blog/chatbot-ia-whatsapp-empresas`, `/blog/automatizar-facturas-con-ia`, `/blog/automatizar-conciliacion-bancaria`, `/us/blog/rails-7-to-8-upgrade-guide`, `/us/blog/ai-automation-for-small-businesses`), de `/us/ruby-on-rails-consulting`, `/us/ai-workflow-automation` y `/blog/automatizacion-de-procesos-con-ia`; en 4–6 semanas comparar impresiones de «ruby on rails consulting» y «automatización de procesos con IA», y el CTR de las páginas con título nuevo.
1b. **Search Console:** desde la cuenta propietaria de `devruby.org`, enviar `https://devruby.org/sitemap.xml` y solicitar indexación de las cinco URLs de España. Registrar fecha y estado por URL.
2. **GA4 (propiedad nueva `G-8N39T9ZRQD`):** `contact_whatsapp` ya es evento clave (04/10). `book_consultation` se disparó el 04/10: marcarlo con la estrella cuando salga en Administrar → Eventos. `generate_lead` aparecerá con el primer envío real del formulario (prueba SMTP del punto 3). Antes: aceptar analítica en una sesión de prueba y confirmar que aparecen `book_consultation`, `contact_whatsapp` y `generate_lead`. Marcar esos tres como conversiones; un clic no equivale a una reunión reservada.
3. **SMTP:** enviar un formulario de prueba y confirmar que llega a `CONTACT_TO` con respuesta posible al email del lead.
4. **Calendly:** comprobar una reserva de prueba, zona horaria de EE. UU./España y preguntas de calificación: empresa, problema, sistemas implicados, plazo y presupuesto aproximado si se desea filtrar.
5. **Registro de leads:** crear una hoja o CRM con: fecha, origen, URL/UTM, empresa, contacto, necesidad, presupuesto, estado, siguiente paso, resultado y motivo de pérdida.

## Prioridad 1 — ventas de España, primeros 60 días

### Canal 1: búsqueda orgánica

- Blog publicado el 16/09 en `/blog` (4 artículos). Ritmo objetivo: 1 artículo cada 2 semanas, cada uno atado a una consulta real de Search Console y enlazando a una landing. Subir `updatedAt` en `lib/blog.ts` al retocar un artículo.

- Mantener las cinco URLs publicadas y medir impresiones, clics, posición y conversiones por URL cada semana.
- No crear páginas de ciudades vacías. Crear una nueva página solo cuando responda a una necesidad concreta, por ejemplo logística, servicios profesionales o SaaS, y cuando exista ejemplo/experiencia relevante.
- Añadir un caso de éxito verificable apenas se cierre o autorice el primer proyecto; debe incluir problema, alcance, entrega, resultado verificable y autorización.

### Canal 2: prospección de alta relevancia

- Elegir un perfil de empresa por ciclo de 30 días: operaciones de servicios B2B con 10–100 empleados y procesos repartidos entre correo, hojas de cálculo, CRM y ERP.
- Identificar responsables de Operaciones, Tecnología o Fundador. Contactar con un mensaje específico sobre un proceso observable, no con una oferta genérica de “desarrollo web”.
- Llevar a la página de España que corresponda al problema: automatización, API o sistema interno.
- No automatizar envíos masivos ni prometer auditorías gratuitas completas. Ofrecer una consulta de diagnóstico de 30 minutos.

### Canal 3: LinkedIn

- Publicar semanalmente una observación técnica aplicable: cómo detectar duplicación de datos, cuándo conviene integrar un CRM, o cómo priorizar hallazgos de una aplicación.
- Enlazar la página de servicio pertinente, no siempre la portada.
- Usar el perfil personal y el de DEVRUBY como prueba de criterio; no simular opiniones de clientes.

## Prioridad 2 — campaña de Estados Unidos

### Posicionamiento recomendado

Usar en inglés una oferta central: **Custom internal tools, workflow automation, and API integrations for operations-heavy service businesses.**

La LLC es una señal de facilidad contractual en EE. UU., no una razón suficiente para comprar. La página debe decir que DEVRUBY LLC trabaja de forma remota a nivel nacional y no afirmar oficinas que no existen.

### Páginas construidas

- `/us`
- `/us/custom-internal-tools`
- `/us/workflow-automation`
- `/us/api-integration-services`
- `/us/application-security-audit`

Las páginas ya usan contenido inglés original, no una copia con “USA” añadido. Añadir `en-US` y relaciones `hreflang` únicamente cuando existan equivalentes reales y revisados; no usar redirecciones por IP.

### Estrategia de adquisición en EE. UU.

1. Empezar con un único nicho y una oferta, no seis servicios a la vez.
2. Hacer búsqueda de alta intención en Google Ads solo cuando las conversiones estén comprobadas. Grupos separados para `custom internal tool development`, `business process automation consulting` y `API integration services`.
3. Añadir negativas iniciales: `jobs`, `salary`, `course`, `tutorial`, `template`, `free software`, `open source`.
4. Enviar cada anuncio a la landing que corresponda exactamente a la búsqueda, con Calendly y WhatsApp identificados por UTM `us`.
5. Empezar por medir reuniones y leads cualificados. No usar bidding automático orientado a ventas hasta contar con suficiente volumen de conversiones de calidad.

## Prioridad 3 — completar evidencia comercial

### Lazo

Ya se verificaron las publicaciones en [Google Play](https://play.google.com/store/apps/details?id=app.lazo.com) y [Apple App Store](https://apps.apple.com/app/id6772797010). El portafolio incluye una ficha pública sin métricas: producto móvil con cuentas vinculadas, actividades diarias, estado compartido y notificaciones.

Para convertirlo en caso de éxito completo, faltan autorización explícita sobre qué construyó DEVRUBY, 2–4 capturas limpias u originales de uso autorizado y un resultado cualitativo o métrica que el responsable permita publicar.

### Maintenance Check

Para convertirlo en caso de éxito completo, recopilar permiso sobre: contexto del problema, entorno autorizado, funciones entregadas, capturas seguras y resultado observable. No publicar información clínica, de pacientes, infraestructura sensible ni métricas sin autorización.

## Cadencia de revisión

| Frecuencia | Revisión |
| --- | --- |
| Cada día laborable | Nuevos leads y respuesta en menos de 24 horas. |
| Cada semana | Impresiones, clics, contactos, reservas, leads cualificados y motivos de pérdida. |
| Cada 30 días | Decidir qué página/nicho amplificar, corregir o eliminar según consultas y conversiones reales. |
| Tras cada venta | Crear evidencia autorizada y mejorar la página que originó el lead. |
