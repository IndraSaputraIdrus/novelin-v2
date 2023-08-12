interface PageProps {
  params: {
    slug: string;
  };
}

export default function ComicPage({ params }: PageProps) {
  return <h1>Comic Page: {params.slug}</h1>;
}
