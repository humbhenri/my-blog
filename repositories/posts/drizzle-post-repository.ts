import type { Post } from '../../models/posts/index.ts';
import type { PostRepository } from './index.ts';
import { drizzleDb } from '../../db/index.ts';
import { postsTable } from '../../db/schemas.ts';
import { desc, eq } from 'drizzle-orm';

export class DrizzlePostRepository implements PostRepository {
  async findAllPublished(): Promise<Post[]> {
    return await drizzleDb.query.posts.findMany({
      orderBy: desc(postsTable.date),
      where: (posts, { eq }) => eq(posts.published, true),
    });
  }

  async findById(id: string): Promise<Post> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });
    if (post) {
      return post;
    }

    throw new Error(`Post with id ${id} not found.`);
  }

  async findBySlug(slug: string): Promise<Post> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq, and }) => and(eq(posts.published, true), eq(posts.slug, slug)),
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

  async create(post: Post): Promise<Post> {
    console.log(post);
    const exists = await drizzleDb.query.posts.findFirst({
      where: (posts, { or, eq }) => or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
      columns: { id: true },
    });
    console.log('exists', JSON.stringify(exists));
    if (!!exists) {
      throw new Error('Id or slug are unique');
    } else {
      console.log('unique');
    }
    await drizzleDb.insert(postsTable).values(post);
    return post;
  }

  async delete(id: string): Promise<Post> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });
    if (!post) {
      throw new Error('Post not found');
    }
    await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));
    return post;
  }

  async update(id: string, newPost: Omit<Post, 'id' | 'slug' | 'date'>): Promise<Post> {
    const oldPost = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });
    if (!oldPost) {
      throw new Error('Post not found');
    }

    const postData = {
      author: newPost.author,
      title: newPost.title,
      content: newPost.content,
      cover: newPost.cover,
      published: newPost.published,
      date: new Date().toISOString(),
    };

    await drizzleDb.update(postsTable).set(postData).where(eq(postsTable.id, id));

    return { ...oldPost, ...postData };
  }
}
