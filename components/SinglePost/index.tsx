import { findPostBySlugCached } from "@/lib/post/queries";
import Image from "next/image";
import { Heading } from "../Heading";
import { PostDate } from "../PostDate";
import { SafeMarkdown } from "../SafeMarkdown";

type SinglePostProps = {
  slug: string;
};

export async function SinglePost({ slug }: SinglePostProps) {
  const post = await findPostBySlugCached(slug);
  return (
    <>
      <header className="group flex flex-col gap-4 mb-4">
        <Image
          src={post.cover}
          width={1200}
          height={720}
          alt={post.title}
          className="rounded-xl"
        />
        <Heading url={`${post.slug}`}>{post.title}</Heading>
        <p>
          {post.author} | <PostDate dateTime={post.date} />
        </p>
      </header>
      <SafeMarkdown markdown={post.content} />
    </>
  );
}
