'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/libs/prisma'

const sleep = async (seconds: number = 0) => {
  const rta = new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, seconds * 1000)
  })
  return await rta
}

export const toggleTodo = async (id: string, completed: boolean): Promise<void> => {
  sleep(90)

  const todo = await prisma.todo.findFirst({
    where: { id }
  })

  if (!todo) throw new Error('Todo not found')

  await prisma.todo.update({
    where: { id },
    data: { completed }
  })

  revalidatePath('/dashboard/server-todos')

  // return updatedTodo
}

export const addTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({ data: { description } })

    revalidatePath('/dashboard/server-todos')

    return todo
  } catch (error) {
    return { message: 'No created' }
  }
}

export const deleteCompleted = async () => {
  try {
    const rta = await prisma.todo.deleteMany({
      where: { completed: true }
    })

    revalidatePath('/dashboard/server-todos')

    return rta.count
  } catch (error) {
    return { message: 'No created' }
  }
}
