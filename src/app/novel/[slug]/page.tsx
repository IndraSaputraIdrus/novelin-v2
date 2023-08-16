import Container from "@/components/Container";
import { database } from "@/libs/firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Link from "next/link";

interface PageProps {
  params: {
    slug: string;
  };
}

async function getAllChapter(slug: string) {
  try {
    const chapterRef = collection(database, "novel", slug, "chapter");
    const queryChapter = query(chapterRef, orderBy("chapter"), limit(10));
    const dataChapter = await getDocs(queryChapter);
    const chapters = dataChapter.docs.map((doc) => ({ chapter: doc.id }));

    return chapters.sort((a, b) => parseInt(a.chapter) - parseInt(b.chapter));
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
        <ul className="mt-5">
          {chapters?.map(({ chapter }) => (
            <li key={Number(chapter)}>
              <Link
                className="hover:opacity-80"
                href={`/novel/${params.slug}/${chapter}`}
              >
                Chapter - {chapter}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
