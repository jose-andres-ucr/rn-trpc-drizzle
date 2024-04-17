import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const studentTable = sqliteTable("student", {
  id: text("id", { length: 10 }).primaryKey(),
  firstName: text("first_name", { length: 100 }).notNull(),
  lastName: text("last_name", { length: 100 }).notNull(),
});
