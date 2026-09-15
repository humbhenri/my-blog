import { CoverImage } from "../CoverImage";
import { PostSummary } from "../PostSummary";
import { findAllPublicPosts } from "@/lib/post/queries";

export async function PostsList() {
  const posts = await findAllPublicPosts();

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {posts.slice(1).map((post) => (
        <div key={post.id} className="flex flex-col gap-4 group">
          <CoverImage src={post.cover} alt={post.title} href="#" />
          <PostSummary
            title={post.title}
            date={post.date}
            content={post.content}
            postHeading="h2"
            postLink={`/posts/${post.slug}`}
          />
        </div>
      ))}
    </section>
  );
}
