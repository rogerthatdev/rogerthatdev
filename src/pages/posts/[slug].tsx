import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
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
  if (!params || typeof params.slug !== 'string') {
    return {
      notFound: true,
    }
  }
  const postData = await getPostData(params.slug) // postData will now include mdxSource
  return {
    props: {
      postData,
    },
  }
}

type PostDataType = {
  title: string
  date: string
  mdxSource: MDXRemoteSerializeResult // Updated to use MDXRemoteSerializeResult
  // Include other frontmatter properties if needed, e.g., author, tags
  [key: string]: any // Allows for additional frontmatter fields
}

export default function Post({ postData }: { postData: PostDataType }) {
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
                  {/* Assuming '/blog' is the correct path back to the list of articles */}
                  <Link href="/blog">Back to Articles</Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-[#e3e7ee] p-6 mx-4 sm:mx-8 rounded-lg shadow-md">
          <article className="prose lg:prose-xl dark:prose-invert max-w-none"> {/* Added prose classes for styling */}
            <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
            <div className="text-muted-foreground mb-8">{new Date(postData.date).toLocaleDateString()}</div>
            <MDXRemote {...postData.mdxSource} /> {/* Render MDX content */}
          </article>
        </div>
      </main>
    </div>
  )
}
