import { z } from "zod";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Zod schema for runtime validation
export const ArticleSchema = z.object({
    title: z.string()
        .min(1, "Title is required")
        .max(200, "Title must be less than 200 characters"),
    subtitle: z.string()
        .min(1, "Subtitle is required")
        .max(200, "Subtitle must be less than 200 characters"),
    frontmatter: z.object({
        date: z.string()
            .optional()
            .refine((val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), {
                message: "Date must be in YYYY-MM-DD format"
            }),
        tags: z.array(z.string())
            .min(1, "At least one tag is required")
            .max(5, "Maximum of 5 tags allowed"),
        author: z.string()
            .min(1, "Author is required")
            .max(100, "Author must be less than 100 characters"),
        tldr: z.string()
            .min(1, "Tldr is required")
            .max(500, "Tldr must be less than 500 characters"),
    }),
    content: z.string()
        .min(1, "Content is required")
}).transform((data) => ({
    ...data,
    slug: generateSlug(data.title)
}));

// TypeScript interface derived from the Zod schema
export type Article = z.infer<typeof ArticleSchema>;

// Extended interface for database operations (includes id)
export interface ArticleWithId extends Article {
  id: string;
}