
import { todos } from "@/db/schema";
import { publicProcedure,router } from "./trpc";
import { drizzle } from "drizzle-orm/mysql2";
import {eq} from "drizzle-orm"
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";
import { z } from "zod";
import { todo } from "@/utils/types";

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
            // const result  = await db.select().from(todos)
            const result = z.object({
                id: z.number(),
                todo: z.string(),
                desc: z.string() || z.null(),
                isDone: z.boolean()
            }).array()
            

            const data = await db.select().from(todos)
            
            result.parse(data)
            return data
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
        }),
    reStatus: publicProcedure
        .input(z.object({
            id:z.number(),
            isDone: z.boolean(),
        }))
        .mutation(async (opts) => {
            const {id,isDone} = opts.input;
            console.log("isDone");
            console.log(isDone);
            
            try {
                await db.update(todos)
                    .set({isDone:isDone})
                    .where(eq(todos.id,id))
                return true
            } catch (error) {
                return false
            }
        })
})

export type AppRouter = typeof appRouter