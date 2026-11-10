'use server';

import { makePartialPublicPost, makePublicPostFromDb, PublicPost } from '@/dtos/PublicPost';
import { verifyLoginSession } from '@/lib/login/manage-login';
import { PostUpdateSchema } from '@/lib/post/validations';
import { postRepository } from '@/repositories/posts';
import { getZodErrorMessages } from '@/utils';
import { updateTag } from 'next/cache';

type UpdatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: true;
};

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const id = formData.get('id')?.toString() || '';
  if (!id || typeof id !== 'string') {
    return {
      formState: prevState.formState,
      errors: ['Id not found'],
    };
  }

  const formDataObj = Object.fromEntries(formData.entries());
  const isAuthenticated = await verifyLoginSession();
  if (!isAuthenticated) {
    return {
      formState: makePartialPublicPost(formDataObj),
      errors: ['Faça login em outra aba antes de salvar'],
    };
  }

  const zodParseObj = PostUpdateSchema.safeParse(formDataObj);

  if (!zodParseObj.success) {
    return {
      formState: makePartialPublicPost(formDataObj),
      errors: getZodErrorMessages(zodParseObj.error.format()),
    };
  }

  const newPost = zodParseObj.data!;

  let post;
  try {
    post = await postRepository.update(id, newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: makePartialPublicPost(formDataObj),
        errors: [e.message],
      };
    }
    console.log(e);
    return {
      formState: makePartialPublicPost(formDataObj),
      errors: ['Unknow error'],
    };
  }
  updateTag('posts');
  updateTag(`post-${formData.get('slug')?.toString()}`);

  return {
    errors: [],
    formState: makePublicPostFromDb(post),
    success: true,
  };
}
