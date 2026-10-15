import type { Post } from "../../models/posts/index.ts";
import { DrizzlePostRepository } from "./drizzle-post-repository.ts";

export interface PostRepository {
  findAllPublished(): Promise<Post[]>;
  findById(id: string): Promise<Post>;
  findBySlug(slug: string): Promise<Post>;
  findAll(): Promise<Post[]>;
}

export const postRepository: PostRepository = new DrizzlePostRepository();
