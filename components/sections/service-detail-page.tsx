import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CircleHelp,
  MessageCircle,
} from "lucide-react";
import { FadeIn } from "@/components/animate/fade-in";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollMorphShowcase } from "@/components/ui/scroll-morph-showcase";
import { ExpandableGallery } from "@/components/ui/gallery-animation";
import { DonutChart } from "@/components/ui/donut-chart";
import { LogoSphere } from "@/components/ui/img-sphere";
import { AutomationConsole } from "@/components/ui/automation-console";
import StickerPeeling from "@/components/ui/sticker-peel";
import Globe from "@/components/ui/globe";
import { GlassCards } from "@/components/ui/glass-cards";
import { ShieldOrb } from "@/components/ui/shield-orb";
import { bookingUrl, site } from "@/lib/site";
import { processPhases, servicesCatalog, serviceSlugs, type ServiceSlug } from "@/lib/services-catalog";

/**
 * Contenedor único de la página: crece hasta 88rem en monitores anchos (antes
 * se quedaba fijo en 80rem y dejaba márgenes enormes) y reduce el padding
 * lateral en móvil, donde 24px se comían demasiado ancho de línea.
 */
const container = "mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 2xl:max-w-[88rem]";
const containerNarrow = "mx-auto w-full max-w-5xl px-5 sm:px-6 lg:px-8";

/** Imágenes de la galería de infraestructura y DevOps. */
const infraGallery = [
  {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80",
    alt: "Sala de servidores en producción",
  },
  {
    src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1400&q=80",
    alt: "Panel de parcheo y cableado de red",
  },
  {
    src: "https://images.unsplash.com/photo-1520869562399-e772f042f422?w=1400&q=80",
    alt: "Switch y conexiones del rack",
  },
  {
    src: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1400&q=80",
    alt: "Terminal de despliegue y automatización",
  },
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
    alt: "Hardware y electrónica de red",
  },
] as const;

/**
 * Datos de ejemplo del tablero de KPIs. Son ilustrativos: sirven para enseñar la
 * forma del entregable, no son cifras de ningún cliente.
 */
const kpiSample = [
  { name: "Ventas y CRM", value: 32 },
  { name: "Operaciones", value: 26 },
  { name: "Finanzas", value: 17 },
  { name: "Soporte", value: 12 },
  { name: "Marketing", value: 9 },
];

/**
 * Modelos y herramientas de IA con las que trabajamos. Son marcas de terceros:
 * se muestran como tecnologías que integramos, no como socios ni patrocinadores.
 */
