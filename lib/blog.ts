import type { BlogCopy } from "@/components/sections/blog-views";

/**
 * Artículos del blog. Contenido propio, sin métricas inventadas ni testimonios.
 * Cada entrada enlaza a la página de servicio que responde a la misma intención
 * para que Google entienda la relación artículo → servicio.
 */

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
  ordered?: boolean;
};

export type BlogPost = {
  slug: string;
  title: string;
  /** <title> corto (≤ 50 car. + « | DEVRUBY»). Google corta hacia los 60; el H1 sigue siendo `title`. */
  seoTitle?: string;
  description: string;
  eyebrow: string;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  intro: string;
  sections: BlogSection[];
  takeaways: string[];
  related: { href: string; label: string }[];
};

export const blogCopy: BlogCopy = {
  basePath: "/blog",
  lang: "es",
  locale: "es-ES",
  ogLocale: "es_ES",
  crumbs: [{ name: "Inicio", url: "https://devruby.org" }],
  blogName: "Blog de DEVRUBY",
  indexTitle: "Blog: criterio técnico para operaciones que crecen",
  indexDescription:
    "Artículos prácticos sobre software a medida, integración de sistemas, automatización administrativa y seguridad de aplicaciones, del equipo de DEVRUBY.",
  heading: ["Criterio técnico para", "operaciones que crecen"],
  intro:
    "Lo que revisamos en las primeras conversaciones con empresas: cuándo construir, qué integrar primero, cómo automatizar con trazabilidad y cómo leer un informe de seguridad. Sin cifras inventadas ni promesas genéricas.",
  agendaHref: "/agenda",
  t: {
    read: "Leer artículo",
    back: "Volver al blog",
    author: "Equipo DEVRUBY",
    minRead: "min de lectura",
    summary: "En resumen",
    related: "Relacionado",
    more: "Más artículos",
    caseTitle: "¿Tienes un caso parecido?",
    caseText:
      "Cuéntanos el proceso, los sistemas que intervienen y el resultado que necesitas. Revisamos el caso en una consulta inicial de 30 minutos.",
    ctaTitle: "¿Quieres revisar tu caso con contexto?",
    ctaText:
      "Cuéntanos el proceso, los sistemas implicados y el resultado que necesitas. Prepararemos la conversación para aprovechar los 30 minutos.",
    cta: "Agenda una consulta",
  },
};

