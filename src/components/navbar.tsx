import Link from "next/link"
import { Button } from "@/components/ui/button"

interface NavBarProps {
  activePage: "home" | "gcp-for-devs" | "genai"
}

export function NavBar({ activePage }: NavBarProps) {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-semibold text-black">
            roger that dev
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`hover:text-gray-900 transition-colors ${
                activePage === "home" ? "text-gray-900 border-b-2 border-black pb-4" : "text-gray-600"
              }`}
            >
              Home
            </Link>
            <Link
              href="/gcp-for-devs"
              className={`hover:text-gray-900 transition-colors ${
                activePage === "gcp-for-devs" ? "text-gray-900 border-b-2 border-black pb-4" : "text-gray-600"
              }`}
            >
              GCP for devs
            </Link>
            <Link
              href="/genai"
              className={`hover:text-gray-900 transition-colors ${
                activePage === "genai" ? "text-gray-900 border-b-2 border-black pb-4" : "text-gray-600"
              }`}
            >
              GenAI
            </Link>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              Menu
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
