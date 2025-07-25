import { TopicLayout } from "@/components/TopicLayout"

function GCPForDevsPage() {
  return (
    <div>
      <TopicLayout
        title="GCP for devs"
        description="Practical guides and tutorials for developers working with Google Cloud Platform. From getting started to advanced deployment strategies, learn how to leverage GCP services to build and scale modern applications."
        articles={[]}
      />
    </div>
  )
}

GCPForDevsPage.activePage = "gcp-for-devs"

export default GCPForDevsPage
