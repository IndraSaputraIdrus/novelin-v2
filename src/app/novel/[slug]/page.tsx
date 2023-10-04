import Container from "@/components/Container";
import LatestRead from "@/components/LatestRead";
import { getAllNovel, getNovelBySlug } from "@/services/novel";
import clsx from "clsx";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 300;

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const { slug } = params;

  const data = await getNovelBySlug(slug);

  if (!data) {
    return {
      title: "Page not found",
    };
  }
  return {
    title: `Novelin | ${data.title}`,
  };
}

export async function generateStaticParams() {
  const slug = await getAllNovel();
  if (!slug) throw new Error("Novel not exist");
  return slug.map((item) => ({
    slug: item.slug,
  }));
}

export default async function NovelPage({ params }: PageProps) {
  const data = await getNovelBySlug(params.slug);
  if (!data) return notFound();

  return (
    <main>
      <Container className="my-20">
        <h1 className="capitalize text-3xl font-semibold">{data.title}</h1>
        <div>
          <LatestRead slug={params.slug} chapterNumber={15} />
          <ul className="mt-5 h-80 overflow-y-auto space-y-1.5">
            {data.chapters.map(({ chapter_number }) => (
              <li key={Number(chapter_number)}>
                <Link
                  className={clsx(
                    "block",
                    "rounded",
                    "px-3 py-1.5",
                    "bg-gray-900 hover:opacity-80",
                  )}
                  href={`${params.slug}/${chapter_number}`}
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
