import { TopicLayout } from "@/components/TopicLayout"

import { getPostsByTags } from '@/lib/posts'
import { PAGE_TAGS } from '@/lib/page-config'
import { Article } from '@/types/article'

export async function getStaticProps() {
  const filteredPosts = getPostsByTags(PAGE_TAGS['gcp-for-devs'])

  return {
    props: {
      articles: filteredPosts,
    },
  }
}

function GCPForDevsPage({ articles }: { articles: Article[] }) {
  return (
    <div>
      <TopicLayout
        title="Cloud"
        description="Practical guides and tutorials for developers working with Google Cloud Platform. From getting started to advanced deployment strategies, learn how to leverage GCP services to build and scale modern applications."
        articles={articles}
      />
    </div>
  )
}

GCPForDevsPage.activePage = "gcp-for-devs"

export default GCPForDevsPage
