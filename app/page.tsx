import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Loading } from "@/components/Loading";
import { PostFeatured } from "@/components/PostFeatured";
import { PostsList } from "@/components/PostsList";
import { Suspense } from "react";

export default function Home() {
  return (
    <Container>
      <Header />
      <Suspense fallback={<Loading />}>
        <PostFeatured />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <PostsList />
      </Suspense>
      <Footer />
    </Container>
  );
}
