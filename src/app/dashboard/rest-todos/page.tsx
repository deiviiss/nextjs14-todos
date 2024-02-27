import { redirect } from 'next/navigation'
import { getUserSessionServer } from '@/auth/actions/auth-actions'
import prisma from '@/libs/prisma'
import { NewTodo, TodosGridRest } from '@/todos'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: 'Listado de todos',
  description: 'Listado de todos'
}
export default async function RestTodosPage() {
  const user = await getUserSessionServer()

  if (!user) {
    redirect('/api/auth/signin')
  }

  const todos = await prisma.todo.findMany(
    {
      where: { userId: user.id },
      orderBy: {
        description: 'asc'
      }
    }
  )

  return (
    <div>
      <div className='w-full px-3 mx-5 mb-5'>
        <NewTodo />
      </div>
      <TodosGridRest todos={todos} />
    </div>
  )
}
