type ErrorMessageProps = {
  pageTitle: string;
  contentTitle: string;
  content: React.ReactNode;
};

export default function ErrorMessage({
  pageTitle,
  contentTitle,
  content,
}: ErrorMessageProps) {
  return (
    <>
      <title>{pageTitle}</title>
      <div className="min-h-[320px] bg-slate-900 text-slate-100 mb-16 p-8 rounded-xl flex items-center justify-center textj-center">
        <div>
          <h1 className="text-7x1/tight mb-4 font-extrabold">{contentTitle}</h1>
          <div>{content}</div>
        </div>
      </div>
    </>
  );
}
