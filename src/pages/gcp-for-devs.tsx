import { CategoryPage } from "@/components/category-page"

// Static articles for now - these will be replaced by dynamic posts once the posts directory is set up
const gcpArticles = [
  {
    id: "cloud-build-terraform-inline",
    title: "Cloud Build Trigger with Inline YAML via Terraform",
    description:
      "Learn how to create a Cloud Build trigger with inline configuration using Terraform and the templatefile() function.",
    slug: "posts/cloud-build-terraform-inline",
    date: "April 21, 2023",
  },
  {
    id: "gcp-getting-started",
    title: "Getting Started with Google Cloud Platform",
    description:
      "A comprehensive guide to setting up your first GCP project, understanding the console, and navigating core services for developers.",
    slug: "posts/gcp-getting-started",
    date: "December 15, 2023",
  },
  {
    id: "cloud-functions-vs-cloud-run",
    title: "Cloud Functions vs Cloud Run: Choosing the Right Serverless Solution",
    description:
      "Compare Google Cloud's serverless offerings and learn when to use Cloud Functions versus Cloud Run for your applications.",
    slug: "posts/cloud-functions-vs-cloud-run",
    date: "December 10, 2023",
  },
]

export default function GCPForDevsPage() {
  return (
    <CategoryPage
      title="GCP for devs"
      description="Practical guides and tutorials for developers working with Google Cloud Platform. From getting started to advanced deployment strategies, learn how to leverage GCP services to build and scale modern applications."
      articles={gcpArticles}
    />
  )
}
