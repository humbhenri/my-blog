import { Loading } from "@/components/Loading";
import { SinglePost } from "@/components/SinglePost";
import { findPostBySlugCached } from "@/lib/post/queries";
import { Post } from "@/models/posts";
import { Metadata } from "next";
import { Suspense } from "react";

type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post: Post = await findPostBySlugCached(slug);
  return {
    title: post.title,
  };
}

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params;

  return (
    <Suspense
      fallback={<Loading />}
      children={<SinglePost slug={slug} />}
    ></Suspense>
  );
}
