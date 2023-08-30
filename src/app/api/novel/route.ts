import {
  getAllNovel,
  getContentNovelByChapter,
  getNovelBySlug,
} from "@/services/novel";
import { NextResponse } from "next/server";
import { NovelChapter, NovelDetail } from "../../../../typing";

type BodyType = {
  slug: string;
  chapter?: number;
  viewAll?: boolean;
};

export const GET = async () => {
  try {
    const data = await getAllNovel();
    if (!data) throw new Error("Novel not exist");

    return NextResponse.json({
      data,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
};

export const POST = async (req: Request) => {
  try {
    const body: BodyType = await req.json();
    const chapter = body.chapter;
    const slug = body.slug;
    const viewAll = body.viewAll;
    let data: NovelDetail | NovelChapter | undefined;

    if (!chapter) {
      data = await getNovelBySlug(body.slug);
      if (!data) throw new Error();
      if (!viewAll) {
        data = { ...data, chapters: data.chapters.slice(0, 10) };
      }
    } else {
      data = await getContentNovelByChapter(slug, chapter);
    }

    if (!data) throw new Error("Novel not exist");

    return NextResponse.json({
      data,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Please pass a body correctly",
    });
  }
};
