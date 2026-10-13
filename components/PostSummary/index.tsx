import { Heading } from "../Heading";
import { PostDate } from "../PostDate";

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
      <PostDate dateTime={date} />
      <Heading as={postHeading} url={postLink}>
        {title}
      </Heading>
      <p>{content}</p>
    </div>
  );
}
