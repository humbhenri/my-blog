import type { Post } from "../../models/posts/index.ts";
import path from "path";
import fs from "fs/promises";
import { PostRepository } from "./index.ts";

export class JsonPostRepository implements PostRepository {
  async findAll(): Promise<Post[]> {
    const file = path.join(process.cwd(), "db", "posts.json");
    const data = await fs.readFile(file, "utf-8");
    const posts = JSON.parse(data) as Post[];
    return posts;
  }

  async findAllPublished(): Promise<Post[]> {
    const file = path.join(process.cwd(), "db", "posts.json");
    const data = await fs.readFile(file, "utf-8");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
    const posts = JSON.parse(data) as Post[];
    return posts.filter((post) => post.published);
  }

  async findById(id: string): Promise<Post> {
    const file = path.join(process.cwd(), "db", "posts.json");
    const data = await fs.readFile(file, "utf-8");
    const posts = JSON.parse(data) as Post[];
    const res = posts.filter((post) => post.id === id);
    if (res.length) {
      return res[0];
    }
    throw new Error(`Post with id ${id} not found`);
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
