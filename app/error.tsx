"use client";

import ErrorMessage from "@/components/ErrorMessage";
import Link from "next/link";
import { useEffect } from "react";

type ErrorProps = {
  error: string;
  reset: () => {};
};

export default function ErrorPage({ error, reset: _reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <ErrorMessage
      pageTitle="Error"
      contentTitle="Error"
      content={
        <>
          <p>Deu ruim :(</p>
          <Link href="/">Voltar</Link>
        </>
      }
    />
  );
}
