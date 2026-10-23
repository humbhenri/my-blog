import { CoverImage } from "../CoverImage";
import { PostSummary } from "../PostSummary";
import { findAllPublicPostsCached } from "@/lib/post/queries";

export async function PostFeatured() {
  const posts = await findAllPublicPostsCached();
  if (posts.length === 0) {
    return null;
  }

  const post = posts[0];

  return (
    <section className="grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group">
      {post && (
        <>
          <CoverImage
            src={post.cover}
            alt={post.title}
            href={`/post/${post.slug}`}
          />
          <PostSummary
            postLink={`/post/${post.slug}`}
            title={post.title}
            date={post.date}
            content={post.content}
            postHeading="h2"
          />
        </>
      )}
    </section>
  );
}
