import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, CheckCircle2, Code2, Link2, ShieldCheck, Workflow } from "lucide-react";
import { Footer } from "@/components/sections/footer";
import { Navbar } from "@/components/sections/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { spainServices } from "@/lib/spain-campaign";

export const metadata: Metadata = {
  title: "Software a medida y automatización para empresas en España",
  description:
    "DEVRUBY ayuda a empresas españolas a ordenar operaciones mediante software a medida, automatización, integraciones API y auditorías técnicas de aplicaciones.",
  alternates: { canonical: "https://devruby.org/espana" },
  openGraph: {
    title: "Software a medida y automatización para empresas en España | DEVRUBY",
    description: "Aplicaciones web, automatización, integraciones API y auditorías técnicas para operaciones empresariales.",
    url: "https://devruby.org/espana",
    type: "website",
  },
};

const services = [
  { slug: "desarrollo-software-a-medida", icon: Code2 },
  { slug: "automatizacion-de-procesos", icon: Workflow },
  { slug: "integracion-api-sistemas", icon: Link2 },
  { slug: "auditoria-seguridad-aplicaciones", icon: ShieldCheck },
] as const;

const steps = [
  ["1", "Contexto", "Revisamos el proceso, sus responsables y los sistemas que intervienen."],
  ["2", "Diagnóstico", "Acordamos el problema prioritario y comprobamos la viabilidad técnica."],
  ["3", "Alcance", "Definimos una primera entrega útil, sus límites y cómo se validará."],
  ["4", "Ejecución", "Construimos con seguimiento, demostraciones y documentación para el equipo."],
];

export default function EspanaPage() {
  return (
    <main className="relative">
      <Navbar />
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute left-1/2 top-0 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-crimson/10 blur-[130px]" />
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="inline-flex rounded-full border border-crimson/15 bg-crimson/5 px-4 py-2 text-xs font-semibold text-crimson-dark">Ingeniería de software remota para empresas en España</p>
          <h1 className="mx-auto mt-6 max-w-5xl font-display text-4xl leading-[1.04] tracking-tight text-ivory md:text-6xl">Convierte procesos dispersos en una operación <span className="gradient-text">clara y conectada</span></h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-relaxed text-ivory-dim">Diseñamos software a medida, automatizaciones e integraciones para empresas que necesitan dejar atrás tareas repetitivas, datos aislados y herramientas que ya no encajan.</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/agenda?origen=espana" data-track="agenda"><Button size="lg" className="w-full sm:w-auto">Agendar diagnóstico inicial <CalendarDays className="h-4 w-4" /></Button></Link>
            <Link href="#soluciones"><Button variant="outline" size="lg" className="w-full sm:w-auto">Ver soluciones <ArrowRight className="h-4 w-4" /></Button></Link>
          </div>
          <p className="mt-5 text-xs text-ivory-muted">DEVRUBY LLC trabaja en remoto con empresas de España.</p>
        </div>
      </section>

      <section className="py-12 md:py-16" aria-labelledby="situacion-title">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center"><h2 id="situacion-title" className="font-display text-3xl text-ivory md:text-4xl">El problema no suele ser la falta de herramientas</h2><p className="mt-4 text-ivory-dim">Suele ser que ninguna representa el proceso completo, sus reglas ni la información que el equipo necesita para decidir.</p></div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {["Datos duplicados entre herramientas y hojas de cálculo.", "Procesos que dependen de correos, recordatorios y conocimiento de unas pocas personas.", "Sistemas que no se comunican o que no dan visibilidad sobre incidencias y trabajo pendiente."].map((item) => <Card key={item} className="p-7"><CheckCircle2 className="h-6 w-6 text-crimson" /><p className="mt-5 leading-relaxed text-ivory-dim">{item}</p></Card>)}
          </div>
        </div>
      </section>

      <section id="soluciones" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6"><div className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-crimson-dark">Soluciones</p><h2 className="mt-3 font-display text-3xl text-ivory md:text-4xl">Elige el problema que necesitas resolver primero</h2></div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">{services.map(({ slug, icon: Icon }) => { const service = spainServices[slug]; return <Card key={slug} className="flex flex-col p-7 md:p-8"><Icon className="h-7 w-7 text-crimson" /><h3 className="mt-5 font-display text-2xl text-ivory">{service.shortTitle}</h3><p className="mt-3 flex-1 text-sm leading-relaxed text-ivory-dim">{service.description}</p><Link className="mt-6 inline-flex items-center gap-2 font-semibold text-crimson hover:text-crimson-dark" href={`/espana/${slug}`}>Explorar {service.label.toLowerCase()} <ArrowRight className="h-4 w-4" /></Link></Card>; })}</div>
        </div>
      </section>

      <section className="py-12 md:py-16" aria-labelledby="casos-title">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-crimson-dark">Trabajo seleccionado</p><h2 id="casos-title" className="mt-3 font-display text-3xl text-ivory md:text-4xl">Productos construidos para necesidades reales</h2></div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Card className="p-8"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-crimson-dark">Producto móvil · Publicado</p><h3 className="mt-3 font-display text-2xl text-ivory">Lazo</h3><p className="mt-3 leading-relaxed text-ivory-dim">Aplicación móvil publicada en Google Play y Apple App Store. Incluye cuentas vinculadas, actividades diarias, estados compartidos y notificaciones para acompañar la conexión entre parejas.</p><a className="mt-5 inline-flex items-center gap-2 font-semibold text-crimson hover:text-crimson-dark" href="https://play.google.com/store/apps/details?id=app.lazo.com" target="_blank" rel="noreferrer">Ver en Google Play <ArrowRight className="h-4 w-4" /></a></Card>
            <Card className="p-8"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-crimson-dark">Windows + panel web</p><h3 className="mt-3 font-display text-2xl text-ivory">Maintenance Check</h3><p className="mt-3 leading-relaxed text-ivory-dim">Sistema para mantenimiento de equipos médicos: una aplicación Windows programa alertas persistentes y registra acciones; el panel web permite consultar equipos, actividad QR, personal y empresa.</p><a className="mt-5 inline-flex items-center gap-2 font-semibold text-crimson hover:text-crimson-dark" href="https://mcheck.devruby.org/" target="_blank" rel="noreferrer">Ver Maintenance Check <ArrowRight className="h-4 w-4" /></a></Card>
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-ivory-muted">Solo publicamos información autorizada de cada producto; no atribuimos métricas ni resultados no documentados.</p>
        </div>
      </section>

      <section className="py-16 md:py-24"><div className="mx-auto max-w-7xl px-6"><div className="mx-auto max-w-3xl text-center"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-crimson-dark">Forma de trabajo</p><h2 className="mt-3 font-display text-3xl text-ivory md:text-4xl">Primero entendemos; después proponemos</h2></div><ol className="mt-12 grid gap-5 md:grid-cols-4">{steps.map(([number, title, text]) => <li key={number}><Card className="h-full p-6"><span className="font-display text-4xl text-crimson/60">{number}</span><h3 className="mt-5 font-display text-xl text-ivory">{title}</h3><p className="mt-3 text-sm leading-relaxed text-ivory-dim">{text}</p></Card></li>)}</ol></div></section>

      <section className="pb-24 pt-12"><div className="mx-auto max-w-5xl px-6"><Card className="border-crimson/15 bg-crimson/5 p-8 text-center md:p-12"><h2 className="font-display text-3xl text-ivory md:text-4xl">¿Tienes un proceso que ya no escala bien?</h2><p className="mx-auto mt-4 max-w-2xl text-ivory-dim">Reserva 30 minutos para explicarnos qué ocurre hoy, qué sistemas participan y qué resultado necesitas. Si no encajamos, te lo diremos con claridad.</p><Link href="/agenda?origen=espana" data-track="agenda"><Button size="lg" className="mt-8">Ver horarios disponibles <CalendarDays className="h-4 w-4" /></Button></Link></Card></div></section>
      <Footer />
    </main>
  );
}
