import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";

const migrationClient = createClient({
  url: process.env.DATABASE_URL ?? "",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

try {
  await migrate(drizzle(migrationClient), { migrationsFolder: "./drizzle" });
  process.exit();
} catch (error) {
  console.error("Migration error: ", error);
  process.exit(1);
}
