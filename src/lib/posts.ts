import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
// Import any remark/rehype plugins if you decide to use them
// import remarkGfm from 'remark-gfm'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts, looking for .mdx
  const fileNames = fs.readdirSync(postsDirectory).filter(fn => fn.endsWith('.mdx'))
  const allPostsData = fileNames.map(fileName => {
    // Remove ".mdx" from file name to get id
    const id = fileName.replace(/\.mdx$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Ensure date is a string and format it to YYYY-MM
    let dateStr: string;
    if (matterResult.data.date instanceof Date) {
      dateStr = matterResult.data.date.toISOString().slice(0, 7); // YYYY-MM
    } else {
      // Ensure date is treated as a string if it's not a Date object
      dateStr = String(matterResult.data.date).slice(0, 7);
    }

    // Generate slug from title and formatted date
    const slug = `${String(matterResult.data.title).toLowerCase().replace(/\s+/g, '-')}-${dateStr}`

    // Combine the data with the id and slug
    return {
      id,
      slug,
      ...matterResult.data,
      date: matterResult.data.date instanceof Date ? matterResult.data.date.toISOString() : String(matterResult.data.date), // Keep original date for display/sorting
    } as { id: string; slug: string; date: string; [key: string]: any }
  })
  // Sort posts by date
  return allPostsData.sort((a: { date: string }, b: { date: string }) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPostData(slug: string) {
  const fileNames = fs.readdirSync(postsDirectory).filter(fn => fn.endsWith('.mdx'))
  let foundPostData: any = null;

  for (const fileName of fileNames) {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    let dateStr: string;
    if (matterResult.data.date instanceof Date) {
      dateStr = matterResult.data.date.toISOString().slice(0, 7); // YYYY-MM
    } else {
      dateStr = String(matterResult.data.date).slice(0, 7);
    }
    const currentSlug = `${String(matterResult.data.title).toLowerCase().replace(/\s+/g, '-')}-${dateStr}`

    if (currentSlug === slug) {
      const id = fileName.replace(/\.mdx$/, '')
      // Use next-mdx-remote to serialize the MDX content
      const mdxSource = await serialize(matterResult.content, {
        // Optionally pass remark/rehype plugins
        // mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [] },
        parseFrontmatter: false, // Frontmatter is already parsed by gray-matter
      })

      const originalDate = matterResult.data.date instanceof Date ? matterResult.data.date.toISOString() : String(matterResult.data.date);

      foundPostData = {
        id,
        mdxSource, // This is the serialized MDX content
        slug,
        ...matterResult.data,
        date: originalDate,
      }
      break;
    }
  }

  if (!foundPostData) {
    throw new Error(`Post with slug "${slug}" not found`)
  }

  return foundPostData;
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory).filter(fn => fn.endsWith('.mdx'))

  return fileNames.map(fileName => {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    let dateStr: string;
    if (matterResult.data.date instanceof Date) {
      dateStr = matterResult.data.date.toISOString().slice(0, 7); // YYYY-MM
    } else {
      dateStr = String(matterResult.data.date).slice(0, 7);
    }

    const slug = `${String(matterResult.data.title).toLowerCase().replace(/\s+/g, '-')}-${dateStr}`

    return {
      params: {
        slug: slug,
      },
    }
  })
}
