import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"
import Image from "next/image"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-gray max-w-none">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "")
            return !inline && match ? (
              <SyntaxHighlighter style={oneLight} language={match[1]} PreTag="div" className="rounded-lg" {...props}>
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          img({ src, alt, ...props }) {
            if (!src) return null
            return (
              <Image
                src={src || "/placeholder.svg"}
                alt={alt || ""}
                width={800}
                height={400}
                className="rounded-lg"
                {...props}
              />
            )
          },
          h1: ({ children }) => <h1 className="text-3xl font-bold text-black mt-8 mb-4">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-semibold text-black mt-6 mb-3">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-medium text-black mt-4 mb-2">{children}</h3>,
          p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">{children}</blockquote>
          ),
          ul: ({ children }) => <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-1">{children}</ol>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
