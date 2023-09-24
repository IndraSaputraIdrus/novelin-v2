import Container from "@/app/components/Container";
import List from "@/app/components/List";
import { getAllNovel } from "@/services/novel";

export const revalidate = 300

export default async function Home() {
  const novelData = await getAllNovel();

  return (
    <main>
      <Container className="my-10">
        <div>
          <List title="List Novel" data={novelData} />
        </div>
      </Container>
    </main>
  );
}
