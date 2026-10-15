import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./db/migrations",
  schema: "./db/schemas.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "./db.sqlite3",
  },
});
