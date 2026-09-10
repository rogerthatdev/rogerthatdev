import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getAllPosts } from "@/lib/posts";
import { getRecentMicroblogs } from "@/lib/microblog";
import { estimateReadMinutes, formatIsoDate, formatRelativeTime } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 60;

export default async function Home() {
  const [allPosts, notes] = await Promise.all([
    getAllPosts(),
    getRecentMicroblogs(8),
  ]);
  const recentPosts = allPosts.slice(0, 5);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="home" />

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12">
        {/* Hero & Profile */}
        <section className="mb-16 flex flex-col gap-6 border-b border-slate-200 pb-12 sm:flex-row sm:items-start">
          <Image
            src="/avatar.png"
            alt={siteConfig.name}
            width={80}
            height={80}
            priority
            className="h-20 w-20 flex-shrink-0 rounded-full border border-slate-200 object-cover"
          />
          <div>
            <div className="flex flex-wrap items-baseline gap-3">
              <h1 className="text-2xl font-bold text-slate-900">
                {siteConfig.name}
              </h1>
              <span className="font-mono text-xs text-slate-500">
                {siteConfig.version}
              </span>
            </div>
            <p className="mt-1 font-mono text-xs text-slate-500">
              {siteConfig.role} · {siteConfig.email}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
              {siteConfig.bio}
            </p>
          </div>
        </section>

        {/* Main content grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
          {/* Recent writing */}
          <section>
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="font-mono text-xs uppercase tracking-wide text-slate-500">
                Recent Writing ({allPosts.length})
              </h2>
              <Link
                href="/blog"
                className="font-mono text-xs text-slate-500 hover:text-slate-900"
              >
                Explore all essays &amp; articles -&gt;
              </Link>
            </div>

            {recentPosts.length === 0 ? (
              <p className="border-t border-slate-200 py-8 text-sm text-slate-500">
                No published posts yet.
              </p>
            ) : (
              <ol className="divide-y divide-slate-200 border-t border-slate-200">
                {recentPosts.map((post, index) => (
                  <li key={post.slug} className="py-6">
                    <p className="font-mono text-xs text-slate-500">
                      {formatIsoDate(post.date)} ·{" "}
                      {String(index).padStart(2, "0")} ·{" "}
                      {estimateReadMinutes(post.raw)} min read
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-slate-900">
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h3>
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
          </section>

          {/* Microblog / status notes */}
          <aside>
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="font-mono text-xs uppercase tracking-wide text-slate-500">
                Status &amp; Notes
              </h2>
              <span className="font-mono text-[10px] text-slate-400">
                 // 
              </span>
            </div>

            {notes.length === 0 ? (
              <p className="border-t border-slate-200 py-8 text-sm text-slate-500">
                No notes yet.
              </p>
            ) : (
              <ol className="divide-y divide-slate-200 border-t border-slate-200">
                {notes.map((note) => (
                  <li key={note.id} className="py-4">
                    <p className="font-mono text-xs text-slate-500">
                      {formatRelativeTime(note.createdAt)}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-700">
                      {note.text}
                    </p>
                    {note.category && (
                      <span className="mt-2 inline-block rounded border border-slate-200 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-slate-500">
                        {note.category}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            )}

            <a
              href="/feed.xml"
              className="mt-6 inline-block font-mono text-xs text-slate-500 hover:text-slate-900"
            >
              RSS feed for micro-notes -&gt;
            </a>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
