import { useId } from "react";

type InputCheckboxProps = {
  labelText?: string;
  type?: "checkbox" | "radio";
} & React.ComponentProps<'input'>;

export function InputCheckBox({ labelText, type = "checkbox", ...props }: InputCheckboxProps) {
  const id = useId();
  return (
    <div className="flex gap-2">
      <input id={id} {...props} type={type} className="bg-white ring-slate-400 rounded py-2 px-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed readOnly:bg-gray-200" />
      {labelText && (
        <label className="text-sm" htmlFor={id}>{labelText}</label>
      )}
    </div>
  )
}
