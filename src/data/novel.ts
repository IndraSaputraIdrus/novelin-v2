import prisma from "@/config/prisma";
import { NovelChapter, Novel } from "../../typing";

export const createNovelTitle = async (data: Novel) => {
  const result = await prisma.novel_Title.create({
    data,
  });

  return result;
};

export const findManyNovel = async () => {
  const result = await prisma.novel_Title.findMany();
  return result;
};

// export const findUniqueNovelTitle = async (slug: string) => {
//   const result = await prisma.novel_Title.findUnique({
//     where: {
//       slug,
//     },
//   });
//
//   return result;
// };

export const createNovelChapter = async ({
  content,
  chapter_number,
  slug,
}: NovelChapter & { slug: string }) => {
  const result = await prisma.novel_Title.update({
    where: {
      slug,
    },
    data: {
      chapters: {
        create: {
          chapter_number,
          content,
        },
      },
    },
    include: {
      chapters: {
        orderBy: {
          id: "desc",
        },
        take: 1,
      },
    },
  });

  return result;
};

export const findNovel = async (slug: string) => {
  const result = await prisma.novel_Title.findUnique({
    where: {
      slug,
    },
    include: {
      chapters: {
        select: {
          chapter_number: true,
        },
      },
    },
  });

  return result;
};

export const findIdNovelBySlug = async (slug: string) => {
  const result = await prisma.novel_Title.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
    },
  });

  return result;
};

export const findContentNovel = async (title_id: number, chapterId: number) => {
  const result = await prisma.novel_Chapter.findUnique({
    where: {
      title_id,
      id: chapterId,
    },
  });

  return result;
};
