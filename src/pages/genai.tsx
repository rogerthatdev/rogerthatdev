import { CategoryPage } from "@/components/category-page"

const genaiArticles = [
  {
    id: "1",
    title: "Introduction to Large Language Models for Developers",
    description:
      "Understanding the fundamentals of LLMs, how they work, and practical considerations for integrating them into your applications.",
    slug: "genai/intro-to-llms-for-developers",
    date: "December 12, 2023",
  },
  {
    id: "2",
    title: "Prompt Engineering Best Practices",
    description:
      "Master the art of crafting effective prompts to get better results from AI models, with real-world examples and techniques.",
    slug: "genai/prompt-engineering-best-practices",
    date: "December 8, 2023",
  },
  {
    id: "3",
    title: "Building AI-Powered Applications with the Vercel AI SDK",
    description:
      "Step-by-step guide to integrating AI capabilities into your Next.js applications using the Vercel AI SDK and various model providers.",
    slug: "genai/ai-apps-vercel-sdk",
    date: "December 3, 2023",
  },
]

export default function GenAIPage() {
  return (
    <CategoryPage
      title="GenAI"
      description="Explore the world of generative artificial intelligence from a developer's perspective. Learn how to build, integrate, and deploy AI-powered features in modern applications."
      articles={genaiArticles}
    />
  )
}
