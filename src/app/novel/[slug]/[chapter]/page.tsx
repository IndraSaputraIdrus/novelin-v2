import clsx from "clsx";
import Container from "@/components/Container";
import { notFound } from "next/navigation";
import {
  getContentNovelByChapter,
  getNextChapter,
  getPrevChapter,
} from "@/services/novel";
import PaginationButton from "@/components/PaginationButton";

interface PageProps {
  params: {
    chapter: string;
    slug: string;
  };
}

// export async function generateStaticParams() {
//   const novel = await getListNovel();
//   if(!novel) return notFound()
//   let newData: { slug: string; chapter: string }[] = [];
//   for (const title of novel) {
//     const chapters = await getAllChapter(title.id);
//     if (!chapters) throw new Error("Error chapter");
//     chapters.forEach((chapter) => {
//       newData.push({ slug: title.id, chapter: chapter.chapter });
//     });
//   }
//
//   return newData;
// }

export default async function NovelChapter({ params }: PageProps) {
  const slug = params.slug;
  const currentChapter = params.chapter;
  const data = await getContentNovelByChapter(slug, currentChapter);

  const nextChapter = await getNextChapter(currentChapter, data.title_id);
  const prevChapter = await getPrevChapter(currentChapter, data.title_id);
  if (!data) return notFound();

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
