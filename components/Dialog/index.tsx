"use client";

import { Button } from "../Button";

type DialogProps = {
  title: string;
  content: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  disabled: boolean;
}

export function Dialog({ title, content, onCancel, onConfirm, disabled }: DialogProps) {
  return (
    <div
      className="fixed z-50 inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center shadow-lg shadow-black/30 text-center"
    >
      <div
        className="bg-slate-100 p-6 rounded-lg max-w-2xl mx-6 flex flex-col gap-6" role="dialog"
      >
        <h3 className="text-xl font-extrabold">{title}</h3>
        <div>{content}</div>
        <div className="flex items-center justify-around">
          <Button autoFocus type="button" variant="ghost" onClick={onCancel} disabled={disabled}>Cancelar</Button>
          <Button type="button" variant="default" onClick={onConfirm} disabled={disabled}>Ok</Button>
        </div>
      </div>
    </div>
  )
}
