"use client";

import { deletePostAction } from "@/actions/post/delete-action";
import { Trash2Icon } from "lucide-react";
import { useTransition } from "react";

type DeleteButtonProps = {
  id: string;
  title: string;
}

export function DeleteButton({ id, title }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (!confirm("Are you sure?")) return;
    startTransition(async () => {
      const res = await deletePostAction(id);
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title={`Apagar post ${title}`}
      className="cursor-pointer text-red-400 hover:scale-130 hover:text-red-800 transition disabled:cursor-not-allowed disabled:text-slate-600"
      disabled={isPending}
    >
      <Trash2Icon size={16} />
    </button>
  );
}
