import { TopicLayout } from "@/components/TopicLayout"

import { Article } from "@/types/article"

const genaiArticles: Article[] = [
    {
        id: "genai-1",
        title: "GenAI 1",
        subtitle: "GenAI 1 description",
        slug: "genai-1",
        date: "2025-01-01",
        tags: ["genai"],
        author: "test"
    },
    {
        id: "genai-2",
        title: "GenAI 2",
        subtitle: "GenAI 2 description",
        slug: "genai-2",
        date: "2025-01-02",
        tags: ["genai"],
        author: "test"
    }
]

function GenAIPage() {
    return (
        <div>
            <TopicLayout
                title="AI things"
                description="Generative AI things. Agents, LLMs, etc."
                articles={genaiArticles}
            />
        </div>
    )
}

GenAIPage.activePage = "genai"

export default GenAIPage