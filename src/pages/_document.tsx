// Purpose: Customizes the HTML document structure. This file is used to augment 
// the default HTML document structure and includes:

//     Adding or modifying the <html> and <body> tags.
//     Including custom meta tags, scripts, or link tags.
//     Adjusting server-side rendering behavior.

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