export const blogPosts: BlogPost[] = [
  {
    slug: "software-a-medida-o-ajustar-herramientas",
    title: "¿Software a medida o ajustar las herramientas que ya usas? Cómo decidirlo",
    seoTitle: "¿Software a medida o adaptar tus herramientas?",
    description:
      "Cinco preguntas para saber si tu empresa necesita desarrollar un sistema propio o si basta con configurar mejor el CRM, el ERP o las hojas de cálculo actuales.",
    eyebrow: "Software a medida",
    publishedAt: "2026-09-16",
    updatedAt: "2026-09-16",
    readingMinutes: 6,
    intro:
      "La mayoría de las empresas que nos consultan no necesitan un desarrollo desde cero. Necesitan saber dónde termina la configuración de lo que ya tienen y dónde empieza el trabajo a medida. Este artículo recoge las preguntas que usamos en la primera conversación para responder eso sin vender un proyecto antes de tiempo.",
    sections: [
      {
        heading: "Empieza por el proceso, no por la herramienta",
        paragraphs: [
          "Antes de comparar plataformas conviene escribir el proceso tal como ocurre hoy: quién inicia cada paso, qué dato produce, dónde lo guarda y quién lo necesita después. Suele bastar con una página. Si nadie puede escribirlo, el problema no es de software todavía.",
          "Con el proceso en papel aparecen dos tipos de fricción. La primera es de configuración: el CRM tiene el campo pero nadie lo rellena, o el ERP puede exportar el informe pero no está programado. La segunda es estructural: la herramienta no modela el paso porque ese paso es propio de tu empresa. Solo la segunda justifica desarrollo.",
        ],
      },
      {
        heading: "Cinco preguntas que separan configurar de construir",
        paragraphs: [
          "Las respuestas no dan un veredicto automático, pero tres o más síes en la lista suelen indicar que el trabajo a medida está justificado.",
        ],
        list: [
          "¿El paso que falla es una ventaja competitiva o es administración común? La facturación es común; la forma en que asignas técnicos a rutas puede no serlo.",
          "¿Alguien mantiene una hoja de cálculo paralela porque la herramienta principal no cubre el caso? Esa hoja es el sistema real y suele ser el primer candidato a reemplazo.",
          "¿El mismo dato se teclea en dos o más sitios? Si sí, revisa primero si una integración resuelve el problema sin construir nada nuevo.",
          "¿La herramienta actual tiene API o exportación fiable? Sin ella, cualquier solución quedará atada a copiar y pegar.",
          "¿Cuánto cuesta un error en ese paso? Cuando un dato mal cargado retrasa una entrega o una factura, la inversión se compara contra ese coste, no contra el precio de una licencia.",
        ],
      },
      {
        heading: "Qué se puede resolver sin desarrollar",
        paragraphs: [
          "Muchos problemas desaparecen con trabajo de configuración que no requiere código: campos obligatorios en el CRM, plantillas de importación en el ERP, automatizaciones nativas de la plataforma o un conector estándar entre dos herramientas SaaS.",
          "Nuestro criterio es proponer primero esa vía cuando existe. Un desarrollo a medida que replica una función que la herramienta ya tiene termina costando más en mantenimiento que en construcción.",
        ],
      },
      {
        heading: "Cuándo sí construir",
        paragraphs: [
          "El desarrollo a medida tiene sentido cuando el proceso es propio, cambia con la empresa y ninguna configuración lo modela sin forzar al equipo a trabajar alrededor de la herramienta. En ese caso el sistema debe nacer pequeño: un módulo que reemplace la hoja paralela, conectado a lo que ya funciona, y con una API para no repetir el problema dentro de dos años.",
          "En la consulta inicial revisamos el proceso escrito, los sistemas implicados y estas cinco preguntas. Si la conclusión es que basta con configurar, lo decimos y el proyecto no sigue. Esa es la forma más barata de acertar.",
        ],
      },
    ],
    takeaways: [
      "Escribe el proceso antes de evaluar herramientas.",
      "Distingue fricción de configuración de fricción estructural; solo la segunda justifica desarrollo.",
      "La hoja de cálculo paralela es el sistema real y el primer candidato a reemplazar.",
      "Construye pequeño, integrado con lo existente y con API desde el primer día.",
    ],
    related: [
      { href: "/espana/desarrollo-software-a-medida", label: "Desarrollo de software a medida para empresas en España" },
      { href: "/servicios/desarrollo-de-software", label: "Servicio de desarrollo de software" },
      { href: "/agenda", label: "Consulta inicial de 30 minutos" },
    ],
  },
  {
    slug: "detectar-datos-duplicados-crm-erp-hojas-de-calculo",
    title: "Datos duplicados entre CRM, ERP y hojas de cálculo: cómo detectarlos y qué hacer",
    seoTitle: "Datos duplicados en CRM y ERP: cómo detectarlos",
    description:
      "Un método práctico para encontrar el mismo dato repetido en varios sistemas, medir cuánto cuesta mantenerlo y decidir qué integración resolver primero.",
    eyebrow: "Integración de sistemas",
    publishedAt: "2026-09-16",
    updatedAt: "2026-09-16",
    readingMinutes: 7,
    intro:
      "Cuando una empresa opera con un CRM, un ERP y varias hojas de cálculo, el mismo cliente, producto o pedido acaba existiendo en tres versiones que nadie cuadra. El síntoma suele ser una reunión semanal para saber qué número es el bueno. Aquí explicamos cómo localizar esas duplicaciones y qué criterio usar para eliminarlas.",
    sections: [
      {
        heading: "Haz el inventario de entidades",
        paragraphs: [
          "Una entidad es cualquier cosa que tu empresa nombra y sigue: clientes, proveedores, productos, pedidos, facturas, empleados, incidencias. Para cada una anota en qué sistemas vive y cuál es la fuente que el equipo considera fiable.",
          "El inventario cabe en una tabla con cuatro columnas: entidad, sistema, quién la crea y quién la modifica. La duplicación aparece en cuanto una entidad tiene más de una fila con distintos responsables.",
        ],
      },
      {
        heading: "Tres señales de duplicación que se ven sin herramientas",
        paragraphs: [],
        list: [
          "Alguien exporta a Excel cada semana para «cruzar» dos sistemas. Ese cruce manual es la integración que falta.",
          "Un cliente aparece con dos nombres distintos según el sistema, por ejemplo con y sin forma jurídica, y hay una persona que sabe cuál es cuál.",
          "El mismo cambio, como una dirección o un precio, hay que hacerlo en dos pantallas y a veces se olvida la segunda.",
        ],
      },
      {
        heading: "Mide el coste antes de decidir",
        paragraphs: [
          "No hace falta un estudio: pregunta a las dos o tres personas que hacen el cruce cuánto tiempo dedican por semana y cuántas veces al mes un dato inconsistente provocó un error visible, como una factura devuelta o un envío a la dirección antigua. Esa cifra, aunque sea aproximada, es la que justifica o descarta el trabajo.",
          "Ordena las duplicaciones por ese coste y por el riesgo de error. Lo habitual es que una o dos entidades concentren casi todo el problema, y por ahí conviene empezar.",
        ],
      },
      {
        heading: "Elige una fuente de verdad por entidad",
        paragraphs: [
          "Cada entidad necesita un único sistema donde se crea y se modifica. Los demás la leen. Esa decisión es organizativa antes que técnica: el equipo comercial suele ser dueño del cliente en el CRM y administración es dueña de la factura en el ERP.",
          "Una vez fijada la fuente, la integración se reduce a copiar cambios en una dirección, con un identificador común y un registro de qué se sincronizó y cuándo. Las sincronizaciones bidireccionales sin dueño claro son la causa más frecuente de proyectos de integración que nunca terminan.",
        ],
      },
      {
        heading: "Qué integración hacer primero",
        paragraphs: [
          "Empieza por la entidad con más coste medido y con API disponible en ambos sistemas. Si una de las herramientas no tiene API, una exportación programada suele bastar para el primer paso, y evita atar la solución a copiar y pegar.",
          "En una consulta inicial revisamos el inventario, la fuente de verdad propuesta y las APIs disponibles. Con eso se puede acotar una primera integración que elimine el cruce semanal sin tocar el resto de la operación.",
        ],
      },
    ],
    takeaways: [
      "Inventaría entidades y sistemas; la duplicación se ve en la tabla.",
      "El cruce semanal en Excel es la integración que falta.",
      "Mide tiempo y errores visibles antes de priorizar.",
      "Una fuente de verdad por entidad y sincronización en una dirección.",
    ],
    related: [
      { href: "/espana/integracion-api-sistemas", label: "Integración de APIs y sistemas para empresas en España" },
      { href: "/us/api-integration-services", label: "API integration services (EE. UU.)" },
      { href: "/agenda", label: "Consulta inicial de 30 minutos" },
    ],
  },
  {
    slug: "automatizar-traspaso-gestoria-por-donde-empezar",
    title: "Automatizar el traspaso a la gestoría: por dónde empezar sin cambiar de ERP",
    seoTitle: "Automatización de facturas para la gestoría",
    description:
      "Qué partes del cierre mensual automatizar primero en una pyme española con asesoría externa, y qué documentar para que la automatización sea auditable.",
    eyebrow: "Automatización de procesos",
    publishedAt: "2026-09-16",
    updatedAt: "2026-09-16",
    readingMinutes: 6,
    intro:
      "En muchas pymes el cierre de mes consiste en reunir facturas emitidas y recibidas, extractos bancarios y remesas, cuadrarlos a mano y enviarlos a la gestoría por correo. Automatizar ese circuito no exige cambiar de ERP ni de asesoría. Exige elegir bien el primer paso.",
    sections: [
      {
        heading: "Dibuja el circuito real, no el ideal",
        paragraphs: [
          "Antes de automatizar, escribe cómo llega cada documento a la gestoría hoy: quién lo genera, en qué formato, por qué canal y quién lo revisa. Incluye los pasos vergonzosos, como reescribir el número de factura en una hoja o reenviar el PDF que faltaba. Esos pasos son los que la automatización debe eliminar.",
        ],
      },
      {
        heading: "Los tres bloques que más tiempo consumen",
        paragraphs: [
          "Sin conocer una empresa concreta, estos son los bloques que aparecen con más frecuencia en las conversaciones con administración:",
        ],
        list: [
          "Recopilar facturas recibidas de proveedores que llegan por correo, portal o papel, y ponerlas en un formato único.",
          "Conciliar el extracto bancario con las facturas emitidas y las remesas SEPA, marcando cobros, impagos y vencimientos.",
          "Preparar el envío periódico a la gestoría en el formato que ella usa, con numeración consistente y sin documentos duplicados.",
        ],
      },
      {
        heading: "Qué automatizar primero",
        paragraphs: [
          "Empieza por el bloque que hoy depende de una sola persona y que provoca reenvíos. Suele ser la conciliación o el envío a la asesoría. Son los pasos con reglas más claras, y por eso los más fáciles de automatizar con trazabilidad.",
          "Deja para después la captura de facturas recibidas: es el bloque con más variabilidad de formatos y el que más excepciones genera. Automatizarlo primero produce la sensación de que «la automatización falla» cuando en realidad falla la entrada de datos.",
        ],
      },
      {
        heading: "Trazabilidad: la parte que no se ve pero que importa",
        paragraphs: [
          "Toda automatización administrativa debe dejar registro de qué documento se emitió, cuándo se envió, a quién y quién lo aprobó. Ese registro es lo que responde cuando la asesoría, un cliente o una inspección piden explicaciones, y es lo primero que revisamos en cualquier diseño.",
          "Sobre normativa de facturación electrónica y sistemas de facturación verificable: preparamos el circuito para que cada documento se numere y conserve de forma consistente y exportable. El calendario y la homologación concretos dependen de la normativa vigente y del software que uses, así que ese alcance se define junto a tu asesoría. DEVRUBY no presta asesoramiento fiscal ni legal.",
        ],
      },
      {
        heading: "Qué se necesita para empezar",
        paragraphs: [
          "Acceso a exportaciones o API del ERP y del banco, el formato que la gestoría acepta y una persona de administración que valide los primeros cierres automatizados. Con eso, una primera fase puede limitarse a un bloque y medirse por horas ahorradas y reenvíos evitados.",
        ],
      },
    ],
    takeaways: [
      "Documenta el circuito real antes de automatizar.",
      "Primero conciliación o envío a la gestoría; la captura de facturas recibidas, después.",
      "Cada paso automatizado deja registro de qué, cuándo, a quién y quién aprobó.",
      "No hace falta cambiar de ERP ni de asesoría para empezar.",
    ],
    related: [
      { href: "/espana/automatizacion-de-procesos", label: "Automatización de procesos para empresas en España" },
      { href: "/servicios/automatizacion-de-procesos", label: "Servicio de automatización de procesos" },
      { href: "/agenda", label: "Consulta inicial de 30 minutos" },
    ],
  },
  {
    slug: "priorizar-hallazgos-auditoria-seguridad-aplicaciones",
    title: "Cómo priorizar los hallazgos de una auditoría de seguridad de aplicaciones",
    seoTitle: "Priorizar hallazgos de una auditoría de seguridad",
    description:
      "Criterios para ordenar los hallazgos de una auditoría de seguridad por impacto real en tu aplicación, no solo por severidad, y saber qué arreglar primero.",
    eyebrow: "Seguridad de aplicaciones",
    publishedAt: "2026-09-16",
    updatedAt: "2026-09-16",
    readingMinutes: 7,
    intro:
      "El resultado típico de una auditoría o de un escáner automático es una lista larga con etiquetas de severidad. Esa lista describe la vulnerabilidad en abstracto, no lo que significa en tu aplicación. Priorizar bien es el trabajo que convierte el informe en un plan.",
    sections: [
      {
        heading: "Severidad genérica frente a impacto en tu contexto",
        paragraphs: [
          "Un hallazgo marcado como «alto» por una herramienta puede ser irrelevante si el componente afectado no está expuesto, y uno «medio» puede ser urgente si permite leer datos de clientes desde una pantalla pública. La severidad genérica es un punto de partida, no una prioridad.",
          "Para cada hallazgo conviene responder tres preguntas: qué datos o funciones alcanza, desde dónde se puede explotar y qué haría falta para lograrlo. Con esas respuestas el orden del informe suele cambiar bastante.",
        ],
      },
      {
        heading: "Cuatro criterios para ordenar",
        paragraphs: [],
        ordered: true,
        list: [
          "Exposición: si el punto vulnerable es accesible sin autenticación desde Internet, sube al principio de la lista.",
          "Datos alcanzados: acceso a datos personales, credenciales o información financiera pesa más que un fallo en un módulo interno sin datos sensibles.",
          "Esfuerzo de explotación: una vulnerabilidad que se explota con una petición HTTP es más urgente que una que exige acceso previo a la red interna.",
          "Coste de corrección: entre dos hallazgos de riesgo parecido, corrige primero el que se arregla en horas. Reduce riesgo real más rápido que discutir el difícil.",
        ],
      },
      {
        heading: "Agrupa por causa raíz, no por síntoma",
        paragraphs: [
          "Los escáneres reportan cada aparición de un problema como un hallazgo distinto. Diez avisos de falta de validación de entrada en diez formularios suelen tener una única corrección: una capa de validación común. Agrupar por causa raíz reduce la lista y evita arreglar el mismo problema diez veces.",
        ],
      },
      {
        heading: "Qué debe incluir el plan de corrección",
        paragraphs: [
          "Para cada grupo, el plan indica el responsable, el cambio concreto, cómo se verificará que quedó corregido y una fecha. La verificación es la parte que más se omite: sin una prueba posterior, un hallazgo cerrado en el gestor de tareas puede seguir abierto en producción.",
          "Recomendamos una segunda revisión limitada a los hallazgos corregidos. Es más barata que la auditoría inicial y es la única forma de afirmar con evidencia que el riesgo bajó.",
        ],
      },
      {
        heading: "Cuándo pedir una revisión externa",
        paragraphs: [
          "Un escáner automático detecta patrones conocidos. No entiende la lógica de negocio: por ejemplo, que un usuario pueda ver facturas de otro cliente cambiando un número en la URL. Ese tipo de fallo requiere una revisión manual de la aplicación y de sus APIs, y es el que más daño causa cuando se descubre tarde.",
          "Nuestras auditorías entregan los hallazgos ya priorizados con estos criterios y agrupados por causa raíz, para que el equipo empiece por lo que reduce más riesgo en menos tiempo.",
        ],
      },
    ],
    takeaways: [
      "La severidad del escáner es un punto de partida, no la prioridad.",
      "Ordena por exposición, datos alcanzados, esfuerzo de explotación y coste de corrección.",
      "Agrupa hallazgos por causa raíz para reducir la lista.",
      "Verifica en producción cada corrección; un ticket cerrado no es un riesgo cerrado.",
    ],
    related: [
      { href: "/espana/auditoria-seguridad-aplicaciones", label: "Auditoría de seguridad de aplicaciones para empresas en España" },
      { href: "/us/application-security-audit", label: "Application security audit (EE. UU.)" },
      { href: "/servicios/seguridad-tecnica", label: "Servicio de seguridad técnica" },
    ],
  },
  {
    slug: "automatizacion-de-procesos-con-ia",
    title: "Automatización de procesos con IA: qué automatizar primero y qué dejar en manos de personas",
    seoTitle: "Automatización de procesos con IA: qué priorizar",
    description:
      "Cómo elegir qué procesos de tu empresa automatizar con IA, cuándo bastan reglas fijas y cómo mantener la revisión humana donde un error cuesta caro.",
    eyebrow: "Automatización con IA",
    publishedAt: "2026-10-03",
    updatedAt: "2026-10-03",
    readingMinutes: 7,
    intro:
      "La inteligencia artificial ha vuelto a poner la automatización de procesos en la agenda de muchas empresas. El riesgo es empezar por la herramienta y no por el proceso: un piloto vistoso que nadie usa a la semana siguiente. Este artículo resume cómo decidimos dónde encaja un modelo de lenguaje, dónde basta una regla fija y qué controles necesita cualquier automatización con IA para llegar a producción.",
    sections: [
      {
        heading: "Primero las reglas, después la IA",
        paragraphs: [
          "Buena parte del trabajo repetitivo de una empresa no necesita IA. Si el dato llega siempre en el mismo formato —un formulario, una exportación del ERP, una API— una integración con reglas fijas es más barata, más rápida y más fácil de auditar. Usar un modelo de lenguaje ahí solo añade coste y una fuente de error.",
          "La IA aporta cuando la información es predecible pero el formato no lo es: facturas de cien proveedores distintos, correos de clientes redactados cada uno a su manera, contratos o albaranes escaneados. Ahí una persona lee y teclea porque ninguna regla cubre todas las variantes, y ese es el trabajo que un modelo puede preparar.",
        ],
      },
      {
        heading: "Cuatro tareas donde la IA suele funcionar bien",
        paragraphs: [
          "Estas son las tareas en las que un modelo de lenguaje aporta valor con un riesgo controlable, siempre que el resultado se valide antes de entrar en el sistema de destino.",
        ],
        list: [
          "Extracción de datos de documentos: importes, fechas, NIF y líneas de factura a partir de PDF o imágenes.",
          "Clasificación y enrutado: decidir a qué equipo va cada correo o solicitud y con qué prioridad.",
          "Resumen de textos largos: incidencias, actas o historiales de cliente reducidos a lo que necesita quien decide.",
          "Borradores de respuesta: el modelo prepara el texto y una persona lo revisa y lo envía.",
        ],
      },
      {
        heading: "Qué debe quedar en manos de personas",
        paragraphs: [
          "Aprobar pagos, cambiar condiciones a un cliente o enviar comunicaciones con efectos legales no debería depender de un modelo sin supervisión. La pregunta útil no es si la IA puede hacerlo, sino cuánto cuesta un error y quién lo detectaría.",
          "El diseño que mejor funciona en estos casos es que la IA prepare el trabajo y una persona lo confirme. El ahorro sigue siendo grande —nadie teclea ni busca—, pero la decisión y la responsabilidad no cambian de manos.",
        ],
      },
      {
        heading: "Cómo pasar del piloto a producción",
        paragraphs: [
          "Un piloto que acierta con cinco ejemplos elegidos a mano no dice nada sobre el mes siguiente. Antes de automatizar conviene reunir un conjunto de casos reales, incluidos los raros, y medir cuántos resuelve bien el modelo. Ese mismo conjunto sirve después para comprobar que un cambio de modelo o de instrucciones no empeora los resultados.",
          "En producción, cada resultado debe llevar una señal de confianza y un registro: qué entró, qué devolvió el modelo y quién lo validó. Los casos dudosos van a una cola de revisión en lugar de entrar directamente en el ERP o el CRM. Y antes de enviar datos a un proveedor de IA hay que acordar qué información sale de la empresa, con qué condiciones y si algún campo debe enmascararse.",
        ],
        list: [
          "Elige un proceso con volumen suficiente y un coste de error conocido.",
          "Reúne ejemplos reales y mide la precisión antes de prometer nada.",
          "Conecta la IA a las herramientas actuales por API, sin cambiar de ERP o CRM.",
          "Deja una cola de revisión humana y un registro de cada decisión.",
        ],
        ordered: true,
      },
    ],
    takeaways: [
      "Si el formato del dato es fijo, una integración con reglas es mejor que la IA.",
      "La IA aporta en documentos, correos y textos libres que hoy alguien lee y teclea.",
      "Pagos, condiciones y comunicaciones sensibles se quedan con revisión humana.",
      "Sin un conjunto de casos reales para medir, un piloto no es una prueba.",
    ],
    related: [
      { href: "/servicios/ia-aplicada", label: "Automatización con IA para empresas" },
      { href: "/servicios/automatizacion-de-procesos", label: "Automatización de procesos empresariales" },
      { href: "/espana/automatizacion-de-procesos", label: "Automatización de procesos para empresas en España" },
      { href: "/agenda", label: "Consulta inicial de 30 minutos" },
    ],
  },
  {
    slug: "make-vs-n8n-vs-zapier",
    title: "Make vs n8n vs Zapier: cuál elegir para automatizar tu empresa y cuándo programar a medida",
    seoTitle: "Make vs n8n vs Zapier: cuál elegir",
    description:
      "Diferencias reales entre Make, n8n y Zapier: cómo cobra cada uno, dónde quedan tus datos y en qué punto conviene pasar a una integración a medida.",
    eyebrow: "Automatización",
    publishedAt: "2026-10-03",
    updatedAt: "2026-10-03",
    readingMinutes: 7,
    intro:
      "Make, n8n y Zapier resuelven el mismo problema: conectar aplicaciones para que los datos pasen de una a otra sin que nadie los copie. Las comparativas suelen quedarse en la lista de integraciones, pero en una empresa la elección depende de otras tres cosas: cómo crece la factura con el volumen, dónde se procesan los datos y quién va a mantener los flujos cuando fallen. Este artículo repasa esas diferencias y explica cuándo ninguna de las tres es la herramienta adecuada.",
    sections: [
      {
        heading: "Qué tienen en común",
        paragraphs: [
          "Las tres funcionan con el mismo modelo: un disparador (llega un correo, se crea un contacto, cambia una fila) y una serie de pasos que leen, transforman y escriben datos en otras aplicaciones. Todas tienen conectores para las herramientas habituales —CRM, hojas de cálculo, correo, facturación— y un paso genérico de llamada HTTP para lo que no tiene conector.",
          "Para un flujo sencillo entre dos SaaS conocidos, cualquiera de las tres lo resuelve en una tarde. Las diferencias aparecen cuando el flujo crece, se ejecuta miles de veces al mes o maneja datos sensibles.",
        ],
      },
      {
        heading: "Cómo cobra cada una (y por qué importa más que el precio)",
        paragraphs: [
          "No compares solo la cuota de entrada: compara la unidad que se factura, porque determina cuánto cuesta el mismo flujo cuando el volumen sube. Los precios cambian a menudo, así que consulta siempre la tabla vigente de cada proveedor.",
        ],
        list: [
          "Zapier cobra por tarea: cada acción que se completa con éxito cuenta. Un flujo de cinco pasos que se ejecuta mil veces consume miles de tareas.",
          "Make cobra por operación: cada módulo que se ejecuta cuenta, incluidos los de filtrado y transformación. Suele salir más barato que Zapier a igual volumen, pero los escenarios con muchos módulos lo encarecen.",
          "n8n cobra por ejecución en su versión en la nube: un flujo completo cuenta una vez, tenga los pasos que tenga. Además puede instalarse en un servidor propio, y entonces el coste es el de ese servidor y su mantenimiento.",
        ],
      },
      {
        heading: "Dónde quedan tus datos",
        paragraphs: [
          "Con Zapier y Make, los datos que atraviesan el flujo se procesan en la infraestructura del proveedor. Para una empresa en España eso significa revisar su contrato de encargado del tratamiento, la región donde se alojan los datos y las transferencias internacionales, igual que con cualquier otro SaaS que trate datos personales de clientes o empleados.",
          "n8n autoalojado cambia ese equilibrio: los datos se quedan en tu servidor, pero la seguridad, las copias de seguridad y las actualizaciones pasan a ser responsabilidad tuya. Su licencia permite el uso interno en la empresa; si piensas revenderlo como servicio a terceros, revisa sus condiciones antes.",
        ],
      },
      {
        heading: "Cuál elegir según el caso",
        paragraphs: [
          "Sin conocer el proceso no hay respuesta universal, pero estos criterios cubren la mayoría de los casos que vemos.",
        ],
        list: [
          "Zapier: equipos no técnicos, pocos flujos y volumen bajo, cuando la prioridad es montarlo sin ayuda y la factura no preocupa.",
          "Make: flujos con más lógica (ramas, iteraciones, transformaciones) y volumen medio, con alguien en el equipo cómodo con una herramienta visual más compleja.",
          "n8n: volumen alto, datos que no deben salir de tu infraestructura o necesidad de código propio dentro de los pasos, siempre que haya alguien técnico para mantener el servidor.",
        ],
      },
      {
        heading: "Cuándo ninguna de las tres es la respuesta",
        paragraphs: [
          "Las plataformas de automatización son excelentes para conectar herramientas. Empiezan a sufrir cuando el flujo se convierte en una pieza central del negocio: reglas que cambian con cada cliente, validaciones que deben probarse antes de cada cambio, errores que no pueden perderse en un historial de ejecuciones o volúmenes en los que la factura mensual supera lo que costaría mantener código propio.",
          "Ese es el punto en el que tiene sentido una integración a medida: un servicio pequeño, versionado y con pruebas, que hace exactamente lo que el proceso necesita y registra cada error donde alguien lo va a ver. No hace falta migrar todo de golpe; lo habitual es sacar de la plataforma solo el flujo crítico y dejar el resto donde funciona bien.",
        ],
      },
    ],
    takeaways: [
      "Compara la unidad de cobro (tarea, operación o ejecución), no solo la cuota de entrada.",
      "Con datos personales, revisa dónde se procesan y el contrato de encargo del proveedor.",
      "n8n autoalojado da control sobre los datos a cambio de mantener tú el servidor.",
      "Cuando un flujo se vuelve crítico, una integración a medida suele ser más barata y fiable.",
    ],
    related: [
      { href: "/servicios/automatizacion-de-procesos", label: "Automatización de procesos empresariales" },
      { href: "/espana/integracion-api-sistemas", label: "Integración de APIs y sistemas en España" },
      { href: "/agenda", label: "Consulta inicial de 30 minutos" },
    ],
  },
  {
    slug: "chatbot-ia-whatsapp-empresas",
    title: "Chatbot con IA en WhatsApp para empresas: qué puede hacer, qué no y qué exige Meta",
    seoTitle: "Chatbot con IA en WhatsApp para empresas",
    description:
      "Qué necesita una empresa para poner un chatbot con IA en WhatsApp: la API oficial, las plantillas, la ventana de 24 horas y las normas de Meta desde 2026.",
    eyebrow: "IA aplicada",
    publishedAt: "2026-10-03",
    updatedAt: "2026-10-03",
    readingMinutes: 7,
    intro:
      "WhatsApp es el canal por el que muchos clientes prefieren escribir, y un asistente con IA puede responder a cualquier hora las preguntas que hoy ocupan al equipo. Pero WhatsApp no es un canal abierto: Meta fija qué tipo de bots están permitidos, cuándo puede escribir la empresa y cuánto cuesta cada conversación. Antes de elegir proveedor conviene conocer esas reglas, porque condicionan el diseño del bot más que el modelo de IA que haya detrás.",
    sections: [
      {
        heading: "La aplicación de WhatsApp Business no basta",
        paragraphs: [
          "La aplicación gratuita de WhatsApp Business sirve para atender desde un móvil, con respuestas rápidas y mensajes de ausencia. Para conectar un chatbot, un CRM o varios agentes a la vez hace falta la plataforma para empresas de WhatsApp (la API oficial), a la que se accede directamente a través de Meta o mediante un proveedor autorizado.",
          "Con la API, el número queda gestionado por software: los mensajes entran en tu sistema, el bot responde y, cuando hace falta, la conversación pasa a una persona. Es la base de cualquier chatbot serio en WhatsApp.",
        ],
      },
      {
        heading: "Las reglas que condicionan el diseño",
        paragraphs: [
          "Tres normas de la plataforma afectan directamente a lo que el bot puede hacer.",
        ],
        list: [
          "Ventana de 24 horas: después del último mensaje del cliente, la empresa puede responder libremente durante 24 horas. Fuera de esa ventana solo puede escribir con plantillas aprobadas previamente por Meta.",
          "Plantillas y coste: los mensajes que inicia la empresa (recordatorios, avisos, promociones) usan plantillas que Meta clasifica por categoría y cobra según la categoría y el país del destinatario. Consulta la tabla de precios vigente antes de calcular el coste.",
          "Consentimiento: el cliente debe haber aceptado recibir mensajes de la empresa por WhatsApp. Sin ese consentimiento, además del problema legal, el número se arriesga a bloqueos.",
        ],
      },
      {
        heading: "Qué tipo de bot permite Meta desde 2026",
        paragraphs: [
          "Desde el 15 de enero de 2026, los términos de la plataforma no permiten asistentes de IA de propósito general, es decir, bots cuyo producto es conversar sobre cualquier tema, como un ChatGPT dentro de WhatsApp. Lo que sí está permitido es lo que la plataforma siempre ha buscado: bots al servicio de un negocio concreto.",
          "En la práctica, un chatbot de empresa debe ceñirse a su función: atención al cliente, reservas y citas, estado de pedidos, preguntas sobre productos o servicios, cualificación de contactos comerciales. La IA puede entender preguntas escritas de cualquier forma y redactar respuestas naturales, siempre que el bot no se convierta en un asistente genérico.",
        ],
      },
      {
        heading: "Qué debe hacer bien un chatbot con IA",
        paragraphs: [
          "La diferencia entre un bot útil y uno que frustra a los clientes no está en el modelo, sino en los límites que se le ponen.",
        ],
        list: [
          "Responder solo con información de la empresa (catálogo, horarios, condiciones, estado del pedido) y decir que no sabe cuando la pregunta se sale de ahí.",
          "Pasar la conversación a una persona de forma visible, con el historial, cuando el cliente lo pide o el caso lo requiere.",
          "No prometer lo que solo puede decidir una persona: devoluciones fuera de política, descuentos o plazos.",
          "Registrar cada conversación para revisar errores y mejorar las respuestas con casos reales.",
          "Tratar los datos personales con la misma base legal e información al cliente que el resto de canales.",
        ],
      },
      {
        heading: "Por dónde empezar",
        paragraphs: [
          "Revisa las conversaciones de un mes: casi siempre un puñado de preguntas concentra la mayor parte del volumen. Ese es el primer alcance del bot. Conecta solo las fuentes que necesita para responderlas —catálogo, agenda, sistema de pedidos— y define desde el principio cuándo deriva a una persona.",
          "Es el enfoque con el que construimos RubyQ, nuestra plataforma de bots de IA para WhatsApp y otros canales: flujos con IA acotados al negocio y derivación a agentes humanos en el mismo panel. Si tu caso necesita integrarse con sistemas propios, lo revisamos en una consulta inicial.",
        ],
      },
    ],
    takeaways: [
      "Para un chatbot en WhatsApp hace falta la API oficial, no la aplicación Business.",
      "Fuera de la ventana de 24 horas solo se escribe con plantillas aprobadas y de pago.",
      "Desde enero de 2026 Meta solo permite bots al servicio de un negocio, no asistentes generales.",
      "Un buen bot conoce sus límites y deriva a una persona con el historial.",
    ],
    related: [
      { href: "/servicios/ia-aplicada", label: "Automatización con IA para empresas" },
      { href: "/servicios/automatizacion-de-procesos", label: "Automatización de procesos empresariales" },
      { href: "/agenda", label: "Consulta inicial de 30 minutos" },
    ],
  },
  {
    slug: "automatizar-facturas-con-ia",
    title: "Cómo automatizar facturas con IA: de la bandeja de entrada al ERP con revisión humana",
    seoTitle: "Cómo automatizar facturas con IA",
    description:
      "Cómo extraer con IA los datos de las facturas de proveedores, validarlos antes de que lleguen al ERP y dejar en manos de una persona solo los casos dudosos.",
    eyebrow: "Automatización con IA",
    publishedAt: "2026-10-03",
    updatedAt: "2026-10-03",
    readingMinutes: 7,
    intro:
      "Registrar facturas de proveedores es uno de los trabajos administrativos más repetitivos de una pyme: abrir el correo, descargar el PDF, leer el NIF, la fecha, la base, el IVA y el total, y teclearlo en el ERP o en la hoja que se envía a la gestoría. Es también uno de los casos en los que la IA funciona bien, porque los datos son siempre los mismos aunque cada proveedor los presente a su manera. Este artículo describe un flujo realista, con las validaciones que evitan que un error llegue a la contabilidad.",
    sections: [
      {
        heading: "Primero, separa lo que no necesita IA",
        paragraphs: [
          "Si un proveedor ya envía factura electrónica estructurada (por ejemplo, en formato Facturae o en un XML de su ERP), los datos se leen directamente del fichero, sin interpretar nada. Lo mismo ocurre con plataformas que ofrecen exportación o API. Esos casos se integran con reglas fijas y son más fiables que cualquier modelo.",
          "La IA aporta en el resto: PDF generados por programas distintos, facturas escaneadas o fotografiadas, tiques y documentos con formatos que cambian. Ahí es donde hoy una persona lee y teclea.",
        ],
      },
      {
        heading: "El flujo, paso a paso",
        paragraphs: [
          "Un flujo de facturas con IA que funciona en producción suele tener estas etapas.",
        ],
        list: [
          "Captura: un buzón dedicado (facturas@) o una carpeta compartida donde llegan todos los documentos.",
          "Extracción: el modelo lee el documento y devuelve los campos en un formato fijo: emisor, NIF, número, fecha, base imponible por tipo de IVA, cuotas, retenciones, total y, si hace falta, las líneas.",
          "Validación automática: reglas que comprueban lo que la IA no debe dar por bueno (ver la siguiente sección).",
          "Revisión: los documentos que pasan todas las validaciones siguen adelante; los demás van a una cola donde una persona corrige el dato marcado, no la factura entera.",
          "Registro: los datos validados se envían al ERP por su API o se exportan en el formato que usa la gestoría, con el PDF original enlazado.",
        ],
        ordered: true,
      },
      {
        heading: "Las validaciones que evitan errores",
        paragraphs: [
          "La extracción con IA acierta en la mayoría de los documentos, pero no en todos, y un importe mal leído en contabilidad cuesta más que el tiempo ahorrado. Por eso las comprobaciones no dependen del modelo: son reglas.",
        ],
        list: [
          "La suma de bases y cuotas coincide con el total, y los tipos de IVA son válidos.",
          "El NIF tiene un formato correcto y corresponde a un proveedor dado de alta.",
          "El número de factura no se ha registrado antes para ese proveedor (evita duplicados por reenvíos).",
          "La fecha es coherente con el periodo contable abierto.",
          "Si existe pedido o albarán, el importe cuadra dentro de una tolerancia acordada.",
        ],
      },
      {
        heading: "Qué pasa con Verifactu",
        paragraphs: [
          "Verifactu regula los sistemas con los que las empresas emiten sus propias facturas, no la recepción de las de proveedores. Tras el aplazamiento del Real Decreto-ley 15/2025, será obligatorio desde el 1 de enero de 2027 para los contribuyentes del Impuesto sobre Sociedades y desde el 1 de julio de 2027 para el resto de obligados.",
          "Automatizar la entrada de facturas recibidas no choca con Verifactu. Si además quieres automatizar la emisión, el software que genere tus facturas debe cumplir sus requisitos; conviene confirmarlo con tu proveedor de facturación o tu asesoría.",
        ],
      },
      {
        heading: "Cómo empezar sin cambiar de ERP",
        paragraphs: [
          "Elige un mes de facturas reales y úsalo como banco de pruebas: mide cuántas extrae bien el sistema y cuántas acaban en revisión antes de conectarlo a la contabilidad. Empieza con los proveedores de más volumen y deja la integración con el ERP para cuando las validaciones estén afinadas.",
          "El resultado esperable no es eliminar a la persona que registra facturas, sino que deje de teclear y dedique su tiempo a resolver las excepciones, que es donde realmente aporta.",
        ],
      },
    ],
    takeaways: [
      "Las facturas estructuradas se integran con reglas; la IA es para PDF, escaneos y formatos variables.",
      "Las validaciones (sumas, NIF, duplicados, periodo) son reglas fijas, no confianza en el modelo.",
      "Los casos dudosos van a una cola de revisión donde se corrige solo el dato marcado.",
      "Verifactu afecta a la emisión de facturas, obligatoria desde 2027 según el tipo de contribuyente.",
    ],
    related: [
      { href: "/servicios/ia-aplicada", label: "Automatización con IA para empresas" },
      { href: "/espana/automatizacion-de-procesos", label: "Automatización de procesos para empresas en España" },
      { href: "/agenda", label: "Consulta inicial de 30 minutos" },
    ],
  },
  {
    slug: "automatizar-conciliacion-bancaria",
    title: "Automatizar la conciliación bancaria en una pyme: del extracto al asiento sin copiar y pegar",
    seoTitle: "Automatizar la conciliación bancaria en una pyme",
    description:
      "Cómo automatizar la conciliación bancaria: qué datos del banco usar, las reglas que cruzan cobros y pagos con facturas y qué hacer con lo que no cuadra.",
    eyebrow: "Automatización",
    publishedAt: "2026-10-03",
    updatedAt: "2026-10-03",
    readingMinutes: 6,
    intro:
      "Conciliar es comprobar que cada movimiento del banco corresponde a algo registrado en la contabilidad: un cobro a una factura emitida, un pago a una factura de proveedor, una comisión a su gasto. En muchas pymes se hace a mano con el extracto en una pantalla y el ERP en otra, y se acumula hasta el cierre del mes. Automatizarla no exige cambiar de banco ni de ERP; exige ordenar de dónde salen los datos y escribir bien las reglas de cruce.",
    sections: [
      {
        heading: "Revisa primero lo que ya tienes",
        paragraphs: [
          "Muchos ERP y programas de contabilidad incluyen un módulo de conciliación que importa extractos y propone cruces. Antes de construir nada, comprueba si está activado y por qué no se usa: a veces el problema es que las facturas no llevan una referencia que el banco pueda devolver, no la falta de una herramienta.",
        ],
      },
      {
        heading: "De dónde salen los datos del banco",
        paragraphs: [
          "Hay tres vías habituales, de menos a más automática.",
        ],
        list: [
          "Exportación manual en Excel o CSV desde la banca online: sirve para empezar, pero depende de que alguien la descargue.",
          "Fichero de movimientos en Norma 43 (cuaderno 43 de la AEB), que la mayoría de bancos españoles ofrece y que los programas contables saben leer: el formato es estable y fiable.",
          "Conexión automática a través de un proveedor de agregación bancaria autorizado bajo PSD2, que descarga los movimientos cada día sin intervención.",
        ],
      },
      {
        heading: "Las reglas de cruce",
        paragraphs: [
          "El corazón de la automatización son las reglas que deciden qué movimiento corresponde a qué apunte. Conviene aplicarlas en orden, de la más segura a la más flexible, y dejar sin conciliar lo que ninguna resuelve con certeza.",
        ],
        list: [
          "Coincidencia exacta: mismo importe y una referencia reconocible (número de factura, de remesa o de cliente) en el concepto.",
          "Importe y contraparte: mismo importe, mismo cliente o proveedor (por IBAN o nombre) y fecha dentro de un margen de días.",
          "Uno a varios: una transferencia que paga varias facturas del mismo cliente y cuyo total coincide con la suma.",
          "Movimientos recurrentes: comisiones, cuotas, nóminas o impuestos que se asignan por patrón de concepto a su cuenta contable.",
        ],
        ordered: true,
      },
      {
        heading: "Lo que no cuadra",
        paragraphs: [
          "Siempre quedarán movimientos sin cruzar: pagos parciales, transferencias sin referencia, importes con diferencias por comisiones. Lo importante es que no se pierdan: deben ir a una lista de pendientes con el motivo por el que no se conciliaron, para que una persona los resuelva en minutos en lugar de revisar el extracto entero.",
          "Aquí la IA puede ayudar sin decidir: sugerir el cliente probable a partir de un concepto mal escrito o proponer la cuenta contable de un gasto nuevo. La confirmación sigue siendo de una persona, y cada decisión queda registrada para la revisión de la gestoría.",
        ],
      },
      {
        heading: "Un detalle que multiplica el resultado",
        paragraphs: [
          "La mejor regla de cruce es la que no hace falta escribir: si las facturas emitidas piden que la transferencia incluya su número o una referencia de cliente, la mayoría de los cobros se concilian por coincidencia exacta. Es un cambio en la plantilla de factura que no cuesta nada y que suele ser el primer paso del proyecto.",
        ],
      },
    ],
    takeaways: [
      "Comprueba antes si el módulo de conciliación de tu ERP resuelve el caso.",
      "Norma 43 o una conexión PSD2 dan datos bancarios estables sin descargas manuales.",
      "Aplica las reglas de cruce de la más segura a la más flexible.",
      "Lo que no cuadra va a una lista de pendientes con su motivo, no se pierde.",
    ],
    related: [
      { href: "/servicios/automatizacion-de-procesos", label: "Automatización de procesos empresariales" },
      { href: "/espana/automatizacion-de-procesos", label: "Automatización de procesos para empresas en España" },
      { href: "/agenda", label: "Consulta inicial de 30 minutos" },
    ],
  },
  {
    slug: "whatsapp-business-api-como-funciona",
    title: "WhatsApp Business API: cómo funciona, qué cuesta y cuándo la necesita tu empresa",
    seoTitle: "WhatsApp Business API: cómo funciona",
    description:
      "Qué es la API de WhatsApp Business, en qué se diferencia de la app, cómo cobra Meta por mensaje y qué hace falta para conectarla con tu CRM o un chatbot.",
    eyebrow: "Integraciones",
    publishedAt: "2026-10-04",
    updatedAt: "2026-10-04",
    readingMinutes: 7,
    intro:
      "Muchas empresas atienden por WhatsApp desde un móvil compartido hasta que el volumen lo hace imposible: mensajes que nadie contesta, conversaciones que solo ve una persona y ningún registro en el CRM. La API de WhatsApp Business resuelve eso, pero funciona con reglas distintas a las de la aplicación. Este artículo explica cómo funciona, cómo cobra Meta y qué conviene decidir antes de conectarla.",
    sections: [
      {
        heading: "App Business frente a API: dos productos distintos",
        paragraphs: [
          "La aplicación WhatsApp Business es gratuita y está pensada para atender desde uno o pocos dispositivos: catálogo, respuestas rápidas y mensajes de ausencia. La API, que Meta llama plataforma para empresas de WhatsApp, no tiene interfaz propia: es un servicio al que se conecta software. Los mensajes llegan a tu sistema, que puede ser un CRM, una bandeja compartida para varios agentes o un chatbot.",
          "Desde finales de 2025 la vía oficial es la Cloud API, alojada por Meta; la versión que las empresas instalaban en sus propios servidores dejó de estar disponible. Se accede directamente desde Meta o a través de un proveedor autorizado, que añade herramientas como bandejas de entrada o plantillas gestionadas.",
        ],
      },
      {
        heading: "La ventana de 24 horas y las plantillas",
        paragraphs: [
          "Cuando un cliente escribe, se abre una ventana de 24 horas en la que la empresa puede responder con mensajes libres, tantos como necesite. Fuera de esa ventana, la empresa solo puede iniciar la conversación con plantillas aprobadas previamente por Meta.",
          "Las plantillas se clasifican en categorías que determinan su uso y su coste: marketing (promociones y avisos comerciales), utilidad (confirmaciones de pedido, recordatorios de cita, avisos de envío) y autenticación (códigos de un solo uso). Meta revisa cada plantilla y puede reclasificarla si el contenido no corresponde a la categoría declarada.",
        ],
      },
      {
        heading: "Cómo cobra Meta",
        paragraphs: [
          "Meta factura por mensaje de plantilla entregado, con precios que dependen de la categoría y del país del destinatario. Las respuestas que la empresa envía dentro de la ventana de 24 horas abierta por el cliente no tienen coste de Meta, y las plantillas de utilidad enviadas dentro de esa ventana tampoco.",
          "En la práctica, un uso centrado en atención al cliente cuesta muy poco en tarifas de Meta, mientras que las campañas de marketing por WhatsApp se pagan mensaje a mensaje. Los precios cambian a menudo: consulta la tabla vigente de Meta antes de presupuestar y suma el coste del proveedor o del desarrollo propio, que suele pesar más que las tarifas.",
        ],
      },
      {
        heading: "Qué hay que preparar antes de conectarla",
        paragraphs: [
          "La parte técnica es la más sencilla. Lo que más retrasa un proyecto suele ser lo administrativo.",
        ],
        list: [
          "Una cuenta de Meta Business verificada a nombre de la empresa.",
          "Un número de teléfono que no esté en uso en la app de WhatsApp, o la decisión de migrar el actual.",
          "Consentimiento de los clientes para recibir mensajes por WhatsApp, registrado en tu sistema.",
          "Las plantillas que vas a usar, redactadas y aprobadas antes del lanzamiento.",
          "Quién responde y en qué horario, y cuándo un bot deriva la conversación a una persona.",
        ],
      },
      {
        heading: "Integrarla con tu operación",
        paragraphs: [
          "El valor de la API aparece cuando se conecta con el resto de sistemas: cada conversación queda asociada a su cliente en el CRM, los pedidos disparan avisos automáticos de estado y las preguntas frecuentes las resuelve un asistente que deriva a una persona cuando hace falta. Desde enero de 2026 Meta solo admite en la plataforma bots al servicio de un negocio concreto, no asistentes de IA de propósito general.",
          "Si tu equipo ya usa un CRM con integración oficial de WhatsApp, empieza por ahí. Cuando el flujo depende de sistemas propios o de reglas específicas, una integración a medida conecta la API con lo que ya tienes sin obligarte a cambiar de herramientas.",
        ],
      },
    ],
    takeaways: [
      "La app Business sirve para un móvil; la API conecta WhatsApp con tu software.",
      "Dentro de la ventana de 24 horas se responde libremente; fuera, solo con plantillas aprobadas.",
      "Meta cobra por plantilla entregada según categoría y país; la atención al cliente cuesta poco.",
      "Lo que más retrasa el proyecto es la verificación, el número y las plantillas, no el código.",
    ],
    related: [
      { href: "/espana/integracion-api-sistemas", label: "Integración de APIs y sistemas en España" },
      { href: "/servicios/ia-aplicada", label: "Automatización con IA para empresas" },
      { href: "/agenda", label: "Consulta inicial de 30 minutos" },
    ],
  },
  {
    slug: "automatizacion-procesos-administrativos-ejemplos",
    title: "Automatización de procesos administrativos: 7 ejemplos que una pyme puede empezar este mes",
    seoTitle: "Automatización administrativa: 7 ejemplos",
    description:
      "Siete procesos administrativos que una pyme puede automatizar sin cambiar de ERP: altas, presupuestos, cobros, facturas, gastos, informes y contratos.",
    eyebrow: "Automatización",
    publishedAt: "2026-10-04",
    updatedAt: "2026-10-04",
    readingMinutes: 7,
    intro:
      "Cuando se habla de automatizar procesos administrativos, la conversación suele saltar directamente a la herramienta. Es más útil empezar por los procesos: cuáles se repiten cada semana, cuánto tiempo consumen y qué pasa cuando alguien se equivoca. Estos siete ejemplos son los que más vemos en pymes de servicios, ordenados de los más sencillos a los que requieren algo más de trabajo.",
    sections: [
      {
        heading: "Antes de empezar: elige por volumen y por coste del error",
        paragraphs: [
          "Un buen candidato a automatizar se repite a menudo, sigue siempre los mismos pasos y hoy obliga a copiar datos de un sitio a otro. Si además un error en ese paso tiene consecuencias —una factura mal emitida, un cobro olvidado—, el beneficio es doble: menos horas y menos incidencias.",
        ],
      },
      {
        heading: "Siete procesos que suelen dar resultado",
        paragraphs: [
          "Ninguno exige cambiar de ERP ni de CRM: se conectan los sistemas que ya existen y se eliminan los pasos manuales entre ellos.",
        ],
        list: [
          "Alta de clientes: el formulario de la web o del comercial crea la ficha en el CRM y en el ERP a la vez, con los datos validados, sin teclearlos dos veces.",
          "Presupuestos: a partir de una plantilla y de los precios vigentes se genera el documento, se envía y se avisa al comercial si el cliente no responde en unos días.",
          "Seguimiento de cobros: las facturas vencidas generan recordatorios escalonados y una lista diaria para quien gestiona los cobros.",
          "Registro de facturas de proveedores: los PDF que llegan al correo se leen, se validan y pasan a contabilidad, con revisión humana solo para los casos dudosos.",
          "Notas de gastos: los tiques fotografiados se clasifican por proyecto y categoría y se agrupan para la aprobación mensual.",
          "Informes periódicos: las cifras que alguien monta cada lunes en una hoja de cálculo se calculan solas y llegan por correo a quien las necesita.",
          "Contratos y altas de servicio: al cerrar una venta se genera el contrato con los datos del cliente, se envía a firmar y, al firmarse, se activa el servicio.",
        ],
        ordered: true,
      },
      {
        heading: "Herramientas: de menos a más",
        paragraphs: [
          "Muchos de estos flujos se resuelven con las automatizaciones nativas del CRM o del ERP, o con plataformas como Make, n8n o Zapier conectando aplicaciones conocidas. Cuando el proceso tiene reglas propias, mucho volumen o datos sensibles, una integración a medida suele ser más fiable y más barata de mantener a medio plazo.",
          "La inteligencia artificial encaja en los pasos que hoy requieren leer: facturas en PDF, tiques, correos de clientes. En los pasos con datos estructurados, las reglas fijas siguen siendo la mejor opción.",
        ],
      },
      {
        heading: "Cómo medir si ha funcionado",
        paragraphs: [
          "Antes de automatizar, anota tres cifras del proceso: cuántas veces ocurre al mes, cuánto tarda cada vez y cuántos errores se detectan. Repite la medición dos meses después. Si no puedes contestar esas preguntas antes de empezar, ese es el primer trabajo: sin una línea base, cualquier resultado es una impresión.",
          "Y deja siempre un registro: qué se automatizó, qué entradas recibió cada ejecución y qué casos acabaron en revisión manual. Es lo que permite corregir y lo que te pedirá tu asesoría si algo no cuadra.",
        ],
      },
    ],
    takeaways: [
      "Empieza por procesos frecuentes, repetitivos y con un coste de error conocido.",
      "Ninguno de estos ejemplos exige cambiar de ERP o de CRM.",
      "Reglas fijas para datos estructurados; IA solo para los pasos que requieren leer.",
      "Mide frecuencia, tiempo y errores antes y después de automatizar.",
    ],
    related: [
      { href: "/servicios/automatizacion-de-procesos", label: "Automatización de procesos empresariales" },
      { href: "/espana/automatizacion-de-procesos", label: "Automatización de procesos para empresas en España" },
      { href: "/agenda", label: "Consulta inicial de 30 minutos" },
    ],
  },
];

export const blogSlugs = blogPosts.map((post) => post.slug);

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function isBlogSlug(slug: string): boolean {
  return blogSlugs.includes(slug);
}

export function formatPostDate(iso: string, locale = "es-ES"): string {
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`)
  );
}

/** Fecha más reciente entre todos los artículos, para el sitemap y el listado. */
export const blogUpdatedAt = blogPosts.reduce(
  (latest, post) => (post.updatedAt > latest ? post.updatedAt : latest),
  blogPosts[0]?.updatedAt ?? "2026-09-16"
);
