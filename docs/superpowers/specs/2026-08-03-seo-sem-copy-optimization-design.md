# DEVRUBY — Optimización integral de SEO, SEM y copy

Fecha: 2026-08-03

## Objetivo

Concentrar la propuesta de valor de DEVRUBY en software operativo a medida,
automatización de procesos, integraciones API y auditorías técnicas de
seguridad. Mejorar el copy de todas las rutas comerciales, la relevancia
orgánica por intención y la preparación de Google Ads para España y Estados
Unidos, sin publicar métricas, testimonios, oficinas o resultados no
verificables.

## Alcance

Se revisarán y mejorarán estas rutas comerciales: portada, servicios y sus
fichas, España y sus cuatro servicios, Estados Unidos y sus cuatro servicios,
proyectos, proceso, nosotros, contacto y agenda. Las políticas de privacidad
no se reescribirán salvo que exista una contradicción factual; no son páginas
de adquisición.

La campaña SEM se entregará como una matriz operativa para Google Ads con
grupos de anuncios, términos de intención, negativas, anuncios RSA, activos,
UTMs y destino. No se creará ni se modificará una campaña publicitaria activa
sin acceso autorizado a la cuenta ni se asumirá presupuesto.

## Enfoque de contenido

La web utilizará una jerarquía clara:

1. Oferta central: herramientas internas, automatización e integraciones para
   operaciones que han superado hojas de cálculo, correos y sistemas aislados.
2. Servicios de apoyo: desarrollo de software, aplicaciones móviles, IA,
   datos, infraestructura, seguridad y UX se explican por el problema que
   resuelven, sin competir entre sí con promesas vagas.
3. Prueba: proceso de descubrimiento, documentación, alcance autorizado y
   proyectos publicados. No se inventan ahorros, plazos garantizados, clientes
   ni certificaciones.
4. Conversión: una consulta inicial de 30 minutos como siguiente paso; cada
   CTA conserva el origen de campaña y dirige al canal adecuado.

## SEO técnico y semántico

- Mantener title, description, canonical, Open Graph y Twitter específicos por
  ruta. Los títulos reflejarán la intención principal sin repetir la marca.
- Añadir `BreadcrumbList` a fichas de servicios y landings de campaña; mantener
  `Service` y `FAQPage` solo cuando el contenido visible coincida exactamente
  con el marcado.
- Declarar de forma correcta el idioma y locale de las rutas estadounidenses
  (`en-US` / `en_US`) sin inventar relaciones `hreflang` entre páginas que no
  son equivalentes directos.
- Reforzar enlaces internos desde las páginas de autoridad (portada, servicios,
  proyectos y proceso) a las landing de intención correspondiente.
- Mantener sitemap, robots y canonical; no añadir páginas de ciudades ni
  variantes de palabras clave sin necesidad comercial real.

## Arquitectura de cambios

- `lib/services-catalog.ts`, `lib/spain-campaign.ts` y `lib/us-campaign.ts`
  concentran la propuesta de valor, títulos, descripciones, dolores,
  entregables y preguntas frecuentes de cada intención.
- Las páginas y componentes reutilizables renderizan ese contenido y añaden
  datos estructurados consistentes. Las rutas comerciales no duplican datos de
  campaña.
- La metadata específica de cada mercado hereda solo los valores globales que
  sean válidos para ese mercado. Se añadirán imágenes sociales consistentes si
  ya existe un activo adecuado; no se crearán imágenes ficticias.
- Se añadirá un documento de operaciones SEM con dos campañas separadas:
  España (español) y EE. UU. (inglés), cada una con grupos de anuncios por
  intención y una sola landing alineada por grupo.

## Flujo de conversión y medición

`anuncio o resultado orgánico → landing de intención → agenda/contacto/WhatsApp
→ evento con consentimiento → lead con UTM/origen`.

Los enlaces de pago usarán UTMs diferenciados (`utm_source=google`,
`utm_medium=cpc`, campaña, grupo y término cuando la plataforma lo permita).
Los eventos existentes medirán intención, no ventas: las conversiones de
negocio se validarán posteriormente en CRM/Calendly.

## SEM propuesto

### España

- Software a medida: búsquedas de software a medida empresarial, desarrollo
  de aplicaciones empresariales y sistema interno a medida.
- Automatización: automatización de procesos empresariales, automatización de
  backoffice y consultoría de automatización.
- Integración: integración API, integración CRM ERP e integración de sistemas.
- Seguridad: auditoría de seguridad de aplicaciones y auditoría de API.

### Estados Unidos

- Custom internal tools: custom internal tool development y custom business
  software development.
- Workflow automation: business process automation consulting y workflow
  automation services.
- API integrations: API integration services y CRM ERP integration services.
- Application security: application security audit y API security assessment.

Las negativas iniciales cubrirán empleo, formación, plantillas, software
gratuito, open source y consultas de soporte de productos ajenos. Las pujas,
ubicaciones, idiomas y presupuestos se decidirán dentro de la cuenta según los
límites aprobados por el cliente.

## Riesgos y controles

- No afirmar presencia física en España; DEVRUBY LLC trabaja en remoto.
- Seguridad: no prometer certificaciones ni realizar comprobaciones fuera de
  un alcance autorizado por escrito.
- No activar Ads, píxeles ni proveedores nuevos sin consentimiento y acceso
  autorizado.
- Si no existe acceso a Google Ads, se entrega el paquete de carga y la lista
  exacta de pasos de activación, con presupuesto pendiente.

## Verificación

- TypeScript y build de Next sin errores.
- Pruebas existentes del sitio y verificación estática de cada ruta comercial:
  title, description, canonical, H1, schema, enlaces y CTA.
- Validación de JSON-LD sintáctico y comprobación de que las preguntas del
  schema coinciden con el HTML visible.
- Revisión de la matriz SEM: cada keyword pertenece a un grupo, lleva una
  landing de intención única, una UTM válida y una conversión definida.
- Tras desplegar: inspección de Search Console, prueba de conversiones con
  consentimiento y revisión de configuración de Ads antes de habilitar gasto.
