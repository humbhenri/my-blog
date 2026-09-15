import { Heading } from "../Heading";

type PostSummaryProps = {
  postHeading: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  postLink: string;
  date: string;
  title: string;
  content: string;
};

export function PostSummary({
  postHeading,
  postLink,
  date,
  title,
  content,
}: PostSummaryProps) {
  return (
    <div className="flex flex-col gap-4 sm:justify-center">
      <time className="text-slate-600 block text-sm/tight" dateTime={date}>
        {new Date(date).toLocaleString()}
      </time>
      <Heading as={postHeading} url={postLink}>
        {title}
      </Heading>
      <p>{content}</p>
    </div>
  );
}
