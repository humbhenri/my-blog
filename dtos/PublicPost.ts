import { Post } from '@/models/posts';

export type PublicPost = Omit<Post, 'date'>;

export const makePublicPostFromDb = (post: Post): PublicPost => {
  return makePartialPublicPost(post);
};

export const makePartialPublicPost = (post?: Partial<Post>): PublicPost => {
  return {
    id: post?.id || '',
    slug: post?.slug || '',
    title: post?.title || '',
    author: post?.author || '',
    content: post?.content || '',
    cover: post?.cover || '',
    published: post?.published || false,
  };
};
