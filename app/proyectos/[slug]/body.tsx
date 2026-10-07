import { ProjectMdx } from "@/components/projects/project-mdx"

export function Body({ content }: { content: string }) {
  return (
    <div className="container-screen-lg py-12 sm:py-20">
      <ProjectMdx source={content} />
    </div>
  )
}
