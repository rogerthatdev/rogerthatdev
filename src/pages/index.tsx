import { getSortedPostsData } from '@/lib/posts'
import { Article } from '@/types/article'
import { ArticleCard } from '@/components/ArticleCard'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

export default function HomePage({ allPostsData }: { allPostsData: Article[] }) {
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
        <div className="grid gap-8">
          {allPostsData.map((post) => (
            <ArticleCard key={post.id} article={post} />
          ))}
        </div>
      </main>
    </>
  )
}