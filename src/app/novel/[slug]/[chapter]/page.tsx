import clsx from "clsx";
import Container from "@/components/Container";
import { notFound } from "next/navigation";
import {
  getContentNovelByChapter,
  getNextChapter,
  getNovelBySlug,
  getPrevChapter,
} from "@/services/novel";
import PaginationButton from "@/components/PaginationButton";
import { Metadata } from "next";
import SetHistory from "@/components/SetHistory";

interface PageProps {
  params: {
    chapter: string;
    slug: string;
  };
}

export const revalidate = 300;

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const { slug, chapter } = params;
  const data = await getNovelBySlug(slug);
  if (!data) {
    return {
      title: "Page not found",
    };
  }

  return {
    title: `${data.title} | Chapter ${chapter}`,
  };
}

export default async function NovelChapter({ params }: PageProps) {
  const slug = params.slug;
  const currentChapter = Number(params.chapter);
  const data = await getContentNovelByChapter(slug, currentChapter);

  if (!data) return notFound();

  const nextChapter = await getNextChapter(
    data.id,
    currentChapter,
    data.title_id,
  );
  const prevChapter = await getPrevChapter(
    data.id,
    currentChapter,
    data.title_id,
  );

  const Pagination = ({ className }: { className?: string }) => {
    return (
      <div
        className={clsx(
          "max-w-2xl",
          "mx-auto",
          "flex justify-end items-center space-x-3",
          className ? className : null,
        )}
      >
        {prevChapter
          ? (
            <PaginationButton
              text="Prev"
              href={`/novel/${slug}/${prevChapter}`}
            />
          )
          : null}

        {nextChapter
          ? (
            <PaginationButton
              text="Next"
              href={`/novel/${slug}/${nextChapter}`}
            />
          )
          : null}
      </div>
    );
  };

  return (
    <main>
      <Container className="my-20">
        <Pagination className="mb-12" />

        <div
          className="mx-auto prose-lg prose-invert"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />

        <Pagination className="mt-12"/>
      </Container>
      <SetHistory slug={params.slug} chapter={Number(params.chapter)} />
    </main>
  );
}
