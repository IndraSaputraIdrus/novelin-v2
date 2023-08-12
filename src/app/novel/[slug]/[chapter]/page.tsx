import { database } from "@/libs/firebase";
import { doc, getDoc } from "firebase/firestore";
import clsx from "clsx";
import Link from "next/link";

interface PageProps {
  params: {
    chapter: string;
    slug: string;
  };
}

async function getData(chapter: string) {
  const docRef = doc(database, "novel", "the-novel-extra", "chapter", chapter);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return data;
  }
}

export default async function NovelChapter({ params }: PageProps) {
  const data = await getData(params.chapter);
  const chapterNumber = Number(params.chapter);
  const slug = params.slug;

  return (
    <div className="my-20 px-5 md:px-0">
      <div
        className={clsx(
          "max-w-2xl",
          "mx-auto mb-10",
          "md:px-3",
          "flex justify-end items-center space-x-3"
        )}
      >
        <Link
          className={clsx(
            "block",
            "w-max",
            "px-3 py-1",
            "bg-white text-slate-950"
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
            "bg-white text-slate-950"
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
    </div>
  );
}
