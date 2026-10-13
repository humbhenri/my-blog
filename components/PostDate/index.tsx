type PostDateProps = {
  dateTime: string;
};

export async function PostDate({ dateTime }: PostDateProps) {
  return (
    <time className="text-slate-600 text-sm/tight" dateTime={dateTime}>
      {new Date(dateTime).toLocaleString()}
    </time>
  );
}
