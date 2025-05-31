import Link from 'next/link'
import { GetStaticProps } from 'next'
import { Button } from '@/components/ui/button'

interface Post {
  title: string;
  slug: string;
  filename: string; // Corresponds to the data structure we have
}

interface BlogPageProps {
  posts: Post[];
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  // This data is taken from the previous subtask's output
  const posts: Post[] = [
    {
      "filename": "posts/post01.md",
      "title": "Cloud Build Trigger with Inline YAML via Terraform",
      "slug": "cloud-build-trigger-with-inline-yaml-via-terraform"
    },
    {
      "filename": "posts/post02.md",
      "title": "Terraform using Google Cloud Build",
      "slug": "terraform-using-google-cloud-build"
    }
  ];

  return {
    props: {
      posts,
    },
  };
}

export default function BlogPage({ posts }: BlogPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            TechBlog
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Button variant="ghost" asChild>
                  <Link href="/blog">Articles</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild>
                  <Link href="/about">About</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild>
                  <Link href="/contact">Contact</Link>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Latest Articles</h1>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug} className="border-b pb-4">
              <h2 className="text-2xl font-semibold mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              {/* The original hardcoded paragraph and 'Read more' are removed as per plan */}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
