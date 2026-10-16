import Link from "next/link";

export function Header() {
  return (
    <header>
      <h1 className="text-4xl font-extrabold sm:py-10 md:py-10 py-8">
        <Link href="/">My Blog</Link>
      </h1>
    </header>
  );
}
