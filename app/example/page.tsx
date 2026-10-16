import exampleAction from "@/actions/example";

export default async function ExamplePage() {
  const res = await fetch('https://randomuser.me/api/?results=1',
    {
      next: {
        tags: ['randomuser'],
        revalidate: 30,
      }
    });
  const json = await res.json();
  const name = json.results[0].name.first;
  console.log({ name });
  return (
    <form action={exampleAction}>
      <input type="hidden" defaultValue="6969" name="urmom" />
      <button type="submit">Call server action</button>
    </form>
  );
}
