// Purpose: Customizes the default App component that initializes every page. 
// This file allows you to:

//     Add global CSS or style imports.
//     Maintain state or add global functionality across all pages.
//     Implement layout wrappers or providers (e.g., for authentication, theme contexts).

import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
