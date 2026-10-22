"use server";

import { drizzleDb } from "@/db";
import { postsTable } from "@/db/schemas";
import { postRepository } from "@/repositories/posts";
import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";

export async function deletePostAction(id: string) {
  // TODO checar login do usuário

  if (!id || typeof id != 'string') {
    return {
      error: 'Invalid input'
    };
  }

  const post = await postRepository.findById(id).catch((e) => {
    console.error(e)
  });
  if (!post) {
    return {
      error: `Post ${id} not found`
    }
  };

  await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));

  updateTag('posts');
  updateTag(`post-${post.slug}`)

  console.log(`deleting post ${id}`);
  return {
    error: ''
  }
}
