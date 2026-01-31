import Link from "next/link"
import { Article } from "@/types/article"

export function ArticleCard({ article }: { article: Article }) {
    return (
        <div>
            <article
                key={article.id}
                className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
            >
                <Link href={`/${article.slug}`} className="block group">
                    <h2 className="text-xl font-medium text-black mb-3 group-hover:text-gray-600 transition-colors">
                        {article.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">{article.subtitle}</p>
                    {article.date && <p className="text-sm text-gray-400 mt-3">{article.date.split('T')[0]}</p>}
                    <div className="flex flex-wrap mt-3">
                        {article.tags.map(tag => (
                            <span key={tag} className="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                </Link>
            </article>
        </div>
    )
}