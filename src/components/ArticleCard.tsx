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
                    <p className="text-gray-600 leading-relaxed">{article.description}</p>
                    {article.date && <p className="text-sm text-gray-400 mt-3">{article.date}</p>}
                </Link>
            </article>



        </div>
    )
}