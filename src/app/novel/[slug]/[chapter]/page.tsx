import clsx from "clsx";
import Container from "@/components/Container";
import { notFound } from "next/navigation";
import {
  getAllNovel,
  getContentNovelByChapter,
  getNextChapter,
  getNovelBySlug,
  getPrevChapter,
} from "@/services/novel";
import PaginationButton from "@/components/PaginationButton";

interface PageProps {
  params: {
    chapter: string;
    slug: string;
  };
}

interface NovelDetail {
  id: number;
  title: string;
  slug: string;
  cover_img: string | null;
  chapters: { chapter_number: number }[];
}

export async function generateStaticParams() {
  const novels = await getAllNovel();

  let result: NovelDetail[] = [];

  for (const novel of novels) {
    const novelDetail = await getNovelBySlug(novel.slug);
    if (!novelDetail) continue;
    result.push(novelDetail);
  }

  const data = result.flatMap((item) => {
    return item.chapters.map(({ chapter_number }) => ({
      slug: item.slug,
      chapter: chapter_number,
    }));
  });

  const filterData = data.sort((a, b) => {
    if (a.slug < b.slug) {
      return -1;
    } else if (a.slug > b.slug) {
      return 1;
    } else {
      return a.chapter - b.chapter;
    }
  });

  const finalData = filterData.map((item) => ({
    slug: item.slug,
    chapter: item.chapter.toString(),
  }));

  return finalData;
}

export const revalidate = 300;

export default async function NovelChapter({ params }: PageProps) {
  const slug = params.slug;
  const currentChapter = Number(params.chapter);
  const data = await getContentNovelByChapter(slug, currentChapter);

  if (!data) return notFound();

  const nextChapter = await getNextChapter(
    data.id,
    currentChapter,
    data.title_id
  );
  const prevChapter = await getPrevChapter(
    data.id,
    currentChapter,
    data.title_id
  );

  return (
    <main>
      <Container className="my-20">
        <div
          className={clsx(
            "max-w-2xl",
            "mx-auto mb-10",
            "flex justify-end items-center space-x-3"
          )}
        >
          {prevChapter ? (
            <PaginationButton
              text="Prev"
              href={`/novel/${slug}/${prevChapter}`}
            />
          ) : null}

          {nextChapter ? (
            <PaginationButton
              text="Next"
              href={`/novel/${slug}/${nextChapter}`}
            />
          ) : null}
        </div>

        <div
          className="mx-auto prose-lg prose-invert"
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></div>
      </Container>
    </main>
  );
}
