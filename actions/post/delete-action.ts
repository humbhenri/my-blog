"use server";

import { asyncDelay } from "@/utils";

export async function deletePostAction(id: string) {
  await asyncDelay(1_000)
  console.log(`deleting post ${id}`);
}
