import { BlogIndexView, blogIndexMetadata } from "@/components/sections/blog-views";
import { blogCopy, blogPosts } from "@/lib/blog";

export const metadata = blogIndexMetadata(blogCopy);

export default function BlogIndexPage() {
  return <BlogIndexView copy={blogCopy} posts={blogPosts} />;
}
