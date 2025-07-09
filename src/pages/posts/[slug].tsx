import { notFound } from "next/navigation"
import Link from "next/link"
import { NavBar } from "@/components/navbar"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { getPostBySlug, getAllPosts, formatDate } from "@/lib/posts"
import { ArrowLeftIcon } from "@radix-ui/react-icons"

interface PostPageProps {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <NavBar activePage="home" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <article>
          {/* Post Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-black mb-4">{post.title}</h1>
            {post.subtitle && <p className="text-xl text-gray-600 mb-4">{post.subtitle}</p>}
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              {post.author && <span>by {post.author}</span>}
            </div>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Post Content */}
          <div className="border-t border-gray-200 pt-8">
            <MarkdownRenderer content={post.content} />
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>Footer 2023</p>
            <p className="mt-2 text-sm">© 2023 roger that dev. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
