import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import defaultImg from "@/libs/defaultImg";
import { Data } from "../../typing";

type ListProps = {
  title: string;
  data: Data[];
};

export default async function List({ title, data }: ListProps) {
  return (
    <div>
      <h1 className="text-5xl font-semibold mb-5">{title}</h1>
      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-5">
        {data.map((item) => (
          <li key={item.id}>
            <Link href={`/novel/${item.slug}`}>
              <article className="w-full h-72 sm:h-52 relative rounded-md overflow-hidden cursor-pointer">
                <Image
                  src={item.cover_img || defaultImg}
                  loading="lazy"
                  alt={item.title}
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
                  <h2 className="capitalize truncate">{item.title}</h2>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
