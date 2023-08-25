import { uploadImageCover } from "@/data/images";
import { UploadImages } from "../../typing";

export const insertImageCover = async ({
  file,
  location,
  contentType,
}: UploadImages) => {
  const result = await uploadImageCover({
    file,
    location,
    contentType,
  });

  return result;
};
