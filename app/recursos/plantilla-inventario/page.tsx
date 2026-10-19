import type { Metadata } from "next";
import Link from "next/link";
import { CircleHelp, FileSpreadsheet, MessageCircle, Sparkles } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BannerCuentaAtras, DescargaPlantilla } from "@/components/tools/descarga-plantilla";
import { SinTiempoExcel } from "@/components/tools/sin-tiempo-excel";
import { ANCLA_FORMULARIO, INSTAGRAM } from "@/lib/plantilla";
import { breadcrumbList } from "@/lib/structured-data";
import { ogImages } from "@/lib/seo";

const URL_ = "https://devruby.org/recursos/plantilla-inventario";
const title = "Plantilla de control de inventario en Excel que te dice cuándo dejar Excel";
const description =
  "Inventario en Excel con una pestaña que revisa 5 señales y se pone en verde, ámbar o rojo. Funciona en Excel, LibreOffice y Google Sheets.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: URL_ },
  openGraph: { title, description, url: URL_, type: "website", locale: "es_ES", images: ogImages },
};

const senales: Array<[string, string]> = [
  ["Hay stock en negativo", "Se vendió lo que no había: la hoja va por detrás de la realidad."],
  ["Hay códigos repetidos", "El mismo producto en dos filas acaba con dos stocks distintos."],
  ["Varias personas editan la hoja", "Cambios a la vez que se pisan y nadie sabe cuál es la versión buena."],
  ["Más de un almacén o canal", "Tienda, web y almacén sobre la misma hoja se descuadran rápido."],
  ["Los recuentos no cuadran", "Lo que cuentas en la estantería no coincide con lo que dice la hoja."],
];

// Vista de ejemplo de la pestaña «Ya toca» (datos ficticios, no es un cliente).
const ejemplo: Array<[string, boolean]> = [
  ["Stock en negativo", true],
  ["Códigos repetidos", true],
  ["Varias personas editan", false],
  ["Más de un almacén o canal", true],
  ["Recuentos que no cuadran", false],
];

const colores: Array<[string, string, string]> = [
  ["VERDE", "bg-emerald-600", "Quédate con tu Excel. Todavía no necesitas un sistema, ni a nosotros."],
  ["ÁMBAR", "bg-amber-500", "Ordena la hoja antes de que crezca: revisa las señales que salen «Sí»."],
  ["ROJO", "bg-crimson", "Tu negocio creció más que tu Excel. Es el momento de mirar un sistema de inventario."],
];

const pasos: Array<[string, string]> = [
  ["Apunta tu stock", "Código, producto, almacén o canal y cantidad en la pestaña «Inventario»."],
  ["Haz tus recuentos", "Escribe lo que cuentas en la estantería. La diferencia se calcula sola."],
  ["Mira el semáforo", "La pestaña «Ya toca» revisa 5 señales y te dice si seguir con Excel."],
];

const faqs: Array<[string, string]> = [
  ["¿Hay que dar el correo para descargarla?", "No. Hasta el domingo 25/10 la descarga es directa y sin registro. Después la enviamos por mensaje si nos escribes STOCK."],
  ["¿La hoja envía mis datos a algún sitio?", "No. Es un archivo de Excel normal: todo se queda en tu equipo o en tu Google Drive."],
  ["¿Funciona en Google Sheets?", "Sí. En Google Drive, Nuevo → Subir archivo y ábrelo con Hojas de cálculo de Google. También funciona en Excel y LibreOffice."],
  ["¿Por qué una empresa de software regala un Excel?", "Porque para muchos negocios un Excel bien llevado es suficiente. La hoja te dice cuándo deja de serlo, y si sale en rojo, puedes hablar con nosotros."],
];

