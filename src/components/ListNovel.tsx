import { getListNovel } from "@/libs/fetch";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const formatIdToTitle = async (id: string) => {
  return id.split("-").join(" ");
};

export default async function ListNovel() {
  const data = await getListNovel();
  if (!data) return notFound();
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
