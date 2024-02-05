import { type Todo } from '@prisma/client'
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5'
import styles from './TodosItem.module.css'

interface TodosItemProps {
  todo: Todo
  toggleTodo: (id: string, completed: boolean) => Promise<void>
}

export const TodosItem = ({ todo, toggleTodo }: TodosItemProps) => {
  return (
    <div
      onClick={async () => { await toggleTodo(todo.id, !todo.completed) }}
      className={todo.completed ? styles.todoDone : styles.todoPending}>
      <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>

        <div className={`
        flex p-2 rounded-md cursor-pointer
        hover:bg-opacity-60
        ${todo.completed ? 'bg-blue-100' : 'bg-red-300'}
        `}>
          {
            todo.completed
              ? <IoCheckboxOutline size={24} />
              : <IoSquareOutline size={24} />
          }
        </div>
        <div className='text-center sm:text-left'>
          {todo.description}
        </div>
      </div>

    </div>
  )
}
