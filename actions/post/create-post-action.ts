'use server';

import { makePartialPublicPost, PublicPost } from '@/dtos/PublicPost';
import { PostCreateSchema } from '@/lib/post/validations';
import { Post } from '@/models/posts';
import { postRepository } from '@/repositories/posts';
import { getZodErrorMessages, slugify } from '@/utils';
import { updateTag } from 'next/cache';
import { redirect } from 'next/navigation';

type CreatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: true;
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

  console.log('formData', JSON.stringify(formDataObj));

  const newPost: Post = {
    date: new Date().toISOString(),
    id: formData.get('id')?.toString() || crypto.randomUUID(),
    slug: formData.get('slug')?.toString() || slugify(zodParseObj.data.title),
    ...zodParseObj.data,
  };

  console.log('newPost = ', JSON.stringify(newPost));

  try {
    await postRepository.create(newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: newPost,
        errors: [e.message],
      };
    }
    console.log(e);
    return {
      formState: newPost,
      errors: ['Unknow error'],
    };
  }
  updateTag('posts');
  redirect('/admin/post/' + newPost.id);
}
