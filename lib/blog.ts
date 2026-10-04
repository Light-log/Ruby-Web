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
];

export const blogSlugs = blogPosts.map((post) => post.slug);

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function isBlogSlug(slug: string): boolean {
  return blogSlugs.includes(slug);
}

export function formatPostDate(iso: string): string {
  return new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`)
  );
}

/** Fecha más reciente entre todos los artículos, para el sitemap y el listado. */
export const blogUpdatedAt = blogPosts.reduce(
  (latest, post) => (post.updatedAt > latest ? post.updatedAt : latest),
  blogPosts[0]?.updatedAt ?? "2026-09-16"
);
