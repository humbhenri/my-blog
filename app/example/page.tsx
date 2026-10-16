import exampleAction from "@/actions/example";

export default async function ExamplePage() {
  return (
    <form action={exampleAction}>
      <input type="hidden" defaultValue="6969" name="urmom" />
      <button type="submit">Call server action</button>
    </form>
  );
}
