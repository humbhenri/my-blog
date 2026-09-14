import { postRepository } from "@/repositories/posts";
import { Heading } from "../Heading";
import { CoverImage } from "../CoverImage";

export async function PostsList() {
  const posts = await postRepository.findAll();

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {posts.map((post) => (
        <div key={post.id} className="flex flex-col gap-4 group">
          <CoverImage src={post.cover} alt={post.title} href="#" />
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
        </div>
      ))}
    </section>
  );
}
