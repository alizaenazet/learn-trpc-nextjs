import Image from 'next/image'
import TodoList from './components/TodoList'
import { serverClient } from './_trpc/serverClient'

const todos = await serverClient.getTodos();
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TodoList initialTodos={todos}></TodoList>
          </main>
  )
}
