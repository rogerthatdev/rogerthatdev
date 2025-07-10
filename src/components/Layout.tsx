import Navbar from "./Navbar"
import Footer from "./Footer"

interface LayoutProps {
  children: React.ReactNode,
  activePage: "home" | "gcp-for-devs" | "genai" | "devrel"
}

export default function Layout({ children, activePage }: LayoutProps) {
  return (
    <>
      <Navbar activePage={activePage} />
      <main className="min-h-screen px-4 py-8">{children}</main>
      <Footer />
    </>
  )
}
