"use client";

import { useHistoryStore } from "@/stores/history-store";
import { useEffect } from "react";

export default function SetHistory({
  slug,
  chapter,
}: { slug: string; chapter: number }) {
  const setHistory = useHistoryStore((state) => state.setHistory);

  useEffect(() => {
    setHistory(slug, chapter);
  }, []);

  return null;
}
