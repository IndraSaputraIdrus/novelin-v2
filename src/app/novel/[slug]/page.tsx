import Container from "@/components/Container";
import { getListNovel } from "@/components/ListNovel";
import { database } from "@/libs/firebase";
import clsx from "clsx";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Link from "next/link";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const novel = await getListNovel();

  if (!novel) throw new Error("Error slug");

  return novel.map((item) => ({ slug: item.id }));
}

async function getAllChapter(slug: string) {
  try {
    const chapterRef = collection(database, "novel", slug, "chapter");
    const queryChapter = query(chapterRef, orderBy("chapter", "desc"));
    const dataChapter = await getDocs(queryChapter);
    const chapters = dataChapter.docs.map((doc) => ({ chapter: doc.id }));

    return chapters;
  } catch (error) {
    console.log(error);
  }
}

export default async function NovelPage({ params }: PageProps) {
  const title = params.slug.replace(/-/g, " ");
  const chapters = await getAllChapter(params.slug);

  return (
    <main>
      <Container className="my-20">
        <h1 className="capitalize text-3xl font-semibold">{title}</h1>
        <div>
          <ul className="mt-5 h-80 overflow-y-auto space-y-1.5">
            {chapters?.map(({ chapter }) => (
              <li key={Number(chapter)}>
                <Link
                  className={clsx(
                    "block",
                    "rounded",
                    "px-3 py-1.5",
                    "bg-gray-900 hover:opacity-80"
                  )}
                  href={`/novel/${params.slug}/${chapter}`}
                >
                  Chapter - {chapter}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </main>
  );
}
