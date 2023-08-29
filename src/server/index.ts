import { todos } from "@/db/schema";
import { publicProcedure,router } from "./trpc";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";
import { z } from "zod";


const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password:"admin123",
    database: "todoListDrizzle",
})
const db = drizzle(connection);
await migrate(db, { migrationsFolder: "drizzle" });

export const appRouter = router({
    getTodos: publicProcedure
        .query(async () => {
            const result = await db.select().from(todos)
            return result
        }),
    addTodo: publicProcedure
        .input(z.object({
            todo:z.string(),
            desc:z.string(),
                }))
        .mutation(async (opts) => {
            const {todo,desc} = opts.input;
            try {
                await db.insert(todos).values({
                    todo:todo,
                    desc:desc,
                    isDone:false
                })
                return true
            } catch (error) {
                return false
            }
        })
})

export type AppRouter = typeof appRouter