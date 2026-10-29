import type { Metadata } from 'next';
import { PostForm } from '@/components/Admin/PostForm';

export const metadata: Metadata = {
  title: 'New Post',
};

export default function AdminPostNewPage() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-extrabold">Create post</h1>
      <PostForm />
    </div>
  );
}
