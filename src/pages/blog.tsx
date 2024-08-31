import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Page() {
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
                  <Link href="/articles">Articles</Link>
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
          {['Article 1', 'Article 2', 'Article 3'].map((article, index) => (
            <li key={index} className="border-b pb-4">
              <h2 className="text-2xl font-semibold mb-2">{article}</h2>
              <p className="text-muted-foreground mb-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Button variant="link" asChild>
                <Link href={`/article/${index + 1}`}>Read more</Link>
              </Button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}