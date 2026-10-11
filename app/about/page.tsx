import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">About Page</h1>
      <p className="mt-4 text-lg text-gray-600">
        This is the about page of the Next.js blog.
      </p>
    </div>
  );
}