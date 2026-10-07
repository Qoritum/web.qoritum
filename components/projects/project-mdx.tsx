import "server-only"

import { evaluate } from "@mdx-js/mdx"
import * as runtime from "react/jsx-runtime"
import remarkGfm from "remark-gfm"
import Link from "next/link"
import Image from "next/image"
import type { ComponentProps, ReactNode } from "react"
import type { Root } from "mdast"
import { H2, H3 } from "@/components/typography/heading"
import { P } from "@/components/typography/description"

// Repository-authored content only. Keep MDX editorial: no scripts, imports,
// expressions or arbitrary HTML attributes; extend the component map explicitly.
function editorialMdx() {
  return (tree: Root) => {
    const walk = (node: {
      type: string
      name?: string | null
      attributes?: { type: string; name?: string }[]
      children?: unknown[]
    }) => {
      if (
        ["mdxjsEsm", "mdxFlowExpression", "mdxTextExpression", "html"].includes(
          node.type
        )
      )
        throw new Error(
          "MDX de proyectos: usa Markdown y componentes editoriales, sin JavaScript/imports."
        )
      if (node.type.startsWith("mdxJsx")) {
        if (!node.name || !["Callout", "ProjectImage"].includes(node.name))
          throw new Error(`Componente MDX no permitido: ${node.name}`)
        if (
          node.attributes?.some(
            (attribute) =>
              attribute.type !== "mdxJsxAttribute" ||
              !["title", "src", "alt", "caption"].includes(attribute.name ?? "")
          )
        )
          throw new Error("Atributo MDX no permitido.")
        for (const attribute of node.attributes ?? []) {
          if (typeof (attribute as { value?: unknown }).value !== "string")
            throw new Error("Usa texto literal en los atributos MDX.")
        }
      }
      for (const child of node.children ?? [])
        walk(child as Parameters<typeof walk>[0])
    }
    walk(tree)
  }
}

function safeHref(href = "") {
  return /^\/(?!\/)/.test(href) ||
    href.startsWith("#") ||
    /^https?:\/\//.test(href)
    ? href
    : "#"
}

function ProjectImage({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption?: string
}) {
  if (
    !/^\/images\/[\w/ .-]+\.(jpg|jpeg|png|webp|avif)$/.test(src) ||
    src.includes("..")
  )
    throw new Error("ProjectImage requiere una imagen local.")
  return (
    <figure className="my-10">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={800}
        className="aspect-video w-full object-cover"
      />
      {caption && (
        <figcaption className="mt-3">
          <P className="text-foreground/55">{caption}</P>
        </figcaption>
      )}
    </figure>
  )
}

function Callout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="my-8 border-l-2 border-primary bg-primary/5 p-6">
      {title && <H3 className="mb-4">{title}</H3>}
      {children}
    </aside>
  )
}

const components = {
  h1: (props: ComponentProps<"h2">) => <H2 {...props} className="mt-12" />,
  h2: (props: ComponentProps<"h2">) => <H2 {...props} className="mt-12" />,
  h3: (props: ComponentProps<"h3">) => <H3 {...props} className="mt-8" />,
  p: (props: ComponentProps<"p">) => (
    <P {...props} className="my-5 leading-relaxed" />
  ),
  a: ({ href, ...props }: ComponentProps<"a">) => (
    <Link
      {...props}
      href={safeHref(href)}
      className="text-primary underline underline-offset-4"
    />
  ),
  ul: (props: ComponentProps<"ul">) => (
    <ul
      {...props}
      className="my-6 list-disc space-y-3 pl-6 text-sm sm:text-base md:text-lg"
    />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol
      {...props}
      className="my-6 list-decimal space-y-3 pl-6 text-sm sm:text-base md:text-lg"
    />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote {...props} className="my-8 border-l-2 border-primary pl-6" />
  ),
  table: (props: ComponentProps<"table">) => (
    <div className="my-8 overflow-x-auto">
      <table
        {...props}
        className="w-full border-collapse text-left [&_td]:border [&_td]:p-3 [&_th]:border [&_th]:p-3"
      />
    </div>
  ),
  pre: (props: ComponentProps<"pre">) => (
    <pre
      {...props}
      className="my-6 overflow-x-auto bg-background-2 p-6 text-sm text-white"
    />
  ),
  img: ({ src, alt }: ComponentProps<"img">) => (
    <ProjectImage src={String(src)} alt={alt ?? ""} />
  ),
  Callout,
  ProjectImage,
}

export async function ProjectMdx({ source }: { source: string }) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm, editorialMdx],
  })
  return <Content components={components} />
}
