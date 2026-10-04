import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostView, blogPostMetadata } from "@/components/sections/blog-views";
import { blogCopy, blogPosts, blogSlugs, getBlogPost } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost((await params).slug);
  return post ? blogPostMetadata(blogCopy, post) : {};
}

export default async function BlogPostRoute({ params }: Props) {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();
  return <BlogPostView copy={blogCopy} post={post} posts={blogPosts} />;
}
