import MDEditor from "@uiw/react-md-editor";
import { useId } from "react";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

type EditorProps = {
  textAreaName: string;
  disabled?: boolean;
  labelText?: string;
  value: string;
  setValue: (value: string) => void;
};

export function Editor({ labelText = '', value, setValue, textAreaName, disabled = false }: EditorProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      {labelText && (
        <label htmlFor={id}>{labelText}</label>
      )}
      <MDEditor
        className="whitespace-pre-wrap"
        value={value}
        onChange={value => {
          if (value === undefined) return;
          setValue(value);
        }}
        height={400}
        extraCommands={[]}
        preview="edit"
        hideToolbar={disabled}
        textareaProps={{
          id,
          name: textAreaName,
          disabled
        }}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
          remarkPlugins: [[remarkGfm]]
        }}
      />
    </div>
  );
}