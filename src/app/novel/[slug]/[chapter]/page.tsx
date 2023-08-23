import { database } from "@/libs/firebase";
import { doc, getDoc } from "firebase/firestore";
import clsx from "clsx";
import Link from "next/link";
import Container from "@/components/Container";

interface PageProps {
  params: {
    chapter: string;
    slug: string;
  };
}

async function getData(chapter: string, slug: string) {
  const docRef = doc(database, "novel", slug, "chapter", chapter);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return data;
  }
}

export default async function NovelChapter({ params }: PageProps) {
  const slug = params.slug;
  const data = await getData(params.chapter, slug);
  const chapterNumber = Number(params.chapter);

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
          dangerouslySetInnerHTML={{ __html: data?.text }}
        ></div>
      </Container>
    </main>
  );
}
