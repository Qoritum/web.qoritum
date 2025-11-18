/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";

import type { Metadata } from "next";
import { getAllNews, getNew } from "@/lib/get-new";
import { CalendarIcon } from "lucide-react";
import { BASE_URL, createMetadata } from "@/lib/metadata";

import dayjs from 'dayjs';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const markdown = await getNew(slug);

  if(!markdown?.meta.published) {
    return {}
  }

  return createMetadata({
    title: markdown?.meta.title,
    description: markdown?.meta.summary,
    keywords: markdown?.meta.keywords,
    ...(markdown?.meta.og_image && [
      {
        url: markdown?.meta.og_image,
        width: 1200,
        height: 630,
        alt: "QORITUM",
      },
    ]),
    openGraph: {
      url: `${BASE_URL}/novedades/${slug}`,
      images: markdown?.meta.og_image ? markdown.meta.og_image : [],
    },
    twitter: {
      images: markdown?.meta.og_image ? markdown.meta.og_image : [],
      card: "summary_large_image",
    },
  });
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const { data } = await getAllNews();
  return data.map((_new) => ({ slug: _new.slug }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const markdown = await getNew(slug);

  if (!markdown || !markdown.meta.published) {
    notFound();
  }

  return (
    <main className="pt-20 sm:pt-32 pb-20">
      <h1 className="sm:text-center text-3xl sm:text-5xl lg:text-7xl font-semibold mb-6 container-screen-lg">
        {" "}
        {markdown.meta.title}{" "}
      </h1>
      <div className="flex items-center sm:justify-center container-screen-lg gap-3 mb-4 sm:mb-12 lg:mb-20">
        <span className="flex items-center gap-2 font-arboria font-semibold">
          <CalendarIcon className="mb-1" />
          {dayjs(markdown.meta.date).format('MMM D, YYYY')}
        </span>
      </div>

      {markdown.meta.og_image && (
        <img
          alt="BLOG_COVER"
          src={markdown.meta.og_image}
          className="aspect-video lg:rounded-2xl lg:container-screen-xl w-full"
        />
      )}

      <section className="container-screen-lg mt-8 pb-8">
        {markdown.content}
      </section>
    </main>
  );
}

export const dynamic = "error";

