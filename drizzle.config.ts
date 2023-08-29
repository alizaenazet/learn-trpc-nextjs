import type { Config } from "drizzle-kit";
 
export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "admin123",
    database: "todoListDrizzle",
  } 
} satisfies Config;