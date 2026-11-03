import type { Post } from '../../models/posts/index.ts';
import { DrizzlePostRepository } from './drizzle-post-repository.ts';

export interface PostRepository {
  findAllPublished(): Promise<Post[]>;
  findById(id: string): Promise<Post>;
  findBySlug(slug: string): Promise<Post>;
  findAll(): Promise<Post[]>;
  create(post: Post): Promise<Post>;
  delete(id: string): Promise<Post>;
  update(id: string, newPost: Omit<Post, 'id' | 'slug' | 'date'>): Promise<Post>;
}

export const postRepository: PostRepository = new DrizzlePostRepository();
