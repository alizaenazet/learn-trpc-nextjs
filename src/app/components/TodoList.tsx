'use client'
import React, { useState } from 'react'
import { trpc } from '../_trpc/client'
import { number } from 'zod';


function TodoList() {
    const getTodos = trpc.getTodos.useQuery();
    const addTodo = trpc.addTodo.useMutation({
        onSettled: () => {
            getTodos.refetch();
        }
    });

     function handleAddTodo(event: React.SyntheticEvent<HTMLFormElement>) {
        event.preventDefault()
        const {todo,desc} = event.target as typeof event.target & {
            todo: {value: string},
            desc: {value: string}
        }
        if (todo.value.length) {
            addTodo.mutate({
                todo: todo.value,
                desc: desc.value
            })
        }
        event.currentTarget.reset()
    }

    function handleTodoStatus(todoID: number ) {
        console.log(todoID);
    }
    
    return (
    <div className='flex flex-col justify-center content-center gap-5'>
        <div className={"flex flex-col justify-start content-center gap-3"}>
            {getTodos.data?.map((todo) => 
            <div>
                <div className={"flex gap-2"}>
                <p>{todo.todo}</p>
                {todo.isDone ? 
                <input type='checkbox' onChange={() => handleTodoStatus(todo.id)} checked ></input> :
                <input type='checkbox' onChange={() => handleTodoStatus(todo.id)}></input>
            }    
            </div>
            <p>{todo.desc}</p>
            </div>
            )}
        </div>
        <div>
            <form onSubmit={handleAddTodo}>
                <h3>Add todo</h3>
                <p>todo</p>
                <input name='todo' ></input>
                <p>desciption</p>
                <input name='desc'></input>
                <button type='submit'>Add</button>
            </form>
        </div>
    </div>
  )
}

export default TodoList