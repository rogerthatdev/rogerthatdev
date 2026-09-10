import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getAllPosts } from "@/lib/posts";
import { estimateReadMinutes, formatIsoDate } from "@/lib/format";

export const metadata = {
  title: "Blog — rogerthat.dev",
};

export default async function BlogArchive() {
  const posts = await getAllPosts();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="blog" />

      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <h1 className="mb-8 font-mono text-xs uppercase tracking-wide text-slate-500">
          All Essays ({posts.length})
        </h1>

        {posts.length === 0 ? (
          <p className="border-t border-slate-200 py-8 text-sm text-slate-500">
            No published posts yet.
          </p>
        ) : (
          <ol className="divide-y divide-slate-200 border-t border-slate-200">
            {posts.map((post, index) => (
              <li key={post.slug} className="py-6">
                <p className="font-mono text-xs text-slate-500">
                  {formatIsoDate(post.date)} ·{" "}
                  {String(index).padStart(2, "0")} ·{" "}
                  {estimateReadMinutes(post.raw)} min read
                </p>
                <h2 className="mt-2 text-lg font-bold text-slate-900">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                {post.excerpt && (
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {post.excerpt}
                  </p>
                )}
                {post.tags.length > 0 && (
                  <p className="mt-3 flex flex-wrap gap-3 font-mono text-xs text-slate-500">
                    {post.tags.map((tag) => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </p>
                )}
              </li>
            ))}
          </ol>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
