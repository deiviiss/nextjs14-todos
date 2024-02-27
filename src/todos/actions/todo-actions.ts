'use server'

import { revalidatePath } from 'next/cache'
import { getUserSessionServer } from '@/auth/actions/auth-actions'
import prisma from '@/libs/prisma'

export const toggleTodo = async (id: string, completed: boolean): Promise<void> => {
  const user = await getUserSessionServer()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const todo = await prisma.todo.findFirst({
    where: { id }
  })

  if (!todo) throw new Error('Todo not found')

  if (todo.userId !== user.id) {
    throw new Error('Unauthorized')
  }

  await prisma.todo.update({
    where: { id },
    data: { completed }
  })

  revalidatePath('/dashboard/server-todos')
}

export const addTodo = async (description: string) => {
  try {
    const user = await getUserSessionServer()
    const todo = await prisma.todo.create({ data: { description, userId: user?.id || '' } })

    revalidatePath('/dashboard/server-todos')

    return todo
  } catch (error) {
    return { message: 'No created' }
  }
}

export const deleteCompleted = async () => {
  try {
    const user = await getUserSessionServer()

    if (!user) {
      throw new Error('Unauthorized')
    }

    const rta = await prisma.todo.deleteMany({
      where: { completed: true, userId: user.id }
    })

    revalidatePath('/dashboard/server-todos')

    return rta.count
  } catch (error) {
    return { message: 'No created' }
  }
}
