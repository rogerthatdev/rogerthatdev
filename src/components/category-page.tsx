import Link from "next/link"
import { NavBar } from "@/components/navbar"
import { ArrowLeftIcon } from "@radix-ui/react-icons"

interface Article {
  id: string
  title: string
  description: string
  slug: string
  date?: string
}

interface CategoryPageProps {
  title: string
  description: string
  articles: Article[]
}

export function CategoryPage({ title, description, articles }: CategoryPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <NavBar activePage={title === "GCP for devs" ? "gcp-for-devs" : "genai"} />

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-light text-black mb-6 border-b border-gray-200 pb-4">{title}</h1>
          <p className="text-gray-700 leading-relaxed text-lg">{description}</p>
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
            >
              <Link href={`/${article.slug}`} className="block group">
                <h2 className="text-xl font-medium text-black mb-3 group-hover:text-gray-600 transition-colors">
                  {article.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">{article.description}</p>
                {article.date && <p className="text-sm text-gray-400 mt-3">{article.date}</p>}
              </Link>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles published yet. Check back soon!</p>
          </div>
        )}
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
