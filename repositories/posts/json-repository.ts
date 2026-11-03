import type { Post } from '../../models/posts/index.ts';
import path from 'path';
import fs from 'fs/promises';
import type { PostRepository } from './index.ts';
import { asyncDelay } from '../../utils/index.ts';

export class JsonPostRepository implements PostRepository {
  create(post: Post): Promise<Post> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<Post> {
    throw new Error('Method not implemented.');
  }
  update(id: string, newPost: Omit<Post, 'id' | 'slug' | 'date'>): Promise<Post> {
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<Post[]> {
    const file = path.join(process.cwd(), 'db', 'posts.json');
    const data = await fs.readFile(file, 'utf-8');
    const posts = JSON.parse(data) as Post[];
    return posts;
  }

  async findAllPublished(): Promise<Post[]> {
    const file = path.join(process.cwd(), 'db', 'posts.json');
    const data = await fs.readFile(file, 'utf-8');
    await asyncDelay(500);
    const posts = JSON.parse(data) as Post[];
    return posts.filter((post) => post.published);
  }

  async findById(id: string): Promise<Post> {
    const file = path.join(process.cwd(), 'db', 'posts.json');
    const data = await fs.readFile(file, 'utf-8');
    const posts = JSON.parse(data) as Post[];
    const res = posts.filter((post) => post.id === id);
    if (res.length) {
      return res[0];
    }
    throw new Error(`Post with id ${id} not found`);
  }

  async findBySlug(slug: string): Promise<Post> {
    const file = path.join(process.cwd(), 'db', 'posts.json');
    const data = await fs.readFile(file, 'utf-8');
    const posts = JSON.parse(data) as Post[];
    const res = posts.filter((post) => post.published && post.slug === slug);
    if (res.length) {
      return res[0];
    }
    throw new Error(`Post with slug ${slug} not found`);
  }
}
