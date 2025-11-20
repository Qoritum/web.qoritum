/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import type { MDXComponents } from "mdx/types";
//import { CodeBlock } from './components/ui/code-block';

export const Components: MDXComponents = {
  h1: (props) => (
    <h1
      {...props}
      className="my-4 block text-3xl sm:text-7xl font-arboria font-semibold"
    />
  ),
  h2: (props) => (
    <h2
      {...props}
      className="mt-8 mb-4 sm:mb-8 block text-2xl sm:text-4xl font-arboria font-semibold"
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className="mt-3 mb-4 block text-xl font-arboria font-semibold"
    />
  ),
  h4: (props) => (
    <h4 {...props} className="my-3 mt-2 block font-arboria font-semibold" />
  ),
  h5: (props) => <h4 {...props} className="my-1 block" />,
  h6: (props) => <h4 {...props} className="my-1 block" />,
  p: (props) => (
    <p {...props} className="pt-1.5 pb-4 sm:pb-8 leading-6 text-base sm:leading-7 sm:text-xl" />
  ),
  strong: (props) => (
    <strong {...props} className="text-foreground font-bold" />
  ),
  ul: (props) => (
    <ul {...props} className="ms-4 block list-inside list-disc space-y-2 pt-1.5 pb-8 leading-7 sm:text-xl" />
  ),
  ol: (props) => (
    <ol {...props} className="ms-4 block list-inside list-decimal space-y-2 pt-1.5 pb-8 leading-7 sm:text-xl" />
  ),
  li: (props) => <li {...props} />,
  a: (props) => (
    <a
      className="text-primary font-medium hover:underline"
      target="_blank"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      {...props}
      className="border-ring bg-foreground/5 my-1.5 border-l-4 py-1.5 pl-4 font-light italic [&_p]:py-0!"
    />
  ),
  code: (props) => <code {...props} className="bg-primary/30 px-2 py-0.5" />,
  pre: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLPreElement> & {
    filename?: string;
    highlightlines?: number[];
  }) => {
    if (children) {
      return (
        <pre className="bg-foreground-2/5 overflow-auto p-4 [&_code]:bg-transparent! [&_code]:px-0! [&_code]:py-0!">
          {children}
          {/** 
          <CodeBlock
            {...(children as any).props}
            filename={filename}
            highlightlines={highlightlines}
          >
            {children}
          </CodeBlock>
          */}
        </pre>
      );
    }
    return (
      <pre
        {...props}
        className="overflow-auto [&_code]:bg-transparent! [&_code]:px-0! [&_code]:py-0!"
      />
    );
  },
  sup: (props: React.HTMLAttributes<HTMLElement>) => (
    <sup {...props} className="px-2" />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-1.5 max-w-full overflow-auto">
      <table
        {...props}
        className="bg-background w-full max-w-full overflow-hidden rounded-md"
      />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLElement>) => <thead {...props} />,
  tbody: (props: React.HTMLAttributes<HTMLElement>) => (
    <tbody
      className="divide-border bg-background [&_tr:nth-child(even)]:bg-foreground/5 divide-y"
      {...props}
    />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="bg-primary/20 text-foreground px-4 py-2 text-start font-medium"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="text-foreground-2 px-4 py-2 text-sm whitespace-nowrap"
      {...props}
    />
  ),
  hr: () => <div className="bg-border my-4 h-px w-full" />,
  img: (props) => {
    const { title, alt, className, ...rest } = props;

    const resolvedAlt =
      typeof alt === "string" && alt.length > 0
        ? alt
        : typeof title === "string"
        ? title
        : "";

    const baseImgProps = {
      ...rest,
      alt: resolvedAlt,
      loading: rest.loading ?? "lazy",
      decoding: rest.decoding ?? "async",
      sizes: rest.sizes ?? "100vw",
    };

    if (title) {
      return (
        <figure className="my-6">
          <img
            {...baseImgProps}
            className={`h-auto w-full rounded-md ${className ?? ""}`}
          />
          <figcaption className="mt-2 sm:text-xl text-foreground/80 font-arboria font-semibold border-l-4 border-secondary px-4 bg-secondary/5 py-1.5 italic">
            {title}
          </figcaption>
        </figure>
      );
    }

    // 4. Si no hay `title` → imagen suelta dentro del flujo
    return (
      <img
        {...baseImgProps}
        className={`my-2 h-auto w-full rounded-lg ${className ?? ""}`}
      />
    );
  },
};
export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return { ...Components, ...components };
}

