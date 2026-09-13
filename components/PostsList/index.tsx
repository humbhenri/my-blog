import { postRepository } from "@/repositories/posts";
import { Heading } from "../Heading";
import { CoverImage } from "../CoverImage";

export async function PostsList() {
  const posts = await postRepository.findAll();

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="p-4"
        >
          <CoverImage src={post.cover} alt={post.title} href="#" />
          <Heading url="#" as="h4">
            {post.title}
          </Heading>
          <p className="text-sm text-gray-500">
            By {post.author} on {new Date(post.date).toLocaleDateString()}
          </p>
        </div>
      ))}
    </section>
  );
}
