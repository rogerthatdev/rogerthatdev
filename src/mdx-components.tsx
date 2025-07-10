import type { MDXComponents } from "mdx/types"
import Image, { ImageProps } from "next/image"

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
      // Allows customizing built-in components, e.g. to add styling.
      h1: ({ children }) => (
        <h1 style={{ color: 'black', fontSize: '2em' }}>{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 style={{ color: 'black', fontSize: '1.5em' }}>{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 style={{ color: 'black', fontSize: '1.17em' }}>{children}</h3>
      ),
      h4: ({ children }) => (
        <h4 style={{ color: 'black', fontSize: '1em' }}>{children}</h4>
      ),
      h5: ({ children }) => (
        <h5 style={{ color: 'black', fontSize: '0.83em' }}>{children}</h5>
      ),
      h6: ({ children }) => (
        <h6 style={{ color: 'black', fontSize: '0.67em' }}>{children}</h6>
      ),
      p: ({ children }) => (
        <p style={{ color: 'black', fontSize: '1em' }}>{children}</p>
      ),
             code: ({ children }) => (
         <code style={{ 
           color: 'white', 
           backgroundColor: 'black', 
           fontSize: '0.9em',
           fontFamily: 'monospace',
           padding: '2px 6px',
           borderRadius: '4px',
           display: 'inline-block'
         }}>{children}</code>
       ),
      img: (props) => (
        <Image
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
          {...(props as ImageProps)}
        />
      ),
      ...components,
    }
  }