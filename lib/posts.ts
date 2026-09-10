import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { parse as parseToml } from "smol-toml";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface Post {
  slug: string;
  title: string;
  date: Date | null;
  tags: string[];
  draft: boolean;
  excerpt: string;
  contentHtml: string;
  raw: string;
}

interface Frontmatter {
  title?: string;
  date?: string;
  draft?: boolean;
  tags?: string[];
}

function extractExcerpt(markdown: string, maxLen = 220): string {
  const firstParagraph = markdown
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith("#") && !block.startsWith("|"));

  if (!firstParagraph) return "";

  const plain = firstParagraph
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)]\([^)]*\)/g, "$1")
    .replace(/[*_`#]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return plain.length > maxLen ? `${plain.slice(0, maxLen).trim()}…` : plain;
}

function loadPost(filename: string): Post {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
  const { data, content } = matter(raw, {
    language: "toml",
    delimiters: "+++",
    engines: { toml: (input: string) => parseToml(input) },
  });
  const frontmatter = data as Frontmatter;

  return {
    slug,
    title: frontmatter.title ?? slug,
    date: frontmatter.date ? new Date(frontmatter.date) : null,
    tags: frontmatter.tags ?? [],
    draft: frontmatter.draft ?? false,
    excerpt: extractExcerpt(content),
    contentHtml: marked.parse(content, { async: false }) as string,
    raw: content,
  };
}

function loadAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(loadPost);
}

export async function getAllPosts(): Promise<Post[]> {
  return loadAllPosts()
    .filter((post) => !post.draft)
    .sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const post = loadPost(`${slug}.md`);
  return post.draft ? null : post;
}

export async function getAllPostSlugs(): Promise<string[]> {
  return loadAllPosts()
    .filter((post) => !post.draft)
    .map((post) => post.slug);
}
