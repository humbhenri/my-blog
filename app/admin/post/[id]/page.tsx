type AdminPostIdPageProps = {
  params: Promise<{ id: string }>
}
export default function AdminPostIdPage({ params }: AdminPostIdPageProps) {
  return (
    <div className="py-16 text-6xl">Id Page</div>
  );
}
