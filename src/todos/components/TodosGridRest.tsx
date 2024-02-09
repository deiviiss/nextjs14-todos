'use client'
import { type Todo } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { TodosItem } from '@/todos/'
import * as apiTodo from '@/todos/helpers/todos'

interface TodosGridProps {
  todos?: Todo[]
}

export const TodosGridRest = ({ todos = [] }: TodosGridProps) => {
  const router = useRouter()
  const toggleTodo = async (id: string, completed: boolean) => {
    await apiTodo.updateTodo(id, completed)
    router.refresh()
  }
  return (
    <>
      <h1 className='pb-5 text-lg text-center font-semibold'>ToDos ApiRest</h1>
      <div className=' grid grid-cols-1 sm:grid-cols-3 gap-3 pb-4'>
        {todos.map((todo) => (
          <TodosItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
        ))}
      </div>
    </>
  )
}
