import { TopicLayout } from "@/components/TopicLayout"

import { getPostsByTags } from '@/lib/posts'
import { PAGE_TAGS } from '@/lib/page-config'
import { Article } from '@/types/article'

export async function getStaticProps() {
  const filteredPosts = getPostsByTags(PAGE_TAGS['devrel'])

  return {
    props: {
      articles: filteredPosts,
    },
  }
}

function DevRelPage({ articles }: { articles: Article[] }) {
  return (
    <div>
      <TopicLayout
        title="Developer Relations"
        description="Personal musings on the art of developer relations."
        articles={articles}
      />
    </div>
  )
}

DevRelPage.activePage = "devrel"

export default DevRelPage