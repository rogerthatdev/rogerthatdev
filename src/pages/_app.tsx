import "@/styles/globals.css";
import Layout from "@/components/Layout"
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const activePage = (Component as any).activePage || "home"
  return (
    <Layout activePage={activePage}>
      <Component {...pageProps} />
    </Layout>
  )
}
