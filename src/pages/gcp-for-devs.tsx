import { CategoryPage } from "@/components/category-page"

const gcpArticles = [
  {
    id: "1",
    title: "Getting Started with Google Cloud Platform",
    description:
      "A comprehensive guide to setting up your first GCP project, understanding the console, and navigating core services for developers.",
    slug: "gcp-for-devs/getting-started-gcp",
    date: "December 15, 2023",
  },
  {
    id: "2",
    title: "Cloud Functions vs Cloud Run: Choosing the Right Serverless Solution",
    description:
      "Compare Google Cloud's serverless offerings and learn when to use Cloud Functions versus Cloud Run for your applications.",
    slug: "gcp-for-devs/cloud-functions-vs-cloud-run",
    date: "December 10, 2023",
  },
  {
    id: "3",
    title: "Building Scalable APIs with Cloud Endpoints",
    description:
      "Learn how to create, deploy, and manage APIs using Google Cloud Endpoints with authentication and monitoring built-in.",
    slug: "gcp-for-devs/scalable-apis-cloud-endpoints",
    date: "December 5, 2023",
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
