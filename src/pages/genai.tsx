import { TopicLayout } from "@/components/TopicLayout"

const genaiArticles = [
    {
        id: "genai-1",
        title: "GenAI 1",
        description: "GenAI 1 description",
        slug: "genai-1",
        date: "2025-01-01",
    },
    {
        id: "genai-2",
        title: "GenAI 2",
        description: "GenAI 2 description",
        slug: "genai-2",
        date: "2025-01-02",
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