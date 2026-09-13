import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { PostsList } from "@/components/PostsList";
import { Suspense } from "react";

export default function Home() {
  return (
    <Container>
      <Header />
      <main className="flex flex-2">
        <Suspense fallback={<Loading />}>
          <PostsList />
        </Suspense>
      </main>
      <Footer />
    </Container>
  );
}
