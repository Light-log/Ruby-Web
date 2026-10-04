import { BlogIndexView, blogIndexMetadata } from "@/components/sections/blog-views";
import { usBlogCopy, usBlogPosts } from "@/lib/us-blog";

export const metadata = blogIndexMetadata(usBlogCopy);

export default function USBlogIndexPage() {
  return <BlogIndexView copy={usBlogCopy} posts={usBlogPosts} />;
}
