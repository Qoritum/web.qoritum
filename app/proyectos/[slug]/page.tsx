import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProject, getProjects, getRelatedProjects } from "@/lib/projects"
import { projectMetadata, projectStructuredData } from "@/lib/seo"
import { StructuredData } from "@/components/structured-data"
import { Hero } from "./hero"
import { Body } from "./body"
import { CallToAction } from "./call-to-action"
import { Related } from "./related"

export async function generateStaticParams() {
  return (await getProjects()).map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entry = await getProject(slug)
  if (!entry) notFound()
  return projectMetadata(entry.project)
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entry = await getProject(slug)
  if (!entry) notFound()
  const { project, content } = entry
  const related = await getRelatedProjects(project)
  return (
    <main id="main-content">
      <StructuredData data={projectStructuredData(project)} />
      <Hero project={project} />
      <Body content={content} />
      <CallToAction />
      <Related related={related} />
    </main>
  )
}
