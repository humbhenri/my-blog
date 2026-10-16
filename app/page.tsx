import { Loading } from "@/components/Loading";
import { PostFeatured } from "@/components/PostFeatured";
import { PostsList } from "@/components/PostsList";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <PostFeatured />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <PostsList />
      </Suspense>
    </>
  );
}
