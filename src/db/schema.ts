// import data type for table properties
import { boolean, int, mysqlTable, text } from 'drizzle-orm/mysql-core';

// create a schema
export const todos = mysqlTable("todos",{
    id: int("id").primaryKey().autoincrement(),
    todo: text("todo"),
    desc: text("desc"),
    isDone: boolean("isDone")
})

