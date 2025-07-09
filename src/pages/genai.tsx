import { CategoryPage } from "@/components/category-page"

// Static articles for now - these will be replaced by dynamic posts once the posts directory is set up
const genaiArticles = [
  {
    id: "intro-to-llms",
    title: "Introduction to Large Language Models for Developers",
    description:
      "Understanding the fundamentals of LLMs, how they work, and practical considerations for integrating them into your applications.",
    slug: "posts/intro-to-llms",
    date: "December 12, 2023",
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering Best Practices",
    description:
      "Master the art of crafting effective prompts to get better results from AI models, with real-world examples and techniques.",
    slug: "posts/prompt-engineering",
    date: "December 8, 2023",
  },
  {
    id: "ai-apps-vercel-sdk",
    title: "Building AI-Powered Applications with the Vercel AI SDK",
    description:
      "Step-by-step guide to integrating AI capabilities into your Next.js applications using the Vercel AI SDK and various model providers.",
    slug: "posts/ai-apps-vercel-sdk",
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
