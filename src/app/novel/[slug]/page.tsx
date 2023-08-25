import Container from "@/components/Container";
import { getNovelBySlug } from "@/services/novel";
import clsx from "clsx";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

// export const revalidate = 300;

// export async function generateStaticParams() {
//   const novel = await getListNovel();
//   if (!novel) throw new Error("Data not exist")
//   return novel.map((item) => ({ slug: item.id }));
// }

export default async function NovelPage({ params }: PageProps) {
  const data = await getNovelBySlug(params.slug);
  if (!data) return notFound();

  return (
    <main>
      <Container className="my-20">
        <h1 className="capitalize text-3xl font-semibold">{data.title}</h1>
        <div>
          <ul className="mt-5 h-80 overflow-y-auto space-y-1.5">
            {data.chapters.map(({ chapter_number }) => (
              <li key={Number(chapter_number)}>
                <Link
                  className={clsx(
                    "block",
                    "rounded",
                    "px-3 py-1.5",
                    "bg-gray-900 hover:opacity-80"
                  )}
                  href={`/novel/${params.slug}/${chapter_number}`}
                >
                  Chapter - {chapter_number}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </main>
  );
}
