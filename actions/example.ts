"use server";

export default async function exampleAction(formData: FormData) {
  console.log("server action example: " + formData.get("urmom"));
}
