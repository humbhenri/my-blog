'use server';

import { drizzleDb } from '@/db';
import { postsTable } from '@/db/schemas';
import { makePartialPublicPost, PublicPost } from '@/dtos/PublicPost';
import { PostCreateSchema } from '@/lib/post/validations';
import { Post } from '@/models/posts';
import { getZodErrorMessages, slugify } from '@/utils';
import { updateTag } from 'next/cache';
import { redirect } from 'next/navigation';

type CreatePostActionState = {
  formState: PublicPost;
  errors: string[];
};

export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  // TODO verify is user is logged

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const formDataObj = Object.fromEntries(formData.entries());

  const zodParseObj = PostCreateSchema.safeParse(formDataObj);

  if (!zodParseObj.success) {
    return {
      formState: makePartialPublicPost(formDataObj),
      errors: getZodErrorMessages(zodParseObj.error.format()),
    };
  }

  const newPost: Post = {
    date: new Date().toISOString(),
    id: crypto.randomUUID(),
    slug: slugify(zodParseObj.data.title),
    ...zodParseObj.data,
  };

  // TODO move to repository
  await drizzleDb.insert(postsTable).values(newPost);
  updateTag('posts');
  redirect('/admin/post/' + newPost.id);
}
