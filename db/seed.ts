import { JsonPostRepository } from "../repositories/posts/index.ts";
import { drizzleDb } from "./index.ts";
import { postsTable } from "./schemas.ts";

const repo = new JsonPostRepository();
const posts = await repo.findAll();
try {
  await drizzleDb.insert(postsTable).values(posts);
} catch (e) {
  console.log(e);
}
