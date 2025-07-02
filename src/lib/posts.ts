import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

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
      dateStr = matterResult.data.date.slice(0, 7); // Assuming string is already YYYY-MM-DD...
    }

    // Generate slug from title and formatted date
    const slug = `${matterResult.data.title.toLowerCase().replace(/\s+/g, '-')}-${dateStr}`

    // Combine the data with the id and slug
    return {
      id,
      slug,
      ...matterResult.data,
      date: matterResult.data.date instanceof Date ? matterResult.data.date.toISOString() : matterResult.data.date, // Keep original date for display/sorting
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
  const fileNames = fs.readdirSync(postsDirectory)
  let foundPost: any = null; // To store all data of the found post

  for (const fileName of fileNames) {
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    // Ensure date is a string and format it to YYYY-MM for comparison
    let dateStr: string;
    if (matterResult.data.date instanceof Date) {
      dateStr = matterResult.data.date.toISOString().slice(0, 7); // YYYY-MM
    } else {
      dateStr = matterResult.data.date.slice(0, 7); // Assuming string is already YYYY-MM-DD...
    }
    const currentSlug = `${matterResult.data.title.toLowerCase().replace(/\s+/g, '-')}-${dateStr}`

    if (currentSlug === slug) {
      const id = fileName.replace(/\.md$/, '')
      // Use remark to convert markdown into HTML string
      const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
      const contentHtml = processedContent.toString()

      // Ensure original date is stringified for returning
      const originalDate = matterResult.data.date instanceof Date ? matterResult.data.date.toISOString() : matterResult.data.date;

      foundPost = {
        id,
        contentHtml,
        slug, // The slug from the URL
        ...matterResult.data,
        date: originalDate,
      }
      break; // Found the post, exit loop
    }
  }

  if (!foundPost) {
    throw new Error(`Post with slug "${slug}" not found`)
  }

  return foundPost;
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames.map(fileName => {
    // Read markdown file as string to get metadata
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    // Ensure date is a string and format it to YYYY-MM for slug generation
    let dateStr: string;
    if (matterResult.data.date instanceof Date) {
      dateStr = matterResult.data.date.toISOString().slice(0, 7); // YYYY-MM
    } else {
      dateStr = matterResult.data.date.slice(0, 7); // Assuming string is already YYYY-MM-DD...
    }

    // Generate slug from title and date from metadata
    const slug = `${matterResult.data.title.toLowerCase().replace(/\s+/g, '-')}-${dateStr}`

    return {
      params: {
        slug: slug,
      },
    }
  })
}
