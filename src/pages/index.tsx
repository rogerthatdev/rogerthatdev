import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getSortedPostsData } from '@/lib/posts'
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

type PostData = {
  id: string
  slug: string
  title: string
  date: string
  subtitle: string
}

export default function Home({ allPostsData }: { allPostsData: PostData[] }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            TechBlog
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Button variant="ghost" asChild>
                  <Link href="/about">About</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild>
                  <Link href="/contact">Contact</Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Latest Articles</h1>
        <ul className="space-y-4">
          {allPostsData.map(({ id, slug, date, title, subtitle }) => (
            <li key={id} className="border-b pb-4">
              <h2 className="text-2xl font-semibold mb-2">{title}</h2>
              <p className="text-muted-foreground mb-2">{subtitle}</p>
              <p className="text-sm text-muted-foreground mb-2">{date}</p>
              <Button variant="link" asChild>
                <Link href={`/posts/${slug}`}>Read more</Link>
              </Button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
