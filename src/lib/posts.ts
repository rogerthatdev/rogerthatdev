import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface Post {
  slug: string
  title: string
  subtitle?: string
  date: string
  author?: string
  tags: string[]
  content: string
  excerpt?: string
}

const postsDirectory = path.join(process.cwd(), "posts")

export function getAllPosts(): Post[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"))
      .map((fileName) => {
        const slug = fileName.replace(/\.(md|mdx)$/, "")
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        // Extract excerpt from content (everything before {/*more*/})
        const excerptMatch = content.match(/^([\s\S]*?)\{\/\*more\*\/\}/)
        const excerpt = excerptMatch ? excerptMatch[1].trim() : content.slice(0, 200) + "..."

        return {
          slug,
          title: data.title || "",
          subtitle: data.subtitle || "",
          date: data.date || "",
          author: data.author || "",
          tags: data.tags || [],
          content,
          excerpt,
        }
      })

    // Sort posts by date (newest first)
    return allPostsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error("Error reading posts directory:", error)
    return []
  }
}

export function getPostsByTag(tag: string): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter((post) => post.tags.some((postTag) => postTag.toLowerCase() === tag.toLowerCase()))
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const allPosts = getAllPosts()
    return allPosts.find((post) => post.slug === slug) || null
  } catch (error) {
    console.error("Error getting post by slug:", error)
    return null
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
