import { DeleteButton } from "@/components/Admin/DeleteButton";
import { findAllPostsAdmin } from "@/lib/post/admin_queries";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Post Admin',
};

export default async function AdminPost() {
  const posts = await findAllPostsAdmin();

  const style = (published: boolean) => published ? "py-2 px-2" : "py-2 px-2 bg-slate-300";

  return (
    <>
      <div className="py-16 text-1xl">
        {
          posts.map(p => (
            <div key={p.id} className={`${style(p.published)} flex gap-2 items-center justify-between`}>
              <Link href={`/admin/post/${p.id}`}>
                {p.title}
              </Link>
              {!p.published && <span className="text-xs text-slate-600 italic">(Não publicado)</span>}
              <DeleteButton id={p.id} title={p.title} />
            </div>
          ))
        }
      </div >
    </>
  )
}
