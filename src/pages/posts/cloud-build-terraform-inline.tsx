import Link from "next/link"
import { NavBar } from "@/components/navbar"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { ArrowLeftIcon } from "@radix-ui/react-icons"

const postContent = `# Cloud Build Trigger with Inline YAML via Terraform

*providing ad-hoc cloud build config via terraform*

**April 21, 2023** • by rogerthat terraformer

![banner](/testimg.png?height=400&width=800)

When you configure a Cloud Build trigger via the Cloud Console, you have the
option of specifying the the \`cloubuild.yaml\` configuration as either a file
location on the repository or as an inline configuration. I'm going to show you
how you can create a Cloud Build trigger with inline configuration using
Terraform. We're gonna make use of Terraform's [templatefile() function](https://developer.hashicorp.com/terraform/language/functions/templatefile).

Follow along with the [code available here](https://github.com/rogerthatdev/cloud-build-terraform/tree/main/inline-yaml).

## Simplest example

Here's a basic Cloud Build Trigger configured with a Cloud Source Repo I made 
somewhere else in this \`.tf\` file:

\`\`\`hcl
resource "google_cloudbuild_trigger" "simplest_inline" {
  project     = var.project_id
  location    = var.region
  name        = "01-simplest-inline-config-example"
  description = "This trigger is deployed by terraform, with an in-line build config."
  trigger_template {
    branch_name  = "^main$"
    invert_regex = false
    project_id   = var.project_id
    # I can't create a trigger without connecting a repo to the project, so I 
    # made a Cloud Source Repo and passed it along here
    repo_name    = google_sourcerepo_repository.placeholder.name
  }
  build {
    images        = []
    substitutions = {}
    tags          = []
    # This is a single step defined inline
    step {
      name = "ubuntu"
      args = [
        "echo",
        "hello world hey"
      ]
    }
    timeout = "600s"
  }
}
\`\`\`

It's a single step, passed along to the \`build\` block. This trigger will have the following Cloud Build config 
configured inline:

\`\`\`yaml
steps:
  - name: ubuntu
    args:
      - echo
      - hello world hey
timeout: 600s
\`\`\`

## Use a yaml.tftpl file

You can achieve the above configuration using a Terraform template file that 
looks like the familiar cloudbuild.yaml file:

\`\`\`yaml
# 02-simple.cloudbuild.yaml.tftpl
steps:
  - name: ubuntu
    args:
      - echo
      - hello world hey
timeout: 600s
\`\`\`

I can pass along values for the \`step\` block using a local value:

\`\`\`hcl
locals {
  # we bring in the yaml content via yamldecode() and templatefile()
  simple_config_02 = yamldecode(templatefile("\${path.root}/cloudbuild/02-simple.cloudbuild.yaml", {}))
}

resource "google_cloudbuild_trigger" "simple_inline_02" {
  project     = var.project_id
  location    = var.region
  name        = "02-simple-inline-config-example"
  description = "This trigger is deployed by terraform, with an in-line build config."
  trigger_template {
    branch_name  = "^main$"
    invert_regex = false
    project_id   = var.project_id
    repo_name    = google_sourcerepo_repository.placeholder.name
  }
  build {
    images        = []
    substitutions = {}
    tags          = []
    # The single step gets values for name and args from the yaml brought in via
    # the local value above. This works because there's only one step.
    step {
      name = local.simple_config_02.steps[0].name
      args = local.simple_config_02.steps[0].args
    }
  }
}
\`\`\`

This approach gives you the flexibility to manage your Cloud Build configurations as familiar YAML files while still leveraging Terraform's powerful templating capabilities.`

export default function CloudBuildTerraformInlinePage() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar activePage="home" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/gcp-for-devs"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to GCP for devs
          </Link>
        </div>

        <article>
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">terraform</span>
            <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">cloud build</span>
            <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">GCP</span>
          </div>

          <MarkdownRenderer content={postContent} />
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>Footer 2023</p>
            <p className="mt-2 text-sm">© 2023 roger that dev. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
