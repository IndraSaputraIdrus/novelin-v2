"use client";

import { useHistoryStore } from "@/stores/history-store";
import Link from "next/link";
import { Suspense } from "react";

export default function LatestRead(
  { slug }: { slug: string; chapterNumber: number },
) {
  const getHistory = useHistoryStore((state) => state.getHistory);

  const latestRead = getHistory(slug);

  return (
    <Suspense>
      {latestRead
        ? (
          <p className="flex items-center mt-2 text-slate-600 ">
            Latest Read:
            <Link
              className={"ml-2 block hover:text-white"}
              href={`${slug}/${latestRead.chapter}`}
            >
              Chapter {latestRead.chapter}
            </Link>
          </p>
        )
        : null}
    </Suspense>
  );
}
