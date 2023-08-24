import { database } from "@/libs/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

export async function getAllChapter(slug: string) {
  try {
    const chapterRef = collection(database, "novel", slug, "chapter");
    const queryChapter = query(chapterRef, orderBy("chapter", "desc"));
    const dataChapter = await getDocs(queryChapter);

    if (!dataChapter) return undefined;

    const chapters = dataChapter.docs.map((doc) => ({ chapter: doc.id }));

    return chapters;
  } catch (error) {
    console.log(error);
  }
}

export async function getData(chapter: string, slug: string) {
  try {
    const docRef = doc(database, "novel", slug, "chapter", chapter);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return undefined;

    const data = docSnap.data();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getListNovel() {
  try {
    const novelRef = collection(database, "novel");

    const novelSnap = await getDocs(novelRef);

    if (!novelSnap) return undefined;

    const novels = novelSnap.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    return novels;
  } catch (error) {
    console.log(error);
  }
}
