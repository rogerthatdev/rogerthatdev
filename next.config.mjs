import nextMdx from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configure MDX to process both .md and .mdx files
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

const withMDX = nextMdx({
  extension: /\.mdx?$/, // Process files with .md or .mdx extensions
  options: {
    // If you use remark-gfm, add it here, along with any other remark/rehype plugins
    // remarkPlugins: [],
    // rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
