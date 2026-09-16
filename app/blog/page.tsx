import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FadeIn } from "@/components/animate/fade-in";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { blogPosts, formatPostDate } from "@/lib/blog";
import { ogImages, SITE_URL } from "@/lib/seo";
import { breadcrumbList } from "@/lib/structured-data";

const title = "Blog: criterio técnico para operaciones que crecen";
const description =
  "Artículos prácticos sobre software a medida, integración de sistemas, automatización administrativa y seguridad de aplicaciones, escritos por el equipo de DEVRUBY.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  openGraph: { title: `${title} | DEVRUBY`, description, url: `${SITE_URL}/blog`, type: "website", locale: "es_ES", images: ogImages },
  twitter: { card: "summary_large_image", title: `${title} | DEVRUBY`, description, images: ogImages.map((i) => i.url) },
  alternates: { canonical: `${SITE_URL}/blog` },
};

function BlogSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${SITE_URL}/blog#blog`,
        url: `${SITE_URL}/blog`,
        name: "Blog de DEVRUBY",
        description,
        inLanguage: "es",
        publisher: { "@id": `${SITE_URL}/#organization` },
        blogPost: blogPosts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          url: `${SITE_URL}/blog/${post.slug}`,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
        })),
      },
      breadcrumbList([
        { name: "Inicio", url: SITE_URL },
        { name: "Blog", url: `${SITE_URL}/blog` },
      ]),
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function BlogIndexPage() {
  const posts = [...blogPosts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return (
    <main className="relative">
      <BlogSchema />
      <Navbar />

      <section className="relative pt-16 pb-12 md:pt-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 2xl:max-w-[88rem]">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-crimson-dark">Blog</p>
            <h1 className="mt-4 font-display text-4xl tracking-tight text-ivory md:text-6xl">
              Criterio técnico para <span className="gradient-text">operaciones que crecen</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ivory-dim">
              Lo que revisamos en las primeras conversaciones con empresas: cuándo construir, qué integrar
              primero, cómo automatizar con trazabilidad y cómo leer un informe de seguridad. Sin cifras
              inventadas ni promesas genéricas.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 sm:px-6 md:grid-cols-2 lg:px-8 2xl:max-w-[88rem]">
          {posts.map((post, index) => (
            <FadeIn key={post.slug} delay={index * 0.05}>
              <Card className="flex h-full flex-col p-8 hover:shadow-card-hover">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-crimson-dark">{post.eyebrow}</p>
                <h2 className="mt-3 font-display text-2xl leading-snug text-ivory">
                  <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-crimson">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-4 flex-1 text-ivory-dim">{post.description}</p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-ivory-muted">
                  <span className="flex items-center gap-2">
                    <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                    <span aria-hidden="true">·</span>
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    {post.readingMinutes} min
                  </span>
                  <Link href={`/blog/${post.slug}`} className="flex items-center gap-1 font-semibold text-crimson-dark hover:text-crimson">
                    Leer artículo <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="font-display text-3xl text-ivory md:text-4xl">¿Tienes un caso parecido?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-ivory-dim">
            Cuéntanos el proceso, los sistemas que intervienen y el resultado que necesitas. Revisamos el
            caso en una consulta inicial de 30 minutos.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/agenda" data-track="agenda">
              <Button size="lg">
                Agenda una consulta <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
