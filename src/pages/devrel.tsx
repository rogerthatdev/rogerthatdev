import { TopicLayout } from "@/components/TopicLayout"

function DevRelPage() {
  return (
    <div>
      <TopicLayout
        title="DevRel things"
        description="Personal musings on the art of developer relations."
        articles={[]}
      />
    </div>
  )
}

DevRelPage.activePage = "devrel"

export default DevRelPage