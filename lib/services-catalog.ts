import {
  Boxes,
  Brain,
  Code2,
  Database,
  Shield,
  Smartphone,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type ServiceCapability = {
  eyebrow: string;
  title: string;
  desc: string;
  items: readonly string[];
};

export type ServiceFaq = { question: string; answer: string };

export type ServiceEntry = {
  icon: LucideIcon;
  color: "crimson" | "lavender";
  label: string;
  shortTitle: string;
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  intro: string;
  summary: string;
  highlights: readonly string[];
  capabilities: readonly ServiceCapability[];
  useCases: readonly string[];
  flow?: readonly string[];
  deliverables: readonly string[];
  fit: string;
  faqs: readonly ServiceFaq[];
};

const catalog = {
  "desarrollo-de-software": {
    icon: Code2,
    color: "crimson",
    label: "Web & SaaS",
    shortTitle: "Desarrollo de software a medida",
    title: "Desarrollo de software a medida",
    description:
      "Aplicaciones web, plataformas, portales, SaaS y paneles internos con arquitectura escalable, código documentado y despliegue incluido.",
    eyebrow: "Productos digitales",
    headline: "Construimos el producto que tu negocio necesita",
    intro:
      "Desde un MVP validable hasta una plataforma completa, con arquitectura, código, datos, despliegue y documentación. El objetivo no es entregar un repositorio: es dejar un sistema que tu equipo pueda operar y hacer crecer.",
    summary:
      "Aplicaciones web, plataformas, portales, SaaS y paneles internos con arquitectura limpia y escalable.",
    highlights: [
      "Arquitectura escalable",
      "Backend, frontend y base de datos",
      "Documentación y despliegue",
    ],
    capabilities: [
      {
        eyebrow: "Web",
        title: "Aplicaciones web y SaaS",
        desc: "Plataformas accesibles desde el navegador para clientes, equipos o comunidades.",
        items: [
          "Portales de clientes y proveedores",
          "Sistemas de suscripción y roles",
          "Paneles administrativos y marketplaces",
        ],
      },
      {
        eyebrow: "Servicios",
        title: "APIs y servicios de consumo",
        desc: "Servicios técnicos para que aplicaciones, socios o equipos consuman funciones y datos.",
        items: [
          "REST / GraphQL y autenticación",
          "Pagos, email y mensajería",
          "Webhooks, colas y documentación",
        ],
      },
      {
        eyebrow: "Arquitectura",
        title: "Base técnica mantenible",
        desc: "Decisiones de diseño pensadas para que el sistema siga siendo modificable en un año.",
        items: [
          "Modelado de datos y reglas de negocio",
          "Separación por servicios cuando aporta",
          "Code review y estándares de equipo",
        ],
      },
      {
        eyebrow: "Entrega",
        title: "Despliegue y transferencia",
        desc: "El sistema llega a producción con entorno reproducible y conocimiento traspasado.",
        items: [
          "Entornos de staging y producción",
          "Documentación técnica y funcional",
          "Capacitación al equipo interno",
        ],
      },
    ],
    useCases: [
      "CRM y backoffice",
      "Marketplaces",
      "Portales de autoservicio",
      "Fintech y ahorro",
      "Gestión documental",
      "Suscripciones",
    ],
    deliverables: [
      "Descubrimiento de objetivos, usuarios, proceso y alcance.",
      "Arquitectura, prototipo y plan de ejecución acordados antes de construir.",
      "Sprints con integraciones, pruebas y revisiones periódicas.",
      "Despliegue, documentación, capacitación y soporte de entrega.",
    ],
    fit: "Empresas y equipos de producto que ya tienen un proceso claro —o una idea validable— y necesitan convertirlo en un sistema fiable, propio y preparado para crecer.",
    faqs: [
      {
        question: "¿Cuándo conviene un desarrollo a medida frente a una herramienta existente?",
        answer:
          "Cuando la forma de trabajar es una ventaja competitiva o las herramientas estándar obligan a demasiados pasos manuales. En la conversación inicial revisamos si ajustar lo que ya usas sería suficiente antes de plantear un desarrollo.",
      },
      {
        question: "¿Se puede empezar con un alcance reducido?",
        answer:
          "Sí. El MVP o sprint de validación permite probar el valor con funciones esenciales, iteraciones cortas y una base preparada para crecer, sin comprometer el alcance completo desde el inicio.",
      },
      {
        question: "¿Qué recibimos al final del proyecto?",
        answer:
          "El código, la documentación técnica y funcional, el entorno desplegado y una sesión de transferencia. El sistema queda operable por tu equipo, con o sin nuestro acompañamiento posterior.",
      },
    ],
  },

  "apps-moviles-y-escritorio": {
    icon: Smartphone,
    color: "lavender",
    label: "Apps móviles",
    shortTitle: "Apps móviles y de escritorio",
    title: "Apps móviles y de escritorio",
    description:
      "Aplicaciones iOS, Android, Windows y multiplataforma para usuarios finales y herramientas internas, incluida su publicación en tiendas.",
    eyebrow: "Experiencia",
    headline: "Productos para usuarios finales y herramientas internas",
    intro:
      "Experiencias móviles y de escritorio conectadas con APIs, pagos y notificaciones. Acompañamos el ciclo completo: desarrollo, pruebas en dispositivo, publicación en tiendas y soporte posterior.",
    summary:
      "Apps iOS, Android, Windows y multiplataforma conectadas con APIs, pagos y notificaciones.",
    highlights: ["iOS y Android", "Windows o multiplataforma", "Notificaciones y publicación"],
    capabilities: [
      {
        eyebrow: "Mobile",
        title: "Apps móviles",
        desc: "Experiencias móviles publicables y conectadas con APIs, pagos y notificaciones.",
        items: [
          "Android e iOS",
          "Apps híbridas o nativas",
          "Publicación y soporte en tiendas",
        ],
      },
      {
        eyebrow: "Desktop",
        title: "Software de escritorio",
        desc: "Aplicaciones para Windows o entornos específicos que necesitan acceso local.",
        items: [
          "Herramientas internas",
          "Procesos offline y sincronización",
          "Alertas, overlays y utilidades",
        ],
      },
      {
        eyebrow: "Conexión",
        title: "Backend y sincronización",
        desc: "La app se apoya en servicios diseñados para funcionar también con red intermitente.",
        items: [
          "APIs propias o integración con las existentes",
          "Sincronización y resolución de conflictos",
          "Notificaciones push y mensajería",
        ],
      },
      {
        eyebrow: "Ciclo de vida",
        title: "Publicación y evolución",
        desc: "Acompañamos el paso a producción y las versiones siguientes.",
        items: [
          "Preparación de fichas y requisitos de tienda",
          "Versionado y actualizaciones",
          "Monitoreo de fallos en producción",
        ],
      },
    ],
    useCases: [
      "Apps de salud o fitness",
      "Herramientas de campo y operaciones",
      "Portales de autoservicio móvil",
      "Utilidades internas de escritorio",
    ],
    deliverables: [
      "Definición de plataformas, dispositivos objetivo y alcance funcional.",
      "Diseño de la experiencia y prototipo navegable antes de construir.",
      "Desarrollo con pruebas en dispositivo real y builds de revisión.",
      "Publicación en tiendas, documentación y soporte de la primera versión.",
    ],
    fit: "Equipos que necesitan llegar a usuarios finales en el móvil, o dotar a su personal de una herramienta que funcione fuera del navegador.",
    faqs: [
      {
        question: "¿Nativo o multiplataforma?",
        answer:
          "Depende del caso. Si la app necesita capacidades específicas del dispositivo o un rendimiento gráfico exigente, conviene nativo. Para la mayoría de productos de negocio, multiplataforma reduce coste y tiempo sin penalizar la experiencia. La decisión se toma en el descubrimiento.",
      },
      {
        question: "¿Se encargan de la publicación en App Store y Google Play?",
        answer:
          "Sí. Preparamos los requisitos de cada tienda, gestionamos el proceso de revisión y damos soporte a la primera versión publicada. Las cuentas de desarrollador quedan a nombre del cliente.",
      },
      {
        question: "¿Tenemos experiencia publicando apps reales?",
        answer:
          "Sí. Lazo es una app móvil desarrollada de extremo a extremo por DEVRUBY, incluida su publicación en producción.",
      },
    ],
  },

  "automatizacion-de-procesos": {
    icon: Workflow,
    color: "crimson",
    label: "Automatización",
    shortTitle: "Automatización y sistemas",
    title: "Automatización de procesos y sistemas de gestión",
    description:
      "Flujos que conectan ventas, finanzas, operaciones y soporte: facturación, ERP/CRM, documentos, bots y atención omnicanal.",
    eyebrow: "Automatización y sistemas",
    headline: "Reducimos trabajo manual, errores y tiempos de respuesta",
    intro:
      "Conectamos herramientas, definimos reglas y dejamos trazabilidad para que el proceso pueda medirse y mejorarse. Automatizar no es añadir un bot sin contexto: es saber qué inicia cada tarea, quién la valida y dónde queda registrada.",
    summary:
      "Flujos que conectan ventas, finanzas, operaciones y soporte. Menos tareas repetitivas y más control.",
    highlights: ["Facturación y documentos", "ERP / CRM", "Integraciones y bots"],
    capabilities: [
      {
        eyebrow: "Finanzas",
        title: "Automatización de facturación",
        desc: "Flujos para generar, validar, enviar y registrar documentos de cobro.",
        items: [
          "Facturas, notas y comprobantes",
          "Cálculos, impuestos y validaciones",
          "Alertas, conciliación y reportes",
        ],
      },
      {
        eyebrow: "Gestión",
        title: "ERP, CRM y sistemas internos",
        desc: "Implantación, personalización e integración de sistemas de gestión.",
        items: [
          "Odoo y módulos a medida",
          "Clientes, ventas, RRHH e inventario",
          "Roles, permisos y auditoría",
        ],
      },
      {
        eyebrow: "Backoffice",
        title: "Operaciones y documentos",
        desc: "Procesamiento automático de información y expedientes.",
        items: [
          "Formularios y aprobaciones",
          "Generación de PDFs",
          "Extracción y clasificación de datos",
        ],
      },
      {
        eyebrow: "Canales",
        title: "Bots y atención omnicanal",
        desc: "Automatización de consultas, captación y derivación a agentes.",
        items: [
          "WhatsApp, Telegram y web",
          "Instagram y Messenger",
          "Historial y escalamiento humano",
        ],
      },
    ],
    useCases: [
      "Facturación y conciliación",
      "Aprobaciones y expedientes",
      "Seguimiento de leads",
      "Tickets y derivación a agentes",
      "Inventario y trazabilidad",
      "Onboarding de personal",
    ],
    flow: ["Capturar", "Validar", "Procesar", "Notificar", "Medir"],
    deliverables: [
      "Mapa del flujo actual, responsables, excepciones y puntos de aprobación.",
      "Automatizaciones de captura, validación, notificación y actualización de datos.",
      "Alertas y registros para que el equipo revise solo lo que requiere decisión.",
      "Documentación del flujo y criterios para su mantenimiento.",
    ],
    fit: "Equipos de administración, ventas, soporte u operaciones que ya repiten un proceso digital y quieren reducir la dependencia de tareas manuales.",
    faqs: [
      {
        question: "¿Hay que sustituir todas nuestras herramientas para automatizar?",
        answer:
          "No necesariamente. El punto de partida es aprovechar las herramientas que ya aportan valor y conectar solo los pasos que generan duplicidad, retrasos o falta de información.",
      },
      {
        question: "¿La automatización elimina las revisiones humanas?",
        answer:
          "No. Un buen flujo conserva aprobaciones y excepciones donde aportan criterio. El objetivo es retirar el trabajo repetitivo, no automatizar decisiones que necesitan contexto.",
      },
      {
        question: "¿Trabajan sobre Odoo u otros ERP existentes?",
        answer:
          "Sí. Realizamos implantación, personalización e integración de sistemas de gestión, incluidos módulos a medida y localizaciones específicas.",
      },
    ],
  },

  "ia-aplicada": {
    icon: Brain,
    color: "lavender",
    label: "IA aplicada",
    shortTitle: "IA especializada",
    title: "Inteligencia artificial aplicada al negocio",
    description:
      "Asistentes, IA documental, visión por computador y modelos aplicados a casos concretos, conectados con datos y operación real.",
    eyebrow: "IA aplicada",
    headline: "Inteligencia aplicada a un proceso concreto",
    intro:
      "La IA aporta valor cuando se conecta con datos, reglas, usuarios y una operación real. No partimos de la tecnología: partimos del proceso que debe mejorar y definimos qué papel puede cumplir un modelo dentro de él.",
    summary:
      "Asistentes y modelos aplicados a casos concretos del negocio, con datos y reglas reales detrás.",
    highlights: [
      "Chatbots y agentes",
      "IA documental y visual",
      "Clasificación, extracción y recomendaciones",
    ],
    capabilities: [
      {
        eyebrow: "Asistentes",
        title: "IA especializada",
        desc: "Asistentes entrenados para resolver tareas y consultas del negocio.",
        items: [
          "Bases de conocimiento",
          "Acciones conectadas a sistemas",
          "Escalamiento a una persona",
        ],
      },
      {
        eyebrow: "Documentos",
        title: "IA documental",
        desc: "Lectura, extracción y generación de información a partir de documentos.",
        items: [
          "Clasificación y campos clave",
          "Búsqueda semántica",
          "Generación guiada de documentos",
        ],
      },
      {
        eyebrow: "Visión",
        title: "IA visual y predictiva",
        desc: "Análisis de imágenes y datos para apoyar decisiones o personalizar experiencias.",
        items: [
          "Reconocimiento en imágenes",
          "Predicción y recomendaciones",
          "Seguimiento y alertas",
        ],
      },
      {
        eyebrow: "Integración",
        title: "IA dentro del flujo de trabajo",
        desc: "El modelo se inserta donde el equipo ya trabaja, no en una herramienta aparte.",
        items: [
          "Conexión con CRM, ERP y canales de atención",
          "Reglas de negocio y límites de actuación",
          "Registro de decisiones y revisión humana",
        ],
      },
    ],
    useCases: [
      "Atención automatizada multicanal",
      "Clasificación de expedientes",
      "Extracción de datos de facturas",
      "Búsqueda interna de conocimiento",
      "Recomendaciones a clientes",
      "Alertas predictivas de operación",
    ],
    deliverables: [
      "Definición del caso de uso, datos disponibles y criterio de éxito.",
      "Prototipo evaluable sobre datos reales antes de comprometer el alcance.",
      "Integración con los sistemas y canales donde ocurre el proceso.",
      "Reglas de escalamiento humano, registro y seguimiento de calidad.",
    ],
    fit: "Negocios con un proceso repetitivo y con datos suficientes —documentos, conversaciones, históricos o imágenes— donde un modelo puede reducir carga o acelerar una decisión.",
    faqs: [
      {
        question: "¿Necesitamos muchos datos para empezar?",
        answer:
          "Depende del caso. Los asistentes conversacionales y la IA documental funcionan con bases de conocimiento y ejemplos acotados. La predicción sí requiere histórico. En el diagnóstico se evalúa si los datos disponibles sostienen el caso antes de invertir.",
      },
      {
        question: "¿La IA toma decisiones sin supervisión?",
        answer:
          "Solo donde el riesgo lo permite y de forma explícita. El diseño define límites de actuación, casos que se escalan a una persona y un registro de lo que el sistema hizo y por qué.",
      },
      {
        question: "¿Tienen un producto propio de IA?",
        answer:
          "Sí. RubyQ es un SaaS de bots de IA con API, panel web, motor de flujos y atención multicanal, desarrollado y operado por DEVRUBY.",
      },
    ],
  },

  "datos-y-kpis": {
    icon: Database,
    color: "crimson",
    label: "Datos & KPIs",
    shortTitle: "Datos, KPIs y analítica",
    title: "Datos, KPIs y analítica",
    description:
      "Información consolidada para medir, alertar y decidir: onboarding de KPIs, dashboards, reportes y sincronización de fuentes.",
    eyebrow: "Decisión",
    headline: "De datos dispersos a un tablero que el equipo usa",
    intro:
      "Un dashboard sirve cuando alguien lo mira y actúa. Definimos qué medir, conectamos las fuentes, construimos el tablero y dejamos la rutina de seguimiento funcionando con el equipo.",
    summary:
      "Modelado de datos, dashboards, pipelines y analítica para decidir sobre señales reales.",
    highlights: ["Onboarding de KPIs", "Dashboards y reportes", "ETL y sincronización de fuentes"],
    capabilities: [
      {
        eyebrow: "Dirección",
        title: "Onboarding de KPIs",
        desc: "Definimos qué medir y dejamos el tablero funcionando con el equipo.",
        items: [
          "Mapa de objetivos e indicadores",
          "Conexión de fuentes",
          "Dashboard, alertas y capacitación",
        ],
      },
      {
        eyebrow: "Ingeniería",
        title: "Pipelines y modelado",
        desc: "La base que hace que un número sea confiable y reproducible.",
        items: [
          "Modelado de datos SQL / NoSQL",
          "ETL y sincronización entre fuentes",
          "Consolidación multiempresa",
        ],
      },
      {
        eyebrow: "Visualización",
        title: "Dashboards y reportes",
        desc: "Tableros interactivos y reportes automáticos para cada nivel de decisión.",
        items: [
          "Tableros interactivos por área",
          "Reportes automatizados y programados",
          "Alertas sobre umbrales y desviaciones",
        ],
      },
      {
        eyebrow: "Adopción",
        title: "Rutina de seguimiento",
        desc: "El tablero se acompaña de una forma de usarlo, no solo de una URL.",
        items: [
          "Capacitación al equipo",
          "Definición de la cadencia de revisión",
          "Ajuste de indicadores tras el primer ciclo",
        ],
      },
    ],
    useCases: [
      "KPIs de dirección y gerencia",
      "Consolidación multiempresa",
      "Reportes de ventas y marketing",
      "Control de operaciones e inventario",
      "Métricas financieras y de cobro",
      "Alertas y metas por equipo",
    ],
    flow: ["Objetivos", "Fuentes", "Modelo", "Dashboard", "Rutina de seguimiento"],
    deliverables: [
      "Mapa de objetivos, indicadores y responsables de cada métrica.",
      "Conexión y validación de las fuentes de datos implicadas.",
      "Dashboard operativo con alertas configuradas.",
      "Capacitación y rutina de seguimiento acordada con el equipo.",
    ],
    fit: "Direcciones y equipos que ya generan datos en varios sistemas pero siguen decidiendo con reportes manuales, tardíos o inconsistentes.",
    faqs: [
      {
        question: "¿Qué es el KPI Sprint?",
        answer:
          "Una ruta corta para pasar de datos dispersos a un tablero útil y adoptado: objetivos, fuentes, modelo, dashboard y rutina de seguimiento. Es la forma habitual de empezar cuando aún no hay indicadores definidos.",
      },
      {
        question: "¿Sirve si nuestros datos están desordenados?",
        answer:
          "Sí, y suele ser el punto de partida. Parte del trabajo es identificar qué fuente es la referencia de cada dato y qué hay que corregir para que el indicador sea confiable.",
      },
      {
        question: "¿Con qué herramientas trabajan?",
        answer:
          "Depende del stack existente y del volumen. Trabajamos con bases SQL/NoSQL, procesos ETL y herramientas de visualización como Metabase, además de tableros a medida cuando el caso lo justifica.",
      },
    ],
  },

  "infraestructura-y-devops": {
    icon: Boxes,
    color: "lavender",
    label: "Infraestructura",
    shortTitle: "Infraestructura y despliegue",
    title: "Infraestructura, DevOps y escalabilidad",
    description:
      "Entornos reproducibles, automatizados y observables: Docker, pipelines CI/CD, staging y producción, backups, logs y monitoreo.",
    eyebrow: "Continuidad",
    headline: "Entornos robustos para operar con confianza y evolucionar",
    intro:
      "La entrega incluye la base técnica necesaria para operar hoy y evolucionar mañana. Un sistema que nadie sabe desplegar, medir o restaurar es un riesgo, por bueno que sea su código.",
    summary:
      "CI/CD, contenedores, observabilidad y entornos robustos en cloud o híbrido.",
    highlights: ["DevOps, CI/CD y Docker", "Backups, logs y monitoreo", "Escalabilidad y performance"],
    capabilities: [
      {
        eyebrow: "DevOps",
        title: "Infraestructura y despliegue",
        desc: "Entornos reproducibles, automatizados y observables.",
        items: [
          "Docker y pipelines CI/CD",
          "Staging y producción",
          "Backups, logs y monitoreo",
        ],
      },
      {
        eyebrow: "Rendimiento",
        title: "Escalabilidad y performance",
        desc: "Optimización de sistemas que necesitan crecer o responder más rápido.",
        items: [
          "Consultas y caché",
          "Procesos asíncronos y colas",
          "Arquitectura por servicios",
        ],
      },
      {
        eyebrow: "Calidad",
        title: "Testing y revisión técnica",
        desc: "Prácticas para detectar fallos antes de que lleguen al usuario.",
        items: [
          "Pruebas funcionales",
          "Code review y estándares",
          "Validación de integraciones",
        ],
      },
      {
        eyebrow: "Soporte",
        title: "Mantenimiento y evolución",
        desc: "Acompañamiento para corregir, medir, priorizar y ampliar.",
        items: [
          "Incidencias y mejoras",
          "Actualizaciones y migraciones",
          "Roadmap técnico continuo",
        ],
      },
    ],
    useCases: [
      "Migración a contenedores",
      "Automatización de despliegues",
      "Observabilidad y alertas",
      "Optimización de sistemas lentos",
      "Modernización de sistemas heredados",
      "Soporte y mantenimiento continuo",
    ],
    deliverables: [
      "Revisión del entorno actual, dependencias y puntos de fallo.",
      "Pipelines de despliegue, contenedores y entornos separados.",
      "Monitoreo, logs, alertas y política de backups.",
      "Documentación operativa y traspaso al equipo responsable.",
    ],
    fit: "Equipos con un sistema en producción —propio o heredado— que necesitan desplegar con confianza, entender qué ocurre y sostener el crecimiento.",
    faqs: [
      {
        question: "¿Trabajan sobre infraestructura que ya tenemos?",
        answer:
          "Sí. Lo habitual es partir del entorno existente, identificar los puntos frágiles y mejorarlos por fases, en lugar de proponer una migración completa desde el primer día.",
      },
      {
        question: "¿Ofrecen mantenimiento continuo?",
        answer:
          "Sí. La modalidad de evolución de producto cubre incidencias, mejoras, actualizaciones, migraciones y un roadmap técnico con entregas periódicas y monitoreo.",
      },
      {
        question: "¿Qué incluye la observabilidad?",
        answer:
          "Logs centralizados, métricas del sistema, alertas sobre umbrales acordados y, cuando aplica, trazas de las operaciones críticas. El alcance concreto depende del riesgo y del volumen de cada operación.",
      },
    ],
  },

  "seguridad-tecnica": {
    icon: Shield,
    color: "crimson",
    label: "Seguridad",
    shortTitle: "Seguridad técnica",
    title: "Seguridad técnica y auditorías",
    description:
      "Controles para reducir riesgos en aplicaciones y servidores: hardening, gestión de secretos, acceso seguro y auditoría técnica.",
    eyebrow: "Seguridad",
    headline: "Conoce los riesgos técnicos antes de que afecten a tu operación",
    intro:
      "Una revisión útil no se limita a una lista de hallazgos. Trabajamos sobre un alcance autorizado por escrito, documentamos evidencias y entregamos recomendaciones priorizadas para que el equipo sepa qué corregir primero y por qué.",
    summary:
      "Hardening, auditorías técnicas, controles y mejores prácticas en apps y servidores.",
    highlights: ["Hardening y acceso seguro", "Gestión de secretos", "Auditoría y pentesting básico"],
    capabilities: [
      {
        eyebrow: "Hardening",
        title: "Aplicaciones y servidores",
        desc: "Reducción de superficie expuesta y refuerzo de la configuración.",
        items: [
          "Hardening de servidores y servicios",
          "WAF, firewalls y exposición pública",
          "Actualización de dependencias",
        ],
      },
      {
        eyebrow: "Acceso",
        title: "Identidad y secretos",
        desc: "Control de quién entra, a qué y con qué credenciales.",
        items: [
          "Políticas de acceso y autenticación",
          "Gestión de secretos y credenciales",
          "Roles, permisos y auditoría de uso",
        ],
      },
      {
        eyebrow: "Auditoría",
        title: "Revisión técnica",
        desc: "Comprobaciones sobre el alcance acordado, con evidencia documentada.",
        items: [
          "Revisión de aplicación, API o cloud",
          "Pentesting básico dentro del alcance",
          "Informe con prioridad y remediación",
        ],
      },
      {
        eyebrow: "Remediación",
        title: "Corrección y seguimiento",
        desc: "El informe puede continuar en un alcance de corrección técnica.",
        items: [
          "Plan priorizado de remediación",
          "Corrección en software o infraestructura",
          "Verificación tras los cambios",
        ],
      },
    ],
    useCases: [
      "Revisión previa a un lanzamiento",
      "Auditoría antes de una integración",
      "Ordenar riesgos de un sistema heredado",
      "Endurecer accesos y credenciales",
    ],
    deliverables: [
      "Definición de alcance y autorización por escrito antes de cualquier comprobación.",
      "Revisión técnica de la aplicación, API y/o configuración cloud acordada.",
      "Informe de hallazgos con evidencia, prioridad e indicaciones de remediación.",
      "Sesión de entrega para interpretar el resultado y planificar los siguientes pasos.",
    ],
    fit: "Equipos con una aplicación web, API o infraestructura cloud existente que necesitan una revisión técnica acotada y accionable.",
    faqs: [
      {
        question: "¿Esta auditoría equivale a una certificación de cumplimiento?",
        answer:
          "No. Es una auditoría técnica de seguridad sobre un alcance concreto. No sustituye certificaciones, asesoría legal ni evaluaciones regulatorias como ISO 27001, RGPD, ENS, NIS2 o DORA.",
      },
      {
        question: "¿Qué necesitan para empezar?",
        answer:
          "Una explicación del sistema, el alcance autorizado, los entornos que pueden revisarse y un contacto técnico. Nunca se realizan comprobaciones fuera del alcance acordado por escrito.",
      },
      {
        question: "¿Pueden corregir los hallazgos?",
        answer:
          "Sí. Tras la revisión podemos proponer un alcance de remediación sobre el software o la infraestructura, según la prioridad y el contexto técnico encontrado.",
      },
    ],
  },

  "ui-ux-y-producto": {
    icon: Sparkles,
    color: "lavender",
    label: "UI/UX",
    shortTitle: "UI/UX y accesibilidad",
    title: "UI/UX, accesibilidad y experiencia de producto",
    description:
      "Interfaces claras para reducir fricción y aumentar adopción: diseño responsivo, sistemas de componentes, usabilidad y accesibilidad.",
    eyebrow: "Experiencia",
    headline: "Interfaces claras para reducir fricción y aumentar adopción",
    intro:
      "Una plataforma debe ser usable, no solo funcional. Diseñamos interfaces con jerarquía, sistemas de componentes reutilizables y motion con intención, para que el producto se entienda sin manual y se adopte sin resistencia.",
    summary:
      "Interfaces modernas con motion design: microinteracciones, transiciones y animaciones con intención.",
    highlights: ["Diseño responsivo", "Sistemas de componentes", "Usabilidad y accesibilidad"],
    capabilities: [
      {
        eyebrow: "Interfaz",
        title: "Diseño de producto",
        desc: "Interfaces modernas y responsivas construidas sobre jerarquía real.",
        items: [
          "Diseño responsivo y multiplataforma",
          "Prototipos interactivos de alta fidelidad",
          "Motion design y microinteracciones",
        ],
      },
      {
        eyebrow: "Sistema",
        title: "Sistemas de componentes",
        desc: "Una base reutilizable para que el producto crezca sin perder coherencia.",
        items: [
          "Tokens de color, tipografía y espaciado",
          "Librería de componentes documentada",
          "Consistencia entre equipos y pantallas",
        ],
      },
      {
        eyebrow: "Usabilidad",
        title: "Auditoría de UX",
        desc: "Revisión de la experiencia actual para localizar fricción concreta.",
        items: [
          "Análisis de flujos y puntos de abandono",
          "Recomendaciones priorizadas",
          "Mejoras medibles sobre la adopción",
        ],
      },
      {
        eyebrow: "Acceso",
        title: "Accesibilidad y performance",
        desc: "Que la interfaz funcione para todo el mundo y responda rápido.",
        items: [
          "Contraste, foco y navegación por teclado",
          "Semántica y lectores de pantalla",
          "Optimización de carga y respuesta",
        ],
      },
    ],
    useCases: [
      "Rediseño de un producto existente",
      "Sistema de diseño para varios equipos",
      "Auditoría de UX antes de escalar",
      "Mejora de accesibilidad y performance",
    ],
    deliverables: [
      "Revisión de la experiencia actual, usuarios y objetivos de negocio.",
      "Prototipo de alta fidelidad validado antes de implementar.",
      "Sistema de componentes documentado y reutilizable.",
      "Implementación con criterios de accesibilidad y performance.",
    ],
    fit: "Productos digitales con usuarios reales que necesitan reducir fricción, aumentar la adopción o unificar una interfaz que ha crecido sin sistema.",
    faqs: [
      {
        question: "¿Pueden trabajar solo el diseño, sin el desarrollo?",
        answer:
          "Sí. Podemos entregar la auditoría, el prototipo y el sistema de componentes para que los implemente tu equipo, con documentación suficiente para hacerlo sin nuestra intervención.",
      },
      {
        question: "¿Cómo se mide que un rediseño funcionó?",
        answer:
          "Definiendo antes qué debe cambiar: tasa de finalización de un flujo, tiempo hasta completar una tarea, adopción de una función o volumen de soporte. Sin una métrica acordada, un rediseño solo se puede discutir por gusto.",
      },
      {
        question: "¿La accesibilidad encarece el proyecto?",
        answer:
          "Integrada desde el diseño, apenas tiene coste adicional. Lo caro es añadirla al final. Por eso forma parte de los criterios de construcción, no de una fase posterior.",
      },
    ],
  },
} as const;

export type ServiceSlug = keyof typeof catalog;

/**
 * Se expone con el tipo uniforme `ServiceEntry` para que los campos opcionales
 * (por ejemplo `flow`) sean accesibles sobre cualquier slug del catálogo.
 */
export const servicesCatalog: Record<ServiceSlug, ServiceEntry> = catalog;

export const serviceSlugs = Object.keys(catalog) as ServiceSlug[];

export function isServiceSlug(value: string): value is ServiceSlug {
  return value in catalog;
}

/** Áreas del negocio y oportunidades frecuentes (catálogo de servicios, p. 7). */
export const businessAreas = [
  {
    area: "Ventas y marketing",
    opportunities:
      "CRM, cotizaciones, seguimiento de leads, campañas, WhatsApp y portales comerciales.",
  },
  {
    area: "Finanzas y administración",
    opportunities: "Facturación, gastos, conciliación, impuestos, aprobaciones y reportes.",
  },
  {
    area: "Operaciones",
    opportunities: "Órdenes, inventario, mantenimiento, inspecciones, alertas y trazabilidad.",
  },
  {
    area: "Atención al cliente",
    opportunities: "Bots, autoservicio, tickets, base de conocimiento y derivación a agentes.",
  },
  {
    area: "RRHH",
    opportunities: "Onboarding, documentos, asistencia, permisos, nómina y evaluaciones.",
  },
  {
    area: "Dirección y gerencia",
    opportunities: "KPIs, dashboards, alertas, metas y consolidación multiempresa.",
  },
  {
    area: "Legal y documental",
    opportunities: "Formularios inteligentes, expedientes, contratos, clasificación y firma.",
  },
] as const;

/** Formas frecuentes de comenzar (catálogo de servicios, p. 7). */
export const startingPoints = [
  { title: "MVP", desc: "Validar una idea con funciones esenciales." },
  { title: "Automatización", desc: "Eliminar un proceso repetitivo y medir el impacto." },
  { title: "KPI Sprint", desc: "Conectar datos y activar un tablero." },
  { title: "Evolución", desc: "Mejorar o ampliar una plataforma existente." },
] as const;

/** Modalidades de colaboración (catálogo de servicios, p. 9). */
export const engagementModels = [
  {
    eyebrow: "Definido",
    title: "Proyecto por alcance",
    desc: "Objetivos, entregables y etapas acordadas desde el inicio.",
    items: [
      "Ideal para soluciones nuevas",
      "Hitos y criterios de aceptación",
      "Entrega y transferencia",
    ],
  },
  {
    eyebrow: "Validación",
    title: "MVP o sprint de validación",
    desc: "Una primera versión enfocada en probar el valor y aprender rápido.",
    items: ["Priorización de funciones", "Iteraciones cortas", "Base preparada para crecer"],
  },
  {
    eyebrow: "Continuidad",
    title: "Evolución de producto",
    desc: "Capacidad continua para mejorar, corregir y ampliar.",
    items: ["Backlog priorizado", "Entregas periódicas", "Monitoreo y soporte"],
  },
  {
    eyebrow: "Diagnóstico",
    title: "Auditoría e integración",
    desc: "Revisión técnica y plan para conectar o modernizar sistemas.",
    items: ["Arquitectura y seguridad", "Riesgos y oportunidades", "Plan de implementación"],
  },
] as const;

/** Fases de trabajo (catálogo de servicios, p. 8). */
export const processPhases = [
  { step: "01", title: "Descubrimiento", desc: "Objetivos, usuarios, proceso y alcance." },
  { step: "02", title: "Diseño", desc: "Arquitectura, prototipo y plan de ejecución." },
  { step: "03", title: "Construcción", desc: "Sprints, integraciones, pruebas y revisiones." },
  {
    step: "04",
    title: "Entrega",
    desc: "Despliegue, documentación, capacitación y soporte.",
  },
] as const;
