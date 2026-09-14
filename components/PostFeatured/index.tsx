import { Post } from "@/models/posts";
import { CoverImage } from "../CoverImage";
import { Heading } from "../Heading";

export function PostFeatured() {
  const post: Post = {
    id: "test",
    title: "test",
    content: "moot",
    date: "",
    author: "Me",
    cover: "",
  };
  return (
    <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
      <CoverImage
        src={post.cover}
        alt={post.title}
        href={`/posts/${post.id}`}
      />
      <div className="flex flex-col gap-4 sm:justify-center">
        <time
          className="text-slate-600 block text-sm/tight"
          dateTime={post.date}
        >
          {new Date(post.date).toLocaleString()}
        </time>
        <Heading as="h2" url="#">
          {post.title}
        </Heading>
        <p>{post.content}</p>
      </div>
    </section>
  );
}
