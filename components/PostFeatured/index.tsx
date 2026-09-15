import { CoverImage } from "../CoverImage";
import { PostSummary } from "../PostSummary";
import { findAllPublicPosts } from "@/lib/post/queries";

export async function PostFeatured() {
  const posts = await findAllPublicPosts();
  const post = posts[0];

  return (
    <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
      <CoverImage
        src={post.cover}
        alt={post.title}
        href={`/posts/${post.id}`}
      />
      <PostSummary 
        postLink={`/posts/${post.slug}` }
        title={post.title}
        date={post.date}
        content={post.content}
        postHeading="h2"
      />
    </section>
  );
}
