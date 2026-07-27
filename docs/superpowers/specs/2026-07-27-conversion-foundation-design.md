# DEVRUBY: base de confianza y conversión

## Objetivo

Convertir el sitio actual en una presencia comercial honesta y preparada para recibir reservas, sin presentar clientes, resultados, certificaciones, garantías o disponibilidad que DEVRUBY LLC aún no puede demostrar.

## Identidad y propuesta

- La marca pública pasa a ser **DEVRUBY**.
- La entidad legal se presenta como **DEVRUBY LLC** en el pie de página, contacto, política de privacidad y textos de contratación.
- La propuesta principal será desarrollo de aplicaciones web, APIs, sistemas internos e ingeniería de seguridad para empresas.
- DevOps, datos y diseño se describen como capacidades de entrega, no como ofertas de igual prioridad.

## Confianza y contenido

- Eliminar testimonios, calificaciones, logotipos de clientes, contadores de satisfacción, proyectos entregados, porcentajes de ahorro, soporte 24/7, garantías de devolución y resultados tipo que no estén respaldados.
- Mantener únicamente el portafolio que enlaza a productos públicos, describiéndolo como productos y proyectos desarrollados sin atribuir resultados no verificados.
- Sustituir las estadísticas por principios verificables: arquitectura clara, documentación, seguridad desde diseño y comunicación de alcance.
- Corregir el contador reutilizable para que, si vuelve a usarse, el valor final exista en el HTML inicial y la animación sea sólo una mejora visual.

## Conversión

- Crear una ruta `/agenda` como punto único para todos los CTAs principales.
- La página explicará una consulta inicial de 30 minutos y ofrecerá dos acciones: reservar con un proveedor de calendario configurado y abrir WhatsApp.
- La integración de calendario será configurable por variable `NEXT_PUBLIC_BOOKING_URL`; sin enlace configurado, la página mostrará el formulario de contacto como alternativa sin fingir disponibilidad.
- El número de WhatsApp existente se expondrá con mensaje inicial y los clics usarán atributos de analítica, sin enviar información personal al proveedor.
- El formulario se simplificará y, tras el envío, explicará claramente el siguiente paso en vez de prometer una respuesta en 24 horas.

## Analítica

- Los CTAs clave llevarán `data-track` y los enlaces externos `data-track-destination` para habilitar GA4/Plausible sin acoplar el sitio a un proveedor.
- Se registrarán reservas abiertas, conversaciones de WhatsApp y formularios enviados cuando se conecte el proveedor de analítica.

## SEO y metadatos

- Metadatos, datos estructurados y sitemap usarán DEVRUBY / DEVRUBY LLC y no incluirán reseñas agregadas ni afirmaciones sin respaldo.
- Se preservan las páginas existentes; la campaña específica de España será una fase posterior, con URLs públicas y contenido localizado, no redirecciones por IP.

## Errores y verificación

- Las URLs de calendario faltantes no impiden usar el formulario o WhatsApp.
- Los enlaces de WhatsApp deben incluir número internacional válido y abrirse de forma segura.
- Se verificará compilación de producción, HTML inicial de los contadores y recorrido local de CTA/formulario.
