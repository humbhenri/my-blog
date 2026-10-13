import { Post } from "@/models/posts";
import path from "path";
import fs from "fs/promises";

export interface PostRepository {
  findAllPublished(): Promise<Post[]>;
  findById(): Promise<Post>;
  findBySlug(slug: string): Promise<Post>;
}

export class JsonPostRepository implements PostRepository {
  async findAllPublished(): Promise<Post[]> {
    const file = path.join(process.cwd(), "db", "posts.json");
    const data = await fs.readFile(file, "utf-8");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
    const posts = JSON.parse(data) as Post[];
    return posts.filter((post) => post.published);
  }

  async findById(): Promise<Post> {
    throw new Error("TODO");
  }

  async findBySlug(slug: string): Promise<Post> {
    const file = path.join(process.cwd(), "db", "posts.json");
    const data = await fs.readFile(file, "utf-8");
    const posts = JSON.parse(data) as Post[];
    const res = posts.filter((post) => post.published && post.slug === slug);
    if (res.length) {
      return res[0];
    }
    throw new Error(`Post with slug ${slug} not found`);
  }
}

export const postRepository: PostRepository = new JsonPostRepository();
