import { drizzleDb } from "./index.ts";
import { postsTable } from "./schemas.ts";

const posts = await drizzleDb.select().from(postsTable);
console.log(posts);
