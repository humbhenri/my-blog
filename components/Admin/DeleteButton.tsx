"use client";
import { toast } from "react-toastify";
import { deletePostAction } from "@/actions/post/delete-action";
import { Trash2Icon } from "lucide-react";
import { useState, useTransition } from "react";
import { Dialog } from "../Dialog";

type DeleteButtonProps = {
  id: string;
  title: string;
}

export function DeleteButton({ id, title }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showDialog, setShowDialog] = useState(false);

  const handleClick = () => {
    toast.dismiss();
    setShowDialog(true);
  };

  function handleConfirm() {
    startTransition(async () => {
      const res = await deletePostAction(id);
      if (res.error) {
        toast.error(`Erro: ${res.error}`);
      } else {
        toast.success('Post apagado com sucesso!');
      }
      setShowDialog(false);
    });
  }

  function handleCancel() {
    setShowDialog(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        title={`Apagar post ${title}`}
        className="cursor-pointer text-red-400 hover:scale-130 hover:text-red-800 transition disabled:cursor-not-allowed disabled:text-slate-600"
        disabled={isPending}
      >
        <Trash2Icon size={16} />
      </button>
      {showDialog && (
        <Dialog
          title="Apagar post?"
          content={<p>Tem certeza que deseja apagar: {title}?</p>}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          disabled={isPending}
        />
      )}
    </>
  );
}
