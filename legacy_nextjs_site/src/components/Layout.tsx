import Navbar from "./Navbar"
import Footer from "./Footer"
import { ActivePage } from "@/types/activePage"

interface LayoutProps {
  children: React.ReactNode,
  activePage: ActivePage
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
