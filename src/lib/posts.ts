import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post } from '@/types/article'

const postsDirectory = path.join(process.cwd(), 'posts')

const slugFrom = (s: string) =>
  s.toLowerCase().trim()
   .replace(/[^a-z0-9\s-]/g, "")
   .replace(/\s+/g, "-")
   .replace(/-+/g, "-")
   .replace(/^-+|-+$/g, "");

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".mdx" from file name to get id
    const id = fileName.replace(/\.mdx$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    const post: Post = {
        id,
        title: matterResult.data.title,
        subtitle: matterResult.data.subtitle,
        date: matterResult.data.date.toISOString(),
        tags: matterResult.data.tags,
        author: matterResult.data.author,
        slug: slugFrom(matterResult.data.title),
        content: matterResult.content,
    }

    // Combine the data with the id
    return post
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostSlugs() {
    const posts = getSortedPostsData()
    return posts.map(post => {
        return {
            params: {
                slug: post.slug
            }
        }
    })
}

export async function getPostData(slug: string): Promise<Post> {
    const posts = getSortedPostsData()
    const post = posts.find(p => p.slug === slug)
    if (!post) {
        throw new Error(`Post with slug ${slug} not found`)
    }
    return post
}
