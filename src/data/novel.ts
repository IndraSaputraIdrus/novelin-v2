import prisma from "@/config/prisma";
import { Novel, NovelChapter } from "../../typing";

export const createNovelTitle = async (data: Novel) => {
  const result = await prisma.novel_Title.create({
    data,
  });

  return result;
};

export const findManyNovel = async () => {
  const result = await prisma.novel_Title.findMany({
    orderBy: {
      id: "desc",
    },
  });
  return result;
};

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
        orderBy: {
          chapter_number: "desc",
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

export const findContentNovel = async (
  title_id: number,
  chapterNumber: number,
) => {
  const result = await prisma.novel_Chapter.findFirst({
    where: {
      title_id,
      chapter_number: chapterNumber,
    },
  });

  return result;
};

export const paginationChapter = async (
  id: number,
  current: number,
  title_id: number,
  value: number,
) => {
  const result = await prisma.novel_Title.findFirst({
    where: {
      id: title_id,
    },
    select: {
      chapters: {
        orderBy: {
          chapter_number: "asc",
        },
        skip: 1,
        take: value,
        cursor: {
          id,
          title_id,
          chapter_number: current,
        },
        select: {
          chapter_number: true,
        },
      },
    },
  });

  return result
};
