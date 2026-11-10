'use server';

import { verifyLoginSession } from '@/lib/login/manage-login';
import { postRepository } from '@/repositories/posts';

import { updateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  const isAuthenticated = await verifyLoginSession();
  if (!isAuthenticated) {
    return {
      errors: 'Faça login em outra aba antes de salvar',
    };
  }

  if (!id || typeof id != 'string') {
    return {
      error: 'Invalid input',
    };
  }

  try {
    await postRepository.delete(id);
  } catch (e) {
    if (e instanceof Error) {
      return {
        error: e.message,
      };
    }
    console.log(e);
    return {
      error: 'Unknown error',
    };
  }

  updateTag('posts');

  console.log(`deleting post ${id}`);
  return {
    error: '',
  };
}
