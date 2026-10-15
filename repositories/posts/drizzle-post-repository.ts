import { Post } from "@/models/posts";
import { PostRepository } from ".";
import { drizzleDb } from "../../db";
import { postsTable } from "../../db/schemas";
import { eq } from "drizzle-orm";

export class DrizzlePostRepository implements PostRepository {
  async findAllPublished(): Promise<Post[]> {
    return await drizzleDb
      .select()
      .from(postsTable)
      .where(eq(postsTable.published, true));
  }

  async findById(): Promise<Post> {
    throw new Error("Method not implemented.");
  }

  async findBySlug(slug: string): Promise<Post> {
    const posts = await drizzleDb
      .select()
      .from(postsTable)
      .where(eq(postsTable.slug, slug));
    if (posts.length) {
      return posts[0];
    }
    throw new Error(`Post with slug ${slug} not found.`);
  }

  async findAll(): Promise<Post[]> {
    return drizzleDb.select().from(postsTable);
  }
}
