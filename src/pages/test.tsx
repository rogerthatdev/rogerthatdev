import MDXPage from '@/markdown/mdx-page.mdx'
import Link from "next/link"
import { ArrowLeftIcon } from "@radix-ui/react-icons"

export default function Test() {
    return (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
                <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                    Back to Home
                </Link>
            </div>
            <div className="border-t border-gray-200 pt-8 bg-fefdfb">
                <MDXPage />
            </div>

        </main>
    )
}