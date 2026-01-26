import { FadeIn } from "@/components/animate/fade-in";
import { Card } from "@/components/ui/card";

const steps = [
  {
    n: "01",
    title: "Discovery",
    desc: "Entendemos el negocio, el contexto y el flujo real. Definimos alcance y riesgos.",
  },
  {
    n: "02",
    title: "Blueprint",
    desc: "Arquitectura, UX, backlog y plan de entrega. Dejamos claro el “qué” y el “cómo”.",
  },
  {
    n: "03",
    title: "Build",
    desc: "Desarrollo por sprints con demos. Pruebas, calidad y performance desde el inicio.",
  },
  {
    n: "04",
    title: "Ship",
    desc: "Deploy, observabilidad y handoff ordenado. Lo que se entrega se puede mantener.",
  },
  {
    n: "05",
    title: "Improve",
    desc: "Iteramos: métricas, optimización, nuevas funciones y automatizaciones continuas.",
  },
];

export function Process() {
  return (
    <section id="proceso" className="relative mx-auto max-w-6xl px-5 py-20">
      <FadeIn>
        <h2 className="font-display text-3xl tracking-tight md:text-4xl">
          Proceso: rápido, visible y sin sorpresas
        </h2>
        <p className="mt-3 max-w-2xl text-white/70">
          Un método simple para producir calidad: claridad al inicio, ejecución impecable y mejora continua.
        </p>
      </FadeIn>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {steps.map((s, idx) => (
          <FadeIn key={s.n} delay={idx * 0.06}>
            <Card className="p-6">
              <div className="flex items-baseline justify-between">
                <div className="font-display text-xl">{s.title}</div>
                <div className="text-sm text-white/50">{s.n}</div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{s.desc}</p>
              <div className="mt-6 h-px w-full bg-gradient-to-r from-ruby-red/0 via-ruby-red/30 to-ruby-red/0" />
            </Card>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
