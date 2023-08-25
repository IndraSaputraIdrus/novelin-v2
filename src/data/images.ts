import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { UploadImages } from "../../typing";
import { storage } from "@/config/firebase";

export const uploadImageCover = async ({
  location,
  file,
  contentType,
}: UploadImages) => {
  const imageRef = ref(storage, location);

  await uploadBytes(imageRef, file, { contentType });
  const imageUrl = await getDownloadURL(imageRef);
  return imageUrl;
};
