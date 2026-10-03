import type { ReactNode } from "react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Card } from "@/components/ui/card";

export type LegalSection = { id?: string; title: string; body: ReactNode };

export function LegalPage({
  title,
  intro,
  updated,
  sections,
}: {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark px-5 py-10 text-ivory sm:px-6 lg:py-16">
        <article className="mx-auto max-w-4xl">
          <header className="mb-10 border-b border-black/10 pb-8">
            <p className="mb-3 inline-flex rounded-full border border-crimson/20 bg-crimson/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-crimson-dark">
              Última actualización: {updated}
            </p>
            <h1 className="font-display text-4xl uppercase leading-tight text-ivory sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ivory-dim">{intro}</p>
          </header>

          <Card className="rounded-2xl p-6 sm:p-8">
            <div className="space-y-10 text-sm leading-7 text-ivory-dim sm:text-base">
              {sections.map((section) => (
                <section
                  key={section.title}
                  id={section.id}
                  className="scroll-mt-24 border-b border-black/8 pb-8 last:border-b-0 last:pb-0 [&_a]:font-semibold [&_a]:text-crimson [&_a]:underline [&_a]:underline-offset-4 [&_li]:mb-2 [&_p+p]:mt-3 [&_table]:w-full [&_td]:border-t [&_td]:border-black/8 [&_td]:py-2 [&_td]:pr-3 [&_td]:align-top [&_th]:pb-2 [&_th]:pr-3 [&_th]:text-left [&_th]:text-ivory [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5"
                >
                  <h2 className="mb-3 font-display text-xl uppercase text-ivory">{section.title}</h2>
                  {section.body}
                </section>
              ))}
            </div>
          </Card>
        </article>
      </main>
      <Footer />
    </>
  );
}
