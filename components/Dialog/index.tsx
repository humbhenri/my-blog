"use client";

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
          <button autoFocus type="button" className="rounded-lg bg-slate-300 hover:bg-slate-400 transition p-2 cursor-pointer disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed" onClick={onCancel} disabled={disabled}>Cancelar</button>
          <button type="button" className="rounded-lg bg-blue-500 hover:bg-blue-600 transition p-2 cursor-pointer text-white disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed" onClick={onConfirm} disabled={disabled}>Ok</button>
        </div>
      </div>
    </div>
  )
}
