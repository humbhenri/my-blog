import { PostForm } from '@/components/Admin/PostForm';
import { findPostByIdAdmin } from '@/lib/post/admin_queries';
import type { Metadata } from 'next';
type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: 'Edit post',
};

export default async function AdminPostIdPage({ params }: AdminPostIdPageProps) {
  const id = (await params).id;
  const post = await findPostByIdAdmin(id);
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-extrabold">Create post</h1>
      <PostForm post={post} />
    </div>
  );
}
