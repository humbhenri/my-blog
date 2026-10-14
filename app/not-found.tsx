import ErrorMessage from "@/components/ErrorMessage";

export default function NotFound() {
  return (
    <ErrorMessage
      pageTitle="404"
      contentTitle="Página não encontrada"
      content="A página não existe"
    />
  );
}
