'use client'
import { type Todo } from '@prisma/client'
import { toggleTodo } from '../actions/todo-actions'
import { TodosItem } from '@/todos/'

interface TodosGridProps {
  todos?: Todo[]
}

export const TodosGrid = ({ todos = [] }: TodosGridProps) => {
  return (
    <>
      <h1 className='pb-5 text-lg text-center font-semibold'>ToDos Server Actions</h1>
      <div className=' grid grid-cols-1 sm:grid-cols-3 gap-3 pb-4'>
        {todos.map((todo) => (
          <TodosItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
        ))}
      </div>
    </>
  )
}
