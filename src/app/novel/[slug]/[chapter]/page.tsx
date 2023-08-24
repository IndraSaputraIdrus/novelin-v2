import clsx from "clsx";
import Link from "next/link";
import Container from "@/components/Container";
import { getAllChapter, getData, getListNovel } from "@/libs/fetch";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    chapter: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  const novel = await getListNovel();
  if(!novel) return notFound()
  let newData: { slug: string; chapter: string }[] = [];
  for (const title of novel) {
    const chapters = await getAllChapter(title.id);
    if (!chapters) throw new Error("Error chapter");
    chapters.forEach((chapter) => {
      newData.push({ slug: title.id, chapter: chapter.chapter });
    });
  }

  return newData;
}

export default async function NovelChapter({ params }: PageProps) {
  const slug = params.slug;
  const data = await getData(params.chapter, slug);
  const chapterNumber = Number(params.chapter);

  if(!data) return notFound()

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
          <Link
            className={clsx(
              "block",
              "w-max",
              "px-3 py-1",
              "bg-gray-100 text-slate-950"
            )}
            href={`/novel/${slug}/${chapterNumber - 1}`}
          >
            Prev
          </Link>
          <Link
            className={clsx(
              "block",
              "w-max",
              "px-3 py-1",
              "bg-gray-100 text-slate-950"
            )}
            href={`/novel/${slug}/${chapterNumber + 1}`}
          >
            Next
          </Link>
        </div>

        <div
          className="mx-auto prose prose-invert"
          dangerouslySetInnerHTML={{ __html: data.text }}
        ></div>
      </Container>
    </main>
  );
}
