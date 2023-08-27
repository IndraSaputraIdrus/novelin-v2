type Data = {
  id: number;
  title: string;
  slug: string;
  cover_img: string | null;
};

export type Novel = Omit<Data, "id">;

export type NovelChapter = {
  chapter_number: number;
  content: string;
};

export type UploadImages = {
  location: string;
  file: File;
  contentType: string;
};
