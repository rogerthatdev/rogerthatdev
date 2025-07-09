// Purpose: Customizes the default App component that initializes every page. 
// This file allows you to:

//     Add global CSS or style imports.
//     Maintain state or add global functionality across all pages.
//     Implement layout wrappers or providers (e.g., for authentication, theme contexts).

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { NavBar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  // Determine the active page for navbar highlighting
  const getActivePage = () => {
    const path = router.pathname;
    if (path === "/") return "home";
    if (path === "/gcp-for-devs") return "gcp-for-devs";
    if (path === "/genai") return "genai";
    return "home";
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavBar activePage={getActivePage()} />
      <main className="flex-1">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
