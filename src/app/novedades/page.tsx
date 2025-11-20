/* eslint-disable @next/next/no-img-element */
import { getAllNews } from "@/lib/get-new";
import { createMetadata } from "@/lib/metadata";
import { NewMetadata } from "@/types/new";
import dayjs from "dayjs";
import { CalendarIcon, ExternalLink } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = createMetadata({
  title: "Novedades",
  description: "Explorar nuestras últimas noticias de qoritum",
});

export default async function News() {
  const news = (await getAllNews()).data;

  return (
    <main className="container-screen-xl pt-20 md:pt-35 pb-20">
      <h1 className="sr-only"> Novedades de Qoritum </h1>
      <div className="grid grid-cols-1 lg:grid-cols-[.4fr_1fr] gap-10 lg:gap-30">
        <section>
          <div className="sticky top-20 ">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-semibold mb-3 lg:mb-8">
              {" "}
              Novedades de Qoritum{" "}
            </h2>
            <p>Explora nuestras últimas novedades en qoritum</p>
            <div className="lg:h-80" />
          </div>
        </section>

        <section className="space-y-12">
          {news.length > 0 &&
            news.map((metadata, i) => {
              return <Article key={i} {...metadata} />;
            })
          }
          {news.length === 0 && <span className="text-center block text-lg py-20"> Aún no tenemos novedades para mostrar </span>}
        </section>
      </div>
    </main>
  );
}

const Article = (metadata: NewMetadata) => {
  const href = `/novedades/${metadata.slug}`;
  return (
    <article>
      {metadata.og_image && (
        <div className="relative aspect-video rounded-xl overflow-hidden">
          <img
            alt="Blog-image"
            src={metadata.og_image}
            className=" bg-black/10 object-cover size-full"
          />

          <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-background rounded-full flex items-center justify-center p-2 md:p-5">
            <ExternalLink className="size-3 md:size-6" />
          </div>
        </div>
      )}
      <div className="px-3">
        <h2 className="text-xl lg:text-3xl font-semibold mb-4 mt-2 hover:underline">
          <Link href={href}>{metadata.title}</Link>
        </h2>
        <p>{metadata.summary}</p>

        <div className="mt-6 flex items-center justify-between">
          <span className="flex items-center gap-2 font-arboria font-semibold">
            <CalendarIcon className="mb-1" />
            {dayjs(metadata.date).format("MMM D, YYYY")}
          </span>

          <Link href={href} className="hover:underline text-primary">
            Leer Más
          </Link>
        </div>
      </div>
    </article>
  );
};

