import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getAllPostIds, getPostData } from '@/lib/posts'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Ensure params and params.slug exist and are strings
  if (!params || typeof params.slug !== 'string') {
    return {
      notFound: true, // Or handle as an error appropriately
    }
  }
  const postData = await getPostData(params.slug)
  return {
    props: {
      postData,
    },
  }
}

type PostData = {
  title: string
  date: string
  contentHtml: string
}

export default function Post({ postData }: { postData: PostData }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{postData.title}</title>
      </Head>
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            TechBlog
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Button variant="ghost" asChild>
                  <Link href="/blog">Back to Articles</Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <article>
          <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
          <div className="text-muted-foreground mb-8">{postData.date}</div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </main>
    </div>
  )
}
