import { z } from "zod";

const slugFrom = (s: string) =>
  s.toLowerCase().trim()
   .replace(/[^a-z0-9\s-]/g, "")
   .replace(/\s+/g, "-")
   .replace(/-+/g, "-")
   .replace(/^-+|-+$/g, "");

const FrontmatterSchema = z.object({
  date: z.coerce.date().optional()
    .transform(d => d ? d.toISOString().slice(0,10) : undefined),
  tags: z.array(z.string().trim().min(1)).min(1).max(5)
    .transform(arr => [...new Set(arr.map(t => t.toLowerCase()))]),
  author: z.string().trim().min(1).max(100),
  tldr: z.string().trim().min(1).max(500).optional(),
}).strict();

// Incoming payload (from GH) — NO slug here
export const CreateArticleInputSchema = z.object({
    title: z.string().trim().min(1).max(200),
    subtitle: z.string().trim().min(1).max(200),
    frontmatter: FrontmatterSchema,
    content: z.string().trim().min(1),
  }).strict();

export const CreateArticleSchema = CreateArticleInputSchema.transform((d) => ({
  ...d,
  slug: slugFrom(d.title),
}));


export type CreateArticleInput = z.infer<typeof CreateArticleInputSchema>; // what GH sends
export type CreateArticle = z.infer<typeof CreateArticleSchema>;           // what you store