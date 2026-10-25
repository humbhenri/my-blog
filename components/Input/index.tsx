import { useId } from "react";

type InputProps = {
  labelText?: string;
} & React.ComponentProps<'input'>;

export function Input({ labelText, ...props }: InputProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2">
      {labelText && (
        <label htmlFor={id}>{labelText}</label>
      )}
      <input id={id} {...props} className="bg-white outline-0 ring-2 ring-slate-400 rounded py-2 px-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed readOnly:bg-gray-200" />
    </div>
  )
}
