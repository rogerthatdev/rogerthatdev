import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-gray-50 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between absolute top-1/2 left-4 right-4 transform -translate-y-1/2 z-10">
              <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white">
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
            <div className="aspect-[16/9] flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-light text-gray-400 mb-4">{"< IMAGE >"}</div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Welcome to my tech blog where I share insights on cloud computing, AI, and modern development
                  practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-16">
          {/* Section A */}
          <section>
            <h2 className="text-3xl font-light text-black mb-8 border-b border-gray-200 pb-4">Section A</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                This section covers the latest trends in cloud computing and development practices. From serverless
                architectures to containerization, we explore the tools and methodologies that are shaping the future of
                software development.
              </p>

              <h3 className="text-xl font-medium text-black mt-8 mb-4 border-l-4 border-gray-300 pl-4">
                Sub-section 1
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Deep dive into Google Cloud Platform services and how they can accelerate your development workflow.
                Learn about best practices for deploying scalable applications and managing cloud infrastructure
                efficiently.
              </p>
            </div>
          </section>

          {/* Section B */}
          <section>
            <h2 className="text-3xl font-light text-black mb-8 border-b border-gray-200 pb-4">Section B</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                Artificial Intelligence and Machine Learning are transforming how we build and interact with software.
                This section explores practical applications and implementation strategies for modern AI solutions.
              </p>

              <h3 className="text-xl font-medium text-black mt-8 mb-4 border-l-4 border-gray-300 pl-4">
                Sub-section 1
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Understanding the fundamentals of generative AI and how to integrate these technologies into your
                applications. From prompt engineering to model fine-tuning, we cover the essential concepts every
                developer should know.
              </p>

              <h3 className="text-xl font-medium text-black mt-8 mb-4 border-l-4 border-gray-300 pl-4">
                Sub-section 2
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Practical examples and case studies demonstrating real-world AI implementations. Learn from successful
                projects and understand common pitfalls to avoid when building AI-powered applications.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
