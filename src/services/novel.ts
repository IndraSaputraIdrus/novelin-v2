import {
  createNovelChapter,
  createNovelTitle,
  findContentNovel,
  findIdNovelBySlug,
  findManyNovel,
  findNovel,
  paginationChapter,
} from "@/data/novel";
import { NovelChapter, Novel } from "../../typing";

export const insertNovelTitle = async (data: Novel) => {
  const result = await createNovelTitle(data);
  if (!result) throw new Error("Data not exist");

  return result;
};

export const insertNovelChapter = async ({
  content,
  chapter_number,
  slug,
}: NovelChapter & { slug: string }) => {
  const result = await createNovelChapter({ content, chapter_number, slug });

  return result;
};

export const getAllNovel = async () => {
  const result = await findManyNovel();
  if (!result) throw new Error("Data not exist");

  return result;
};

export const getNovelBySlug = async (slug: string) => {
  const result = await findNovel(slug);
  if (!result) throw new Error("Data not exist");

  return result;
};

export const getContentNovelByChapter = async (
  slug: string,
  chapterNumber: number
) => {
  const novel = await findIdNovelBySlug(slug);
  if (!novel) throw new Error("Data not exist");
  const result = await findContentNovel(novel.id, chapterNumber);
  if (!result) throw new Error("Data not exist");

  return result;
};

export const getNextChapter = async (
  id: number,
  current: number,
  titleId: number
) => {
  const result = await paginationChapter(id, current, titleId, 1);
  if (!result || !result.chapters || result.chapters.length < 1) return false;
  return result.chapters[0].chapter_number;
};

export const getPrevChapter = async (
  id: number,
  current: number,
  titleId: number
) => {
  const result = await paginationChapter(id, current, titleId, -1);
  if (!result || !result.chapters || result.chapters.length < 1) return false;
  return result.chapters[0].chapter_number;
};
