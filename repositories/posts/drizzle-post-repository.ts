import type { Post } from "../../models/posts/index.ts";
import type { PostRepository } from "./index.ts";
import { drizzleDb } from "../../db/index.ts";
import { postsTable } from "../../db/schemas.ts";
import { desc } from "drizzle-orm";

export class DrizzlePostRepository implements PostRepository {
  async findAllPublished(): Promise<Post[]> {
    return await drizzleDb.query.posts.findMany({
      orderBy: desc(postsTable.date),
      where: (posts, { eq }) => eq(posts.published, true),
    });
  }

  async findById(id: string): Promise<Post> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.slug, id),
    });
    if (post) {
      return post;
    }

    throw new Error(`Post with id ${id} not found.`);
  }

  async findBySlug(slug: string): Promise<Post> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq, and }) =>
        and(eq(posts.published, true), eq(posts.slug, slug)),
    });
    if (post) {
      return post;
    }

    throw new Error(`Post with slug ${slug} not found.`);
  }

  async findAll(): Promise<Post[]> {
    return await drizzleDb.query.posts.findMany({
      orderBy: desc(postsTable.date),
    });
  }
}
