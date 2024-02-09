import prisma from '@/libs/prisma'
import { NewTodo, TodosGrid } from '@/todos'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Listado de todos',
  description: 'Listado de todos'
}

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany(
    {
      orderBy: {
        description: 'asc'
      }
    }
  )

  return (
    <>
      <span className='text-2xl'>Server Actions</span>
      <div className='w-full px-3 mx-5 mb-5'>
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  )
}