const aiLogos = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    src: "/logos/ai/ChatGPT-Logo.svg",
    description:
      "El asistente de OpenAI es la vía más rápida para prototipar una conversación y comprobar, antes de invertir en desarrollo, si el caso de uso realmente se sostiene.",
  },
  {
    id: "claude",
    name: "Claude",
    src: "/logos/ai/claude.svg",
    description:
      "Su ventana de contexto amplia permite razonar sobre documentos largos completos: contratos, expedientes o manuales, sin trocearlos y perder el hilo.",
  },
  {
    id: "gemini",
    name: "Google Gemini",
    src: "/logos/ai/googlegemini.svg",
    description:
      "Multimodal de origen: entiende texto, imagen y vídeo en la misma consulta. Útil cuando el proceso mezcla formatos, como una inspección con fotos.",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    src: "/logos/ai/deepseek.svg",
    description:
      "Modelos de pesos abiertos fuertes en razonamiento y código, con un coste por consulta muy inferior. Entran cuando el volumen manda sobre el resto.",
  },
  {
    id: "qwen",
    name: "Qwen",
    src: "/logos/ai/qwen.svg",
    description:
      "Modelos abiertos de Alibaba con buen rendimiento multilingüe. Una opción cuando el producto opera en varios idiomas además del español.",
  },
  {
    id: "mistral",
    name: "Mistral AI",
    src: "/logos/ai/mistralai.svg",
    description:
      "Modelos abiertos y ligeros, pensados para correr sobre infraestructura propia sin exigir el hardware de los modelos grandes.",
  },
  {
    id: "meta",
    name: "Llama (Meta)",
    src: "/logos/ai/meta.svg",
    description:
      "Pesos abiertos y descargables. La alternativa cuando los datos no pueden salir de la organización y el modelo tiene que vivir dentro.",
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    src: "/logos/ai/huggingface.svg",
    description:
      "El repositorio donde se publican y comparan modelos y conjuntos de datos. Es donde se elige el modelo antes de integrarlo.",
  },
  {
    id: "ollama",
    name: "Ollama",
    src: "/logos/ai/ollama.svg",
    description:
      "Ejecuta modelos en local, en un servidor tuyo. Permite probar y medir sin que ninguna consulta salga a un proveedor externo.",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    src: "/logos/ai/perplexity.svg",
    description:
      "Búsqueda que devuelve la fuente junto a la respuesta. Sirve cuando el resultado debe poder verificarse, no solo sonar convincente.",
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    src: "/logos/ai/githubcopilot.svg",
    description:
      "Asistente dentro del editor. Acelera el trabajo repetitivo de programación sin sustituir la revisión de código, que sigue siendo humana.",
  },
  {
    id: "langchain",
    name: "LangChain",
    src: "/logos/ai/langchain.svg",
    description:
      "Orquesta las piezas: qué modelo responde, qué datos consulta antes y qué herramientas puede usar. Es lo que convierte un modelo en una función del sistema.",
  },
  {
    id: "pytorch",
    name: "PyTorch",
    src: "/logos/ai/pytorch.svg",
    description:
      "El marco con el que se entrena y se ajusta un modelo a un dominio concreto, cuando lo genérico no da la precisión que el caso necesita.",
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    src: "/logos/ai/tensorflow.svg",
    description:
      "Plataforma de aprendizaje automático con herramientas maduras para servir modelos en producción y sostenerlos en el tiempo.",
  },
  {
    id: "nvidia",
    name: "NVIDIA",
    src: "/logos/ai/nvidia.svg",
    description:
      "GPUs y CUDA: la capa de cómputo sobre la que se entrena y se responde. Determina cuánto cuesta y cuánto tarda cada consulta.",
  },
];

/**
 * Etapas del flujo de automatización. Los nombres replican el `flow` del
 * catálogo; aquí se les añade el detalle del registro y las subtareas.
 */
const automationSteps = [
  {
    name: "Capturar",
    detail: "Factura #1042 recibida por correo · adjunto PDF detectado",
    substeps: ["Correo, formulario o carpeta compartida", "Lectura del documento"],
  },
  {
    name: "Validar",
    detail: "Datos contrastados contra el ERP · sin excepciones",
    substeps: ["Reglas de negocio y duplicados", "Excepciones a revisión humana"],
  },
  {
    name: "Procesar",
    detail: "Asiento generado y registrado en el sistema",
    substeps: ["Alta en el sistema de destino", "Trazabilidad de cada cambio"],
  },
  {
    name: "Notificar",
    detail: "Aviso enviado por 3 canales en paralelo",
    substeps: ["Responsable y solicitante", "Canal según urgencia"],
  },
  {
    name: "Medir",
    detail: "Tiempo de ciclo y tasa de excepción actualizados",
    substeps: ["Tiempo por etapa", "Volumen y errores"],
  },
];

const automationOutputs = ["Correo", "WhatsApp", "ERP"];

/** Plataformas para las que construimos, como pegatinas despegables. */
const platformStickers = [
  { name: "Apple · macOS", src: "/logos/os/apple.png" },
  { name: "iOS", src: "/logos/os/ios.png" },
  { name: "Android", src: "/logos/os/android.png" },
  { name: "Windows", src: "/logos/os/windows.png" },
  { name: "Linux", src: "/logos/os/linux.png" },
];

