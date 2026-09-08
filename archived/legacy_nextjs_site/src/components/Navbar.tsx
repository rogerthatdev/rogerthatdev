import Link from "next/link"
import Image from "next/image"

interface NavBarProps {
  activePage: "home" | "gcp-for-devs" | "genai" | "devrel"
}

export default function NavBar({ activePage }: NavBarProps) {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Image src="/img/mock.png" alt="Logo" width={32} height={32} className="h-8 w-8 object-contain" />
            <Link href="/" className="text-xl font-semibold text-black">
              roger that dev
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`hover:text-gray-900 transition-colors ${activePage === "home" ? "text-gray-900 border-b-2 border-black pb-4" : "text-gray-600"
                }`}
            >
              Home
            </Link>
            <Link
              href="/gcp-for-devs"
              className={`hover:text-gray-900 transition-colors ${activePage === "gcp-for-devs" ? "text-gray-900 border-b-2 border-black pb-4" : "text-gray-600"
                }`}
            >
              Cloud
            </Link>
            <Link
              href="/genai"
              className={`hover:text-gray-900 transition-colors ${activePage === "genai" ? "text-gray-900 border-b-2 border-black pb-4" : "text-gray-600"
                }`}
            >
              AI
            </Link>
            <Link
              href="/devrel"
              className={`hover:text-gray-900 transition-colors ${activePage === "devrel" ? "text-gray-900 border-b-2 border-black pb-4" : "text-gray-600"
                }`}
            >
              Developer Relations
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}