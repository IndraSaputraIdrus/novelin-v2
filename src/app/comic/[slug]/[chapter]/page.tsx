import Loading from "@/components/Loading";

interface PageProps {
  params: {
    chapter: number;
  };
}

export default function ComicChapter({ params }: PageProps) {
  return (
    <div>
      <Loading />
    </div>
  );
}
