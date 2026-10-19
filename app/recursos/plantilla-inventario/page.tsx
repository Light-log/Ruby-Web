import type { Metadata } from "next";
import Link from "next/link";
import { CircleHelp, FileSpreadsheet, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DescargaPlantilla } from "@/components/tools/descarga-plantilla";
import { breadcrumbList } from "@/lib/structured-data";
import { ogImages } from "@/lib/seo";

const URL_ = "https://devruby.org/recursos/plantilla-inventario";
const title = "Plantilla de control de inventario en Excel que te dice cuándo dejar Excel";
const description =
  "Descarga directa, sin registro: inventario en Excel con una pestaña que revisa 5 señales y se pone en verde, ámbar o rojo. Funciona en Excel, LibreOffice y Google Sheets.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: URL_ },
  openGraph: { title, description, url: URL_, type: "website", locale: "es_ES", images: ogImages },
};

const INSTAGRAM = "https://www.instagram.com/devruby.llc/";

const senales: Array<[string, string]> = [
  ["Hay stock en negativo", "Se vendió lo que no había: la hoja va por detrás de la realidad."],
  ["Hay códigos repetidos", "El mismo producto en dos filas acaba con dos stocks distintos."],
  ["Varias personas editan la hoja", "Cambios a la vez que se pisan y nadie sabe cuál es la versión buena."],
  ["Más de un almacén o canal", "Tienda, web y almacén sobre la misma hoja se descuadran rápido."],
  ["Los recuentos no cuadran", "Lo que cuentas en la estantería no coincide con lo que dice la hoja."],
];

const colores: Array<[string, string, string]> = [
  ["VERDE", "bg-emerald-600", "Quédate con tu Excel. Todavía no necesitas un sistema, ni a nosotros."],
  ["ÁMBAR", "bg-amber-500", "Ordena la hoja antes de que crezca: revisa las señales que salen «Sí»."],
  ["ROJO", "bg-crimson", "Tu negocio creció más que tu Excel. Es el momento de mirar un sistema de inventario."],
];

const faqs: Array<[string, string]> = [
  ["¿Hay que dar el correo para descargarla?", "No. La descarga es directa y no hace falta registrarse."],
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

  return (
    <main className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <section className="relative overflow-hidden pt-3 pb-12 md:pb-16">
        <div className="absolute -left-32 top-8 -z-10 h-80 w-80 rounded-full bg-crimson/10 blur-[100px]" />
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-crimson/15 bg-crimson/5 px-4 py-2 text-xs font-semibold text-crimson-dark"><FileSpreadsheet className="h-3.5 w-3.5" /> Excel · LibreOffice · Google Sheets</p>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-ivory md:text-6xl">La plantilla de inventario que te dice cuándo dejar Excel</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ivory-dim">
            Lleva tu stock en una hoja normal. La pestaña «Ya toca» revisa 5 señales y se pone en verde, ámbar o rojo. En verde, te dice que sigas con tu Excel.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <DescargaPlantilla />
            <span className="text-sm text-ivory-muted">Descarga directa, sin registro.</span>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16"><div className="mx-auto grid max-w-5xl gap-6 px-6 md:grid-cols-2">
        <Card className="p-7 md:p-9">
          <h2 className="font-display text-2xl text-ivory">Las 5 señales que revisa</h2>
          <ol className="mt-6 grid gap-4">{senales.map(([s, por], i) => <li key={s} className="text-sm leading-relaxed text-ivory-dim"><strong className="text-ivory">{i + 1}. {s}.</strong> {por}</li>)}</ol>
        </Card>
        <Card className="p-7 md:p-9">
          <h2 className="font-display text-2xl text-ivory">Qué significa cada color</h2>
          <ul className="mt-6 grid gap-4">{colores.map(([c, bg, t]) => <li key={c} className="flex gap-3 text-sm leading-relaxed text-ivory-dim"><span className={`mt-0.5 h-5 w-14 shrink-0 rounded text-center text-[10px] font-bold leading-5 text-white ${bg}`}>{c}</span>{t}</li>)}</ul>
        </Card>
      </div></section>

      <section className="py-12 md:py-16"><div className="mx-auto max-w-5xl px-6"><Card className="border-crimson/15 bg-crimson/5 p-8 md:p-10">
        <h2 className="font-display text-3xl text-ivory">¿Te salió en rojo?</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-ivory-dim">
          Escríbenos <strong>STOCK-ROJO</strong> por mensaje directo en Instagram o cuéntanos tu caso en el formulario. Vemos contigo qué parte de tu inventario se ha quedado pequeña para la hoja.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" data-track="contact"><Button as="span" variant="outline" className="w-full sm:w-auto"><MessageCircle className="h-4 w-4" /> Instagram @devruby.llc</Button></a>
          <Link href="/contacto?origen=plantilla" data-track="contact"><Button as="span" className="w-full sm:w-auto">Contarnos tu caso</Button></Link>
        </div>
      </Card></div></section>

      <section className="pb-24 pt-12" aria-labelledby="faq-title"><div className="mx-auto max-w-5xl px-6">
        <div className="flex items-center gap-3"><CircleHelp className="h-6 w-6 text-crimson" /><h2 id="faq-title" className="font-display text-3xl text-ivory">Preguntas frecuentes</h2></div>
        <div className="mt-8 grid gap-4">{faqs.map(([q, a]) => <details key={q} className="rounded-2xl border border-black/8 bg-white/75 px-6 py-5 shadow-card"><summary className="cursor-pointer list-none font-semibold text-ivory marker:hidden">{q}</summary><p className="mt-4 max-w-3xl text-sm leading-relaxed text-ivory-dim">{a}</p></details>)}</div>
      </div></section>
      <Footer />
    </main>
  );
}
