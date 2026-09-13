import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <Container>
      <Header />
      <main className="">
        <h2 className="text-2xl font-bold mb-4">Welcome to My Blog</h2>
        <p className="text-lg text-gray-700">
          This is a simple blog built with Next.js and Tailwind CSS.
        </p>
      </main>
      <Footer />
    </Container>
  );
}
