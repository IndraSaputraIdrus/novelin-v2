import { database } from "@/libs/firebase";
import clsx from "clsx";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

const getListNovel = async () => {
  try {
    const novelRef = collection(database, "novel");

    const novelSnap = await getDocs(novelRef);
    const novels = novelSnap.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    return novels;
  } catch (error) {
    console.log(error);
  }
};

const formatIdToTitle = async (id: string) => {
  return id.split("-").join(" ");
};

export default async function ListNovel() {
  const data = await getListNovel();

  if (!data) return <h1>error</h1>;

  return (
    <div>
      <h1 className="text-5xl font-semibold mb-5">List Novel</h1>
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-5">
        {data.map((item) => (
          <li key={item.id}>
            <Link href={`/novel/${item.id}`}>
              <article className="w-full h-72 sm:h-52 relative rounded-md overflow-hidden cursor-pointer">
                <Image
                  src={item.data.image}
                  loading="lazy"
                  alt={item.id}
                  fill={true}
                  className="object-cover transition hover:scale-110"
                />
                <div
                  className={clsx(
                    "absolute z-10 bottom-0 inset-x-0",
                    "bg-gradient-to-t from-black to-black/40",
                    "py-3 px-2 text-center flex items-center justify-center"
                  )}
                >
                  <h2 className="capitalize truncate">
                    {formatIdToTitle(item.id)}
                  </h2>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
