import Navbar from "./Navbar"
import Footer from "./Footer"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4 py-8">{children}</main>
      <Footer />
    </>
  )
}