export default function PlantillaInventarioPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbList([{ name: "Inicio", url: "https://devruby.org" }, { name: "Plantilla de inventario", url: URL_ }]),
      { "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    ],
  };
  const rojas = ejemplo.filter(([, si]) => si).length;

  return (
    <main className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <BannerCuentaAtras />

      <section className="relative overflow-hidden pt-3 pb-14 md:pb-20">
        <div className="absolute -left-32 top-8 -z-10 h-80 w-80 rounded-full bg-crimson/10 blur-[100px]" />
        <div className="absolute -right-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-lavender/10 blur-[100px]" />
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-crimson/15 bg-crimson/5 px-4 py-2 text-xs font-semibold text-crimson-dark"><FileSpreadsheet className="h-3.5 w-3.5" /> Excel · LibreOffice · Google Sheets</p>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-ivory md:text-5xl">La plantilla de inventario que te dice cuándo dejar Excel</h1>
            <p className="mt-5 text-lg leading-relaxed text-ivory-dim">Lleva tu stock en una hoja normal. La pestaña «Ya toca» revisa 5 señales y se pone en verde, ámbar o rojo. En verde, te dice que sigas con tu Excel.</p>
            <div className="mt-8 max-w-md"><DescargaPlantilla /></div>
          </div>

          <Card className="p-6 md:p-8" aria-label="Ejemplo de la pestaña Ya toca">
            <div className="flex items-center justify-between">
              <p className="font-display text-xl text-ivory">Pestaña «Ya toca»</p>
              <span className="rounded-full bg-black/5 px-3 py-1 text-[11px] font-semibold text-ivory-muted">Ejemplo, no es un cliente</span>
            </div>
            <ul className="mt-5 divide-y divide-black/8">
              {ejemplo.map(([s, si]) => (
                <li key={s} className="flex items-center justify-between py-3 text-sm text-ivory-dim">
                  {s}
                  <span className={`rounded-md px-2.5 py-0.5 text-xs font-bold ${si ? "bg-crimson/10 text-crimson" : "bg-emerald-600/10 text-emerald-700"}`}>{si ? "Sí" : "No"}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-xl bg-crimson p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/80">{rojas} señales · semáforo</p>
              <p className="mt-1 font-display text-4xl tracking-wide">ROJO</p>
              <p className="mt-2 text-sm text-white/90">Tu negocio creció más que tu Excel.</p>
            </div>
          </Card>

          {/* Bajo las dos columnas: abre la ventana de 4 preguntas */}
          <div className="lg:col-span-2"><SinTiempoExcel /></div>
        </div>
      </section>

      <section className="py-12 md:py-16"><div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-3xl text-ivory">Cómo funciona</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {pasos.map(([t, d], i) => (
            <li key={t}><Card className="h-full p-6"><span className="grid h-9 w-9 place-items-center rounded-full bg-crimson/10 font-display text-lg text-crimson">{i + 1}</span><p className="mt-4 font-semibold text-ivory">{t}</p><p className="mt-2 text-sm leading-relaxed text-ivory-dim">{d}</p></Card></li>
          ))}
        </ol>
      </div></section>

      <section className="py-12 md:py-16"><div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2">
        <Card className="p-7 md:p-9">
          <h2 className="font-display text-2xl text-ivory">Las 5 señales que revisa</h2>
          <ol className="mt-6 grid gap-4">{senales.map(([s, por], i) => <li key={s} className="text-sm leading-relaxed text-ivory-dim"><strong className="text-ivory">{i + 1}. {s}.</strong> {por}</li>)}</ol>
        </Card>
        <Card className="flex flex-col p-7 md:p-9">
          <h2 className="font-display text-2xl text-ivory">Qué significa cada color</h2>
          <ul className="mt-6 grid gap-5">{colores.map(([c, bg, t]) => <li key={c} className="flex gap-3 text-sm leading-relaxed text-ivory-dim"><span className={`mt-0.5 h-5 w-14 shrink-0 rounded text-center text-[10px] font-bold leading-5 text-white ${bg}`}>{c}</span>{t}</li>)}</ul>
          <div className="mt-auto pt-8">
            <p className="text-sm text-ivory-dim">¿Prefieres no llevar la hoja tú?</p>
            <a href={`#${ANCLA_FORMULARIO}`} className="mt-3 block"><Button as="span" variant="lavender" className="w-full"><Sparkles className="h-4 w-4" /> Responder 4 preguntas</Button></a>
          </div>
        </Card>
      </div></section>

      <section className="py-12 md:py-16"><div className="mx-auto max-w-6xl px-6"><Card className="border-crimson/15 bg-crimson/5 p-8 md:p-10">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="font-display text-3xl text-ivory">¿Te salió en rojo?</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-ivory-dim">Escríbenos <strong>STOCK-ROJO</strong> por mensaje directo en Instagram o cuéntanos tu caso. Vemos contigo qué parte de tu inventario se ha quedado pequeña para la hoja.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" data-track="contact"><Button as="span" variant="outline" className="w-full border-crimson/30 bg-white text-crimson hover:bg-white hover:border-crimson/60"><MessageCircle className="h-4 w-4" /> Instagram @devruby.llc</Button></a>
            <Link href="/contacto?origen=plantilla" data-track="contact"><Button as="span" className="w-full">Contarnos tu caso</Button></Link>
          </div>
        </div>
      </Card></div></section>

      <section className="pb-24 pt-12" aria-labelledby="faq-title"><div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center gap-3"><CircleHelp className="h-6 w-6 text-crimson" /><h2 id="faq-title" className="font-display text-3xl text-ivory">Preguntas frecuentes</h2></div>
        <div className="mt-8 grid gap-4">{faqs.map(([q, a]) => <details key={q} className="rounded-2xl border border-black/8 bg-white/75 px-6 py-5 shadow-card"><summary className="cursor-pointer list-none font-semibold text-ivory marker:hidden">{q}</summary><p className="mt-4 max-w-3xl text-sm leading-relaxed text-ivory-dim">{a}</p></details>)}</div>
      </div></section>
      <Footer />
    </main>
  );
}
