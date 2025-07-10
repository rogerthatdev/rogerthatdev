export default function HomePage() {
  return (
    <>
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center border border-gray-300 rounded-lg p-6">
          <p className="text-gray-600 max-w-2xl mx-auto">
            Welcome to my tech blog where I share insights on development, AI, and other tech things.
          </p>
        </div>
      </section>

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