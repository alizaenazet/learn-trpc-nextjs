'use client'
import { trpc } from '../_trpc/client'
import { serverClient } from '../_trpc/serverClient';



function TodoList({
    initialTodos
    }: {
    initialTodos : Awaited<ReturnType<(typeof serverClient)['getTodos']>> }) {
    const getTodos = trpc.getTodos.useQuery(undefined,{
        initialData: initialTodos,
        refetchOnMount : false,
        refetchOnReconnect: false
    });
    const addTodo = trpc.addTodo.useMutation({
        onSettled: () => {
            getTodos.refetch();
        }
    });
    const reStatus = trpc.reStatus.useMutation({
        onSettled: () => {
            getTodos.refetch();
        }
    })

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

     function handleTodoStatus(todoID: number,todoStatus: boolean ) {
        console.log("todoStatus");
        console.log(todoStatus);
        
         reStatus.mutate({
            id:todoID,
            isDone:todoStatus
        })
        
    }

    return (
    <div className='flex flex-col justify-center content-center gap-5'>
            <form onSubmit={handleAddTodo}
                className='flex flex-col justify-center gap-3 p-2 bg-[#183D3D] rounded-md'
            >
                <p className='font-extrabold text-2xl'>Add todo</p>
                <p className='font-semibold'>todo</p>
                <input name='todo' 
                    className='rounded-sm'
                    ></input>
                <p className='font-semibold'>desciption</p>
                <input name='desc'
                    className='rounded-sm'
                    ></input>
                <button type='submit'
                 className=' p-1 bg-[#5C8374] rounded-md hover:bg-[#93B1A6]'    
                >Add</button>
            </form>
        <div className={"flex flex-col-reverse justify-center content-start gap-3 "}>
            {getTodos.data?.map((todo) => 
            <div className='p-2 bg-[#183D3D] rounded-md'>
                <div className={"flex gap-2"}>
                <p className='font-semibold text-xl'>{todo.todo}</p>
                <input type='checkbox' onClick={() => handleTodoStatus(todo.id,(!todo.isDone))} checked={todo.isDone != null ? todo.isDone : false} ></input> 
            </div>
            <p className='font-light text-slate-300'>{todo.desc}</p>
            </div>
            )}
        </div>
    </div>
  )
}

export default TodoList