import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { FadeIn } from "@/components/animate/fade-in";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPostDate, type BlogPost } from "@/lib/blog";
import { ogImages, SITE_URL } from "@/lib/seo";
import { breadcrumbList } from "@/lib/structured-data";

/** Textos de cada blog: `/blog` (es-ES) y `/us/blog` (en-US) comparten plantilla. */
export type BlogCopy = {
  basePath: "/blog" | "/us/blog";
  lang: "es" | "en";
  locale: "es-ES" | "en-US";
  ogLocale: "es_ES" | "en_US";
  /** Migas de pan antes de «Blog»: la campaña de EE. UU. añade su hub. */
  crumbs: { name: string; url: string }[];
  blogName: string;
  indexTitle: string;
  indexDescription: string;
  heading: [string, string];
  intro: string;
  agendaHref: string;
  t: {
    read: string;
    back: string;
    author: string;
    minRead: string;
    summary: string;
    related: string;
    more: string;
    caseTitle: string;
    caseText: string;
    ctaTitle: string;
    ctaText: string;
    cta: string;
  };
};

export function blogIndexMetadata(copy: BlogCopy): Metadata {
  const url = `${SITE_URL}${copy.basePath}`;
  const title = `${copy.indexTitle} | DEVRUBY`;
  return {
    title: copy.lang === "es" ? "Blog" : "Blog: Software & Automation Guides",
    description: copy.indexDescription,
    openGraph: { title, description: copy.indexDescription, url, type: "website", locale: copy.ogLocale, images: ogImages },
    twitter: { card: "summary_large_image", title, description: copy.indexDescription, images: ogImages.map((i) => i.url) },
    alternates: { canonical: url },
  };
}

export function blogPostMetadata(copy: BlogCopy, post: BlogPost): Metadata {
  const url = `${SITE_URL}${copy.basePath}/${post.slug}`;
  return {
    title: post.seoTitle ?? post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      locale: copy.ogLocale,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: ["DEVRUBY LLC"],
      images: ogImages,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: ogImages.map((i) => i.url) },
  };
}

const sortByDate = (posts: BlogPost[]) => [...posts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

export function BlogIndexView({ copy, posts }: { copy: BlogCopy; posts: BlogPost[] }) {
  const blogUrl = `${SITE_URL}${copy.basePath}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${blogUrl}#blog`,
        url: blogUrl,
        name: copy.blogName,
        description: copy.indexDescription,
        inLanguage: copy.lang,
        publisher: { "@id": `${SITE_URL}/#organization` },
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          url: `${blogUrl}/${post.slug}`,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
        })),
      },
      breadcrumbList([...copy.crumbs, { name: "Blog", url: blogUrl }]),
    ],
  };

  return (
    <main lang={copy.locale} className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />

      <section className="relative pt-16 pb-12 md:pt-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 2xl:max-w-[88rem]">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-crimson-dark">Blog</p>
            <h1 className="mt-4 font-display text-4xl tracking-tight text-ivory md:text-6xl">
              {copy.heading[0]} <span className="gradient-text">{copy.heading[1]}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ivory-dim">{copy.intro}</p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 sm:px-6 md:grid-cols-2 lg:px-8 2xl:max-w-[88rem]">
          {sortByDate(posts).map((post, index) => (
            <FadeIn key={post.slug} delay={index * 0.05}>
              <Card className="flex h-full flex-col p-8 hover:shadow-card-hover">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-crimson-dark">{post.eyebrow}</p>
                <h2 className="mt-3 font-display text-2xl leading-snug text-ivory">
                  <Link href={`${copy.basePath}/${post.slug}`} className="transition-colors hover:text-crimson">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-4 flex-1 text-ivory-dim">{post.description}</p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-ivory-muted">
                  <span className="flex items-center gap-2">
                    <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt, copy.locale)}</time>
                    <span aria-hidden="true">·</span>
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    {post.readingMinutes} min
                  </span>
                  <Link href={`${copy.basePath}/${post.slug}`} className="flex items-center gap-1 font-semibold text-crimson-dark hover:text-crimson">
                    {copy.t.read} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="font-display text-3xl text-ivory md:text-4xl">{copy.t.caseTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-ivory-dim">{copy.t.caseText}</p>
          <div className="mt-8 flex justify-center">
            <Link href={copy.agendaHref} data-track="agenda">
              <Button as="span" size="lg">
                {copy.t.cta} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export function BlogPostView({ copy, post, posts }: { copy: BlogCopy; post: BlogPost; posts: BlogPost[] }) {
  const blogUrl = `${SITE_URL}${copy.basePath}`;
  const url = `${blogUrl}/${post.slug}`;
  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
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
        inLanguage: copy.lang,
        image: `${SITE_URL}${ogImages[0].url}`,
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${blogUrl}#blog` },
      },
      breadcrumbList([...copy.crumbs, { name: "Blog", url: blogUrl }, { name: post.title, url }]),
    ],
  };

  return (
    <main lang={copy.locale} className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />

      <article className="pt-12 pb-24 md:pt-20">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-6 lg:px-8">
          <FadeIn>
            <Link href={copy.basePath} className="inline-flex items-center gap-2 text-sm text-ivory-muted transition-colors hover:text-ivory">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {copy.t.back}
            </Link>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-crimson-dark">{post.eyebrow}</p>
            <h1 className="mt-4 font-display text-3xl leading-tight tracking-tight text-ivory md:text-5xl">{post.title}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ivory-muted">
              <span>{copy.t.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt, copy.locale)}</time>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" aria-hidden="true" /> {post.readingMinutes} {copy.t.minRead}
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
              <h2 className="font-display text-xl text-ivory">{copy.t.summary}</h2>
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
              <h2 className="font-display text-xl text-ivory">{copy.t.related}</h2>
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
              <h2 className="font-display text-2xl text-ivory md:text-3xl">{copy.t.ctaTitle}</h2>
              <p className="mx-auto mt-4 max-w-xl text-ivory-dim">{copy.t.ctaText}</p>
              <div className="mt-8 flex justify-center">
                <Link href={copy.agendaHref} data-track="agenda">
                  <Button as="span" size="lg">
                    {copy.t.cta} <ArrowRight className="h-4 w-4" />
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
            <h2 className="font-display text-2xl text-ivory">{copy.t.more}</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {others.map((other) => (
                <Card key={other.slug} className="p-6 hover:shadow-card-hover">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-crimson-dark">{other.eyebrow}</p>
                  <h3 className="mt-2 font-display text-xl text-ivory">
                    <Link href={`${copy.basePath}/${other.slug}`} className="transition-colors hover:text-crimson">
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
