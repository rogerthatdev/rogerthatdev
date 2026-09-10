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

/** Converts the Hugo shortcodes used by older posts (`{{< figure >}}`,
 *  `{{< youtube >}}`) into plain HTML the markdown renderer understands.
 *  Image sources are resolved relative to `/posts/<slug>/`, matching where
 *  each post's images live under the `public` directory. */
function resolveShortcodes(markdown: string, slug: string): string {
  return markdown
    .replace(/{{<\s*figure\s+([^>]*?)\s*>}}/g, (_match, attrs: string) => {
      const src = attrs.match(/src=["']([^"']+)["']/)?.[1] ?? "";
      const alt = attrs.match(/alt=["']([^"']+)["']/)?.[1] ?? "";
      const width = attrs.match(/width=["']?(\d+)["']?/)?.[1];
      const widthAttr = width ? ` width="${width}"` : "";
      return `<img src="/posts/${slug}/${src}" alt="${alt}"${widthAttr} />`;
    })
    .replace(
      /{{<\s*youtube\s+([\w-]+)\s*>}}/g,
      (_match, id: string) =>
        `<div class="aspect-video"><iframe src="https://www.youtube.com/embed/${id}" title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`,
    );
}

/** Rewrites relative markdown link/image targets (e.g. `(products.csv)`) to
 *  point at `/posts/<slug>/...`, matching where each post's local assets
 *  live under the `public` directory. Absolute and protocol URLs are left
 *  untouched. */
function resolveRelativeLinks(markdown: string, slug: string): string {
  return markdown.replace(
    /(!?\[[^\]]*]\()([^)\s]+)(\))/g,
    (match, pre: string, url: string, post: string) => {
      if (/^(https?:|mailto:|#|\/)/.test(url)) return match;
      return `${pre}/posts/${slug}/${url}${post}`;
    },
  );
}

function extractExcerpt(markdown: string, maxLen = 220): string {
  const firstParagraph = markdown
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .find(
      (block) =>
        block &&
        !block.startsWith("#") &&
        !block.startsWith("|") &&
        !block.startsWith("{{<") &&
        !block.startsWith("<"),
    );

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
  const resolved = resolveRelativeLinks(resolveShortcodes(content, slug), slug);

  return {
    slug,
    title: frontmatter.title ?? slug,
    date: frontmatter.date ? new Date(frontmatter.date) : null,
    tags: frontmatter.tags ?? [],
    draft: frontmatter.draft ?? false,
    excerpt: extractExcerpt(resolved),
    contentHtml: marked.parse(resolved, { async: false }) as string,
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
