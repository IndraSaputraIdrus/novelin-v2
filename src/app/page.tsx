import Container from "@/components/Container";
import ListNovel from "@/components/ListNovel";

export default function Home() {
  return (
    <main>
      <Container className="mt-10">
        <div>
          <ListNovel />
        </div>
      </Container>
    </main>
  );
}
