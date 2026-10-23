import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/Container";
import { Header } from "@/components/Header";
import { ToastifyContainer } from "@/components/ToastifyContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Next.js Blog",
    template: "%s | Next.js Blog",
  },
  description: "A simple blog built with Next.js",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Container>
          <Header />
          {children}
          <Footer />
        </Container>
        <ToastifyContainer />
      </body>
    </html>
  );
}
