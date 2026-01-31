import { TopicLayout } from "@/components/TopicLayout"

import { getPostsByTags } from '@/lib/posts'
import { PAGE_TAGS } from '@/lib/page-config'
import { Article } from '@/types/article'

export async function getStaticProps() {
    const filteredPosts = getPostsByTags(PAGE_TAGS['genai'])

    return {
        props: {
            articles: filteredPosts,
        },
    }
}

function GenAIPage({ articles }: { articles: Article[] }) {
    return (
        <div>
            <TopicLayout
                title="AI"
                description="Generative AI things. Agents, LLMs, etc."
                articles={articles}
            />
        </div>
    )
}

GenAIPage.activePage = "genai"

export default GenAIPage