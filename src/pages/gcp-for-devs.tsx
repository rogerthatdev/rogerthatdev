import { CategoryPage } from "@/components/category-page"
import { Footer } from "@/components/footer"

// Static articles for now - these will be replaced by dynamic posts once the posts directory is set up
const gcpArticles = [
  {
    id: "cloud-build-terraform-inline",
    title: "Cloud Build Trigger with Inline YAML via Terraform",
    description:
      "Learn how to create a Cloud Build trigger with inline configuration using Terraform and the templatefile() function.",
    slug: "posts/cloud-build-terraform-inline",
    date: "April 21, 2023",
  }
]

export default function GCPForDevsPage() {
  return (
    <>
    <CategoryPage
      title="GCP for devs"
      description="Practical guides and tutorials for developers working with Google Cloud Platform. From getting started to advanced deployment strategies, learn how to leverage GCP services to build and scale modern applications."
      articles={gcpArticles}
    />
    <Footer />
    </>
  )
}
