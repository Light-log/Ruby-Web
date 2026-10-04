import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostView, blogPostMetadata } from "@/components/sections/blog-views";
import { getUSBlogPost, usBlogCopy, usBlogPosts, usBlogSlugs } from "@/lib/us-blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return usBlogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getUSBlogPost((await params).slug);
  return post ? blogPostMetadata(usBlogCopy, post) : {};
}

export default async function USBlogPostRoute({ params }: Props) {
  const post = getUSBlogPost((await params).slug);
  if (!post) notFound();
  return <BlogPostView copy={usBlogCopy} post={post} posts={usBlogPosts} />;
}
