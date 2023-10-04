import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import defaultImg from "@/libs/defaultImg";
import { Data } from "../../../typing";

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
              <article
                className={clsx(
                  "rounded-lg",
                  "overflow-hidden cursor-pointer",
                  "transition",
                  "shadow-md shadow-gray-800",
                  "hover:opacity-70"
                )}
              >
                <div
                  className={clsx(
                    "w-full h-60 sm:h-52",
                    "relative",
                  )}
                >
                  <Image
                    src={item.cover_img || defaultImg}
                    loading="lazy"
                    alt={item.title}
                    fill={true}
                  />
                </div>
                <div
                  className={clsx(
                    "bg-slate-100 text-gray-950",
                    "py-3 px-2 text-center flex items-center justify-center",
                  )}
                >
                  <h2 className="font-semibold capitalize truncate">{item.title}</h2>
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
