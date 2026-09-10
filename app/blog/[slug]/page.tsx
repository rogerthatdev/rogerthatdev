import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";
import { estimateReadMinutes, formatIsoDate } from "@/lib/format";

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

function BackToBlogLink() {
  return (
    <Link
      href="/blog"
      className="inline-flex items-center gap-2 font-mono text-xs text-slate-500 hover:text-slate-900"
    >
      <span aria-hidden>←</span> go back
    </Link>
  );
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader active="blog" />

      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
        <p className="font-mono text-xs text-slate-500">
          {formatIsoDate(post.date)} · {estimateReadMinutes(post.raw)} min read
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">{post.title}</h1>
        {post.tags.length > 0 && (
          <p className="mt-3 flex flex-wrap gap-3 font-mono text-xs text-slate-500">
            {post.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </p>
        )}

        <div className="mt-6">
          <BackToBlogLink />
        </div>

        <div
          className="prose prose-slate mt-10 max-w-none border-t border-slate-200 pt-10 text-sm leading-relaxed text-slate-700 prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-slate-900"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <div className="mt-10 border-t border-slate-200 pt-6">
          <BackToBlogLink />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
