import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FadeIn } from "@/components/animate/fade-in";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { blogPosts, blogSlugs, formatPostDate, getBlogPost, type BlogPost } from "@/lib/blog";
import { ogImages, SITE_URL } from "@/lib/seo";
import { breadcrumbList } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      locale: "es_ES",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: ["DEVRUBY LLC"],
      images: ogImages,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: ogImages.map((i) => i.url) },
  };
}

function ArticleSchema({ post }: { post: BlogPost }) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        url,
        mainEntityOfPage: url,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        inLanguage: "es",
        image: `${SITE_URL}${ogImages[0].url}`,
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${SITE_URL}/blog#blog` },
      },
      breadcrumbList([
        { name: "Inicio", url: SITE_URL },
        { name: "Blog", url: `${SITE_URL}/blog` },
        { name: post.title, url },
      ]),
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default async function BlogPostRoute({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const others = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main className="relative">
      <ArticleSchema post={post} />
      <Navbar />

      <article className="pt-12 pb-24 md:pt-20">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-6 lg:px-8">
          <FadeIn>
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-ivory-muted transition-colors hover:text-ivory">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver al blog
            </Link>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-crimson-dark">{post.eyebrow}</p>
            <h1 className="mt-4 font-display text-3xl leading-tight tracking-tight text-ivory md:text-5xl">{post.title}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ivory-muted">
              <span>Equipo DEVRUBY</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" aria-hidden="true" /> {post.readingMinutes} min de lectura
              </span>
            </div>
            <p className="mt-8 text-lg leading-relaxed text-ivory-dim">{post.intro}</p>
          </FadeIn>

          {post.sections.map((section) => {
            const ListTag = section.ordered ? "ol" : "ul";
            return (
              <FadeIn key={section.heading}>
                <section className="mt-12">
                  <h2 className="font-display text-2xl text-ivory md:text-3xl">{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="mt-4 leading-relaxed text-ivory-dim">
                      {paragraph}
                    </p>
                  ))}
                  {section.list && (
                    <ListTag className={`mt-4 grid gap-3 pl-5 text-ivory-dim ${section.ordered ? "list-decimal" : "list-disc"}`}>
                      {section.list.map((item) => (
                        <li key={item.slice(0, 40)} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ListTag>
                  )}
                </section>
              </FadeIn>
            );
          })}

          <FadeIn>
            <Card className="mt-14 p-8">
              <h2 className="font-display text-xl text-ivory">En resumen</h2>
              <ul className="mt-4 grid gap-3">
                {post.takeaways.map((item) => (
                  <li key={item} className="flex gap-3 text-ivory-dim">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-crimson" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </FadeIn>

          <FadeIn>
            <section className="mt-12">
              <h2 className="font-display text-xl text-ivory">Relacionado</h2>
              <ul className="mt-4 grid gap-2">
                {post.related.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-flex items-center gap-2 text-crimson-dark hover:text-crimson">
                      {link.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </FadeIn>

          <FadeIn>
            <div className="mt-14 rounded-3xl border border-black/8 bg-white/70 p-8 text-center shadow-card md:p-12">
              <h2 className="font-display text-2xl text-ivory md:text-3xl">¿Quieres revisar tu caso con contexto?</h2>
              <p className="mx-auto mt-4 max-w-xl text-ivory-dim">
                Cuéntanos el proceso, los sistemas implicados y el resultado que necesitas. Prepararemos la
                conversación para aprovechar los 30 minutos.
              </p>
              <div className="mt-8 flex justify-center">
                <Link href="/agenda" data-track="agenda">
                  <Button size="lg">
                    Agenda una consulta <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </article>

      {others.length > 0 && (
        <section className="pb-24">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 2xl:max-w-[88rem]">
            <h2 className="font-display text-2xl text-ivory">Más artículos</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {others.map((other) => (
                <Card key={other.slug} className="p-6 hover:shadow-card-hover">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-crimson-dark">{other.eyebrow}</p>
                  <h3 className="mt-2 font-display text-xl text-ivory">
                    <Link href={`/blog/${other.slug}`} className="transition-colors hover:text-crimson">
                      {other.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm text-ivory-dim">{other.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
