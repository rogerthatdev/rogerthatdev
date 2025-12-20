import { getPostData, getAllPostSlugs } from '@/lib/posts'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Post } from '@/types/article'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import 'highlight.js/styles/github-dark.css'

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostSlugs()
    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = await getPostData(params?.slug as string)
    const mdxSource = await serialize(postData.content, {
        mdxOptions: {
            rehypePlugins: [rehypeHighlight, rehypeSlug],
        },
    })
    return {
        props: {
            postData,
            mdxSource,
        },
    }
}

export default function PostPage({ postData, mdxSource }: { postData: Post, mdxSource: MDXRemoteSerializeResult }) {
    return (
        <article className="prose prose-gray max-w-none">
            <h1>{postData.title}</h1>
            <p className="text-gray-600">{postData.subtitle}</p>
            <p className="text-sm text-gray-400">{postData.date.split('T')[0]}</p>
            <div className="flex space-x-2">
                {postData.tags.map(tag => (
                    <span key={tag} className="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                        {tag}
                    </span>
                ))}
            </div>
            <MDXRemote {...mdxSource} />
        </article>
    )
}