/** Tarjetas de cristal del servicio de desarrollo. Etiquetas traducidas. */
const devCards = [
  {
    label: "Repositorio",
    rotation: -15,
    icon: (
      <svg viewBox="0 0 496 512" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
      </svg>
    ),
  },
  {
    label: "Código",
    rotation: 5,
    icon: (
      <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z" />
      </svg>
    ),
  },
  {
    label: "Pagos",
    rotation: 25,
    icon: (
      <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm64 320H64V320c35.3 0 64 28.7 64 64zM64 192V128h64c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
      </svg>
    ),
  },
];

function whatsappUrl(service: string) {
  const url = new URL(site.whatsAppUrl);
  url.searchParams.set("text", `Hola DEVRUBY, quiero hablar sobre ${service}.`);
  return url.toString();
}

export function ServiceDetailPage({ slug }: { slug: ServiceSlug }) {
  const service = servicesCatalog[slug];
  const accent = service.color === "crimson" ? "crimson" : "lavender";
  const booking = bookingUrl();
  const related = serviceSlugs.filter((s) => s !== slug).slice(0, 3);
  const flow = service.flow;

  const iconBox =
    accent === "crimson"
      ? "bg-crimson/8 text-crimson ring-1 ring-crimson/15"
      : "bg-lavender/8 text-lavender ring-1 ring-lavender/15";
  const chip =
    accent === "crimson"
      ? "border-crimson/15 bg-crimson/5 text-crimson-dark"
      : "border-lavender/15 bg-lavender/5 text-lavender";
  const tick = accent === "crimson" ? "text-crimson" : "text-lavender";

  const isSecurity = slug === "seguridad-tecnica";
  const isAI = slug === "ia-aplicada";
  const isDev = slug === "desarrollo-de-software";
  /** En estos servicios el hero lleva una pieza visual y la ficha baja. */
  const heroHasVisual = isSecurity || isAI || isDev;

  /**
   * Ficha "Qué cubre este servicio". En seguridad técnica cede su sitio del
   * hero a la esfera 3D y baja, ya a ancho completo y en dos columnas.
   */
  const coverageCard = (wide: boolean) => (
    <Card className="relative overflow-hidden p-6 sm:p-8 lg:p-9">
          <div
            className={`pointer-events-none absolute -right-10 -top-10 opacity-[0.05] ${tick}`}
            aria-hidden
          >
            <service.icon className="h-44 w-44" strokeWidth={1} />
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ivory-muted">
            Qué cubre este servicio
          </p>

          <ul className={`mt-6 grid gap-5 ${wide ? "sm:grid-cols-2 sm:gap-x-10" : ""}`}>
            {service.capabilities.map((cap, idx) => (
              <li key={cap.title} className="flex gap-4">
                <span
                  className={`pt-0.5 font-display text-sm tabular-nums ${tick}`}
                  aria-hidden
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-base text-ivory sm:text-lg lg:text-xl">
                    {cap.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ivory-dim lg:text-[0.9375rem]">
                    {cap.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {flow ? (
            <>
              <div className="mt-7 h-px w-full bg-gradient-to-r from-transparent via-black/8 to-transparent" />
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-ivory-muted">
                Flujo típico
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2">
                {flow.map((step, idx) => (
                  <span key={step} className="flex items-center gap-2 text-sm text-ivory-dim">
                    {step}
                    {idx < flow.length - 1 ? (
                      <ArrowRight className="h-3.5 w-3.5 text-ivory-muted" />
                    ) : null}
                  </span>
                ))}
              </div>
            </>
          ) : null}
</Card>
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-3 pb-12 sm:pb-16 lg:pb-24">
        <div className="absolute -left-32 top-8 -z-10 h-80 w-80 rounded-full bg-crimson/10 blur-[100px]" />
        <div className="absolute -right-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-lavender/10 blur-[100px]" />

        <div className={container}>
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-ivory-muted">
            <Link href="/">Inicio</Link>
            <span aria-hidden>/</span>
            <Link href="/servicios">Servicios</Link>
            <span aria-hidden>/</span>
            <span aria-current="page">{service.shortTitle}</span>
          </nav>
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 text-sm text-ivory-muted transition-colors hover:text-ivory"
          >
            <ArrowLeft className="h-4 w-4" /> Todos los servicios
          </Link>

          {/* Dos columnas a partir de `lg`: el texto dejaba media pantalla vacía
              en monitores anchos, y la ficha da el índice del servicio de un vistazo. */}
          <div className="mt-8 grid items-start gap-10 lg:mt-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl sm:h-14 sm:w-14 ${iconBox}`}
                >
                  <service.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <p
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold sm:px-4 ${chip}`}
                >
                  {service.eyebrow}
                </p>
              </div>

              {/* De `lg` en adelante la tipografía es fluida: con saltos por
                  breakpoint, entre 1024 y 1280 el ancho crecía pero el texto se
                  quedaba en el tamaño de `md` y el hero se veía pequeño. */}
              <h1 className="mt-6 text-balance font-display text-[2rem] leading-[1.06] tracking-tight text-ivory sm:mt-7 sm:text-4xl md:text-5xl lg:text-[clamp(3rem,4.2vw,4.5rem)]">
                {service.headline}
              </h1>
              <p className="mt-6 max-w-[60ch] text-pretty text-base leading-relaxed text-ivory-dim sm:mt-7 sm:text-lg lg:text-[clamp(1.125rem,1.35vw,1.375rem)]">
                {service.intro}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {service.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-full border border-black/8 bg-white/70 px-3 py-2 text-xs text-ivory-dim sm:px-4 lg:text-sm"
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* La primera llamada a la acción estaba al final de la página */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href={`/contacto?servicio=${slug}`} data-track="contact">
                  <Button size="lg" className="w-full sm:w-auto">
                    Solicitar propuesta <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                {booking ? (
                  <a href={booking} target="_blank" rel="noreferrer" data-track="booking">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      <CalendarDays className="h-4 w-4" /> Agendar diagnóstico
                    </Button>
                  </a>
                ) : null}
              </div>

              <p className="mt-5 text-xs text-ivory-muted lg:text-sm">
                Consulta inicial de 30 minutos · Caracas · Remoto / Latam
              </p>
            </div>

            {/* Columna derecha: la esfera en seguridad técnica, la ficha en el resto */}
            <div className="lg:col-span-5">
              {isSecurity ? (
                <ShieldOrb
                  modelUrl="/models/Modelo_Router.glb"
                  color="#C41E3A"
                  className="h-[320px] w-full sm:h-[400px] lg:h-[460px]"
                />
              ) : isAI ? (
                <LogoSphere logos={aiLogos} className="mx-auto w-full max-w-[460px]" />
              ) : isDev ? (
                <div className="mx-auto aspect-square w-full max-w-[440px]">
                  <Globe
                    speed={1.6}
                    scale={9}
                    dots={{ color: "#C41E3A", size: 4, density: 7, allDots: false }}
                    oceanColor="rgba(196,30,58,0.04)"
                    outlineColor="rgba(196,30,58,0.55)"
                    graticuleColor="rgba(26,26,46,0.10)"
                    outlineWidth={1}
                    markerConfig={{
                      markers: [
                        { lat: 10.5, lng: -66.9 },
                        { lat: 40.4, lng: -3.7 },
                        { lat: 19.4, lng: -99.1 },
                        { lat: -34.6, lng: -58.4 },
                        { lat: 4.7, lng: -74.1 },
                      ],
                      color: "#7C5CBF",
                      size: 34,
                    }}
                  />
                </div>
              ) : (
                coverageCard(false)
              )}
            </div>
          </div>
        </div>
      </section>

      {/* La ficha que desplaza la pieza visual del hero, ya a ancho completo */}
      {heroHasVisual ? (
        <section className="pt-4 md:pt-6">
          <div className={container}>{coverageCard(true)}</div>
        </section>
      ) : null}

      {/* Tarjetas de cristal: exclusivas de desarrollo de software */}
      {isDev ? (
        <section className="overflow-hidden py-12 md:py-16 lg:py-20">
          <div className={container}>
            <h2 className="font-display text-2xl text-ivory sm:text-3xl md:text-4xl lg:text-[clamp(2rem,2.6vw,3rem)]">
              Lo que recibes al terminar
            </h2>
            <p className="mt-4 max-w-[60ch] text-ivory-dim lg:text-[1.0625rem]">
              No entregamos solo una aplicación funcionando: entregamos el repositorio, el código
              documentado y las integraciones en marcha. Pasa el cursor por encima.
            </p>

            <GlassCards cards={devCards} className="mt-14" />
          </div>
        </section>
      ) : null}

      {/* Pegatinas de plataformas: exclusivas de apps móviles y escritorio.
          `overflow-hidden`: cada pegatina dibuja un canvas cuatro veces mayor
          que ella para no recortar la sombra, y en móvil eso se salía del
          viewport. Se recorta aquí en vez de tocar el componente. */}
      {slug === "apps-moviles-y-escritorio" ? (
        <section className="overflow-hidden py-12 md:py-16 lg:py-20">
          <div className={container}>
            <h2 className="font-display text-2xl text-ivory sm:text-3xl md:text-4xl lg:text-[clamp(2rem,2.6vw,3rem)]">
              Donde tiene que funcionar
            </h2>
            <p className="mt-4 max-w-[60ch] text-ivory-dim lg:text-[1.0625rem]">
              Móvil y escritorio, nativo o multiplataforma. Elegimos según dónde estén tus usuarios
              y qué necesita de verdad el producto. Pasa el cursor por encima.
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-14 sm:gap-x-16">
              {platformStickers.map((platform) => (
                <div key={platform.name} className="flex flex-col items-center gap-4">
                  <StickerPeeling
                    image={{ src: platform.src }}
                    imageWidth={132}
                    imageHeight={132}
                    backColor="#F0ECE7"
                    shadow={{ opacity: 22, color: "#1A1A2E", x: -300, y: 140 }}
                  />
                  <p className="text-sm font-medium text-ivory-dim">{platform.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Consola de automatización: exclusiva de automatización de procesos */}
      {slug === "automatizacion-de-procesos" ? (
        <section className="py-12 md:py-16 lg:py-20">
          <div className={container}>
            <h2 className="font-display text-2xl text-ivory sm:text-3xl md:text-4xl lg:text-[clamp(2rem,2.6vw,3rem)]">
              Un proceso corriendo solo
            </h2>
            <p className="mt-4 max-w-[60ch] text-ivory-dim lg:text-[1.0625rem]">
              Automatizar no es añadir un bot: es que cada etapa sepa qué recibe, qué valida y a
              quién avisa. Este es el recorrido de una factura, de la bandeja de entrada al
              indicador.
            </p>
            <p className="mt-5 text-xs text-ivory-muted">
              Ejemplo ilustrativo del flujo, con datos de muestra.
            </p>

            <AutomationConsole
              steps={automationSteps}
              outputs={automationOutputs}
              className="mt-10"
            />
          </div>
        </section>
      ) : null}

      {/* Tablero de ejemplo: exclusivo de datos y KPIs */}
      {slug === "datos-y-kpis" ? (
        <section className="py-12 md:py-16 lg:py-20">
          <div className={container}>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="font-display text-2xl text-ivory sm:text-3xl md:text-4xl lg:text-[clamp(2rem,2.6vw,3rem)]">
                  Así se ve un tablero terminado
                </h2>
                <p className="mt-4 max-w-[60ch] text-ivory-dim lg:text-[1.0625rem]">
                  Un indicador solo sirve si alguien puede leerlo en cinco segundos y decidir. Este
                  es el reparto de indicadores por área en un tablero típico: cada bloque tiene
                  dueño, fuente y frecuencia de actualización.
                </p>
                <p className="mt-5 text-xs text-ivory-muted">
                  Cifras de ejemplo, para mostrar el formato del entregable.
                </p>
              </div>

              <Card className="p-6 sm:p-8 lg:p-9">
                <DonutChart data={kpiSample} unit="indicadores" />
              </Card>
            </div>
          </div>
        </section>
      ) : null}

      {/* Galería expandible: exclusiva de infraestructura y DevOps */}
      {slug === "infraestructura-y-devops" ? (
        <section className="py-12 md:py-16 lg:py-20">
          <div className={container}>
            <h2 className="font-display text-2xl text-ivory sm:text-3xl md:text-4xl lg:text-[clamp(2rem,2.6vw,3rem)]">
              Dónde vive tu sistema
            </h2>
            <p className="mt-4 max-w-[60ch] text-ivory-dim lg:text-[1.0625rem]">
              Servidores, red, contenedores y entornos: la capa que sostiene el producto y que solo
              se nota cuando falla.
            </p>
            <ExpandableGallery images={[...infraGallery]} className="mt-10" />
          </div>
        </section>
      ) : null}

      {/* Showcase animado: exclusivo de UI/UX, donde el propio efecto es una
          muestra del servicio. En el resto de servicios no aporta y alarga la
          página con 220vh de scroll. */}
      {slug === "ui-ux-y-producto" ? (
        <ScrollMorphShowcase
          accent={accent}
          overline={service.shortTitle}
          title={service.headline}
          subtitle={service.summary}
        />
      ) : null}

      {/* Capacidades */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className={container}>
          <h2 className="font-display text-2xl text-ivory sm:text-3xl md:text-4xl lg:text-[clamp(2rem,2.6vw,3rem)]">Qué incluye este servicio</h2>
          <p className="mt-4 max-w-[60ch] text-ivory-dim lg:text-[1.0625rem]">
            El alcance se ajusta a tu caso. Estas son las capacidades que cubrimos dentro de esta
            área.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {service.capabilities.map((cap, idx) => (
              <FadeIn key={cap.title} delay={idx * 0.05}>
                <Card className="h-full p-6 transition-all duration-300 hover:border-black/12 hover:shadow-card-hover sm:p-7 md:p-9">
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.16em] ${
                      accent === "crimson" ? "text-crimson-dark" : "text-lavender"
                    }`}
                  >
                    {cap.eyebrow}
                  </p>
                  <h3 className="mt-3 font-display text-xl text-ivory sm:text-2xl lg:text-[1.75rem]">{cap.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory-dim lg:text-base">{cap.desc}</p>

                  <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-black/8 to-transparent" />

                  <ul className="mt-5 grid gap-3">
                    {cap.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ivory-dim lg:text-[0.9375rem]">
                        <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${tick}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo trabajamos + casos */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className={`${container} grid gap-6 md:grid-cols-2`}>
          <Card className="p-6 sm:p-7 md:p-9">
            <h2 className="font-display text-xl text-ivory sm:text-2xl">Cómo abordamos el trabajo</h2>
            <ul className="mt-6 grid gap-4">
              {service.deliverables.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ivory-dim">
                  <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${tick}`} />
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 sm:p-7 md:p-9">
            <h2 className="font-display text-xl text-ivory sm:text-2xl">Casos frecuentes</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {service.useCases.map((useCase) => (
                <span
                  key={useCase}
                  className="rounded-xl border border-black/8 bg-dark-200/60 px-4 py-2.5 text-sm text-ivory-dim"
                >
                  {useCase}
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-black/8 bg-dark-200/60 p-6">
              <p className="text-xs uppercase tracking-wider text-ivory-muted">Para quién encaja</p>
              <p className="mt-3 text-sm leading-relaxed text-ivory-dim">{service.fit}</p>
            </div>
          </Card>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className={container}>
          <h2 className="font-display text-2xl text-ivory sm:text-3xl md:text-4xl lg:text-[clamp(2rem,2.6vw,3rem)]">Nuestro proceso</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processPhases.map((phase) => (
              <Card key={phase.step} className="p-6">
                <p
                  className={`font-display text-3xl ${
                    accent === "crimson" ? "text-crimson" : "text-lavender"
                  }`}
                >
                  {phase.step}
                </p>
                <h3 className="mt-3 font-display text-lg text-ivory">{phase.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory-dim">{phase.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 md:py-16 lg:py-20" aria-labelledby="faq-title">
        <div className={containerNarrow}>
          <div className="flex items-center gap-3">
            <CircleHelp className={`h-6 w-6 ${tick}`} />
            <h2 id="faq-title" className="font-display text-2xl text-ivory sm:text-3xl md:text-4xl lg:text-[clamp(2rem,2.6vw,3rem)]">
              Preguntas frecuentes
            </h2>
          </div>
          <div className="mt-8 grid gap-4">
            {service.faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-2xl border border-black/8 bg-white/75 px-5 py-5 shadow-card sm:px-6"
              >
                <summary className="cursor-pointer list-none font-semibold text-ivory marker:hidden">
                  {faq.question}
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ivory-dim">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className={containerNarrow}>
          <Card className="p-7 text-center sm:p-10 md:p-14">
            <h2 className="font-display text-2xl text-ivory sm:text-3xl md:text-4xl lg:text-[clamp(2rem,2.6vw,3rem)]">
              Hablemos de tu próximo sistema
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-ivory-dim">
              Cuéntanos el objetivo y DEVRUBY devuelve una propuesta clara con alcance, tiempo y
              próximos pasos.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href={`/contacto?servicio=${slug}`} data-track="contact">
                <Button size="lg" className="w-full sm:w-auto">
                  Solicitar propuesta <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              {booking ? (
                <a href={booking} target="_blank" rel="noreferrer" data-track="booking">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <CalendarDays className="h-4 w-4" /> Agendar diagnóstico
                  </Button>
                </a>
              ) : null}

              <a
                href={whatsappUrl(service.shortTitle)}
                target="_blank"
                rel="noreferrer"
                data-track="whatsapp"
              >
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </Button>
              </a>
            </div>

            <p className="mt-6 text-xs text-ivory-muted">
              Consulta inicial de 30 minutos · {site.email} · Caracas · Remoto / Latam
            </p>
          </Card>
        </div>
      </section>

      {/* Otros servicios */}
      <section className="pb-20 pt-6 md:pb-24">
        <div className={container}>
          <h2 className="font-display text-2xl text-ivory sm:text-3xl">Otros servicios</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((otherSlug) => {
              const other = servicesCatalog[otherSlug];
              return (
                <Link key={otherSlug} href={`/servicios/${otherSlug}`} className="group block">
                  <Card className="h-full p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-black/12 group-hover:shadow-card-hover">
                    <div className="flex items-center gap-3">
                      <div
                        className={`grid h-10 w-10 place-items-center rounded-xl ${
                          other.color === "crimson"
                            ? "bg-crimson/8 text-crimson ring-1 ring-crimson/15"
                            : "bg-lavender/8 text-lavender ring-1 ring-lavender/15"
                        }`}
                      >
                        <other.icon className="h-4 w-4" />
                      </div>
                      <h3 className="font-display text-lg text-ivory">{other.shortTitle}</h3>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-ivory-dim">{other.summary}</p>
                    <div className="mt-5 flex items-center gap-2 text-sm text-ivory-muted transition-colors group-hover:text-crimson">
                      Ver detalle
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
