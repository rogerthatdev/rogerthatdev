import Link from "next/link"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { Article } from "@/types/article"
import { ArticleCard } from "@/components/ArticleCard"


interface TopicPageProps {
    title: string
    description: string
    articles: Article[]
}

export function TopicLayout({ title, description, articles }: TopicPageProps) {
    return (
        <>
            {/* Content */}
            {/* TODO: Update so that it redirects to the active navbar page */}
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
                        <ArticleCard article={article} />
                    ))}
                </div>

                {/* Empty State */}
                {articles.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No articles published yet. Check back soon!</p>
                    </div>
                )}
            </main>
        </>
    )
}