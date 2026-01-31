import "@/styles/globals.css";
import Layout from "@/components/Layout"
import type { AppProps } from "next/app";
import type { NextPage } from "next"
import { ActivePage } from "@/types/activePage"

type NextPageWithActivePage = NextPage & {
  activePage?: ActivePage
}

export default function App({ Component, pageProps }: AppProps) {
  const activePage = (Component as NextPageWithActivePage).activePage || "home"
  return (
    <Layout activePage={activePage}>
      <Component {...pageProps} />
    </Layout>
  )
}
