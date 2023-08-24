import Container from "@/components/Container";
import { getAllChapter, getListNovel } from "@/libs/fetch";
import clsx from "clsx";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 300

export async function generateStaticParams() {
  const novel = await getListNovel();
  if (!novel) throw new Error("Data not exist")
  return novel.map((item) => ({ slug: item.id }));
}

export default async function NovelPage({ params }: PageProps) {
  const title = params.slug.replace(/-/g, " ");
  const chapters = await getAllChapter(params.slug);
  if (!chapters) return notFound();

  return (
    <main>
      <Container className="my-20">
        <h1 className="capitalize text-3xl font-semibold">{title}</h1>
        <div>
          <ul className="mt-5 h-80 overflow-y-auto space-y-1.5">
            {chapters.map(({ chapter }) => (
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
