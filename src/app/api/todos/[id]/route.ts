import { type Todo } from '@prisma/client'
import { NextResponse, type NextRequest } from 'next/server'
import * as yup from 'yup'
import prisma from '@/libs/prisma'

interface paramsTodo {
  params: {
    id: string
  }
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const todo = await prisma.todo.findFirst({ where: { id } })
  return todo
}

export async function GET(request: NextRequest, { params }: paramsTodo) {
  const { id } = params

  try {
    const todo = await getTodo(id)

    if (!todo) {
      return NextResponse.json({ message: 'Todo not found' }, { status: 404 })
    }

    return NextResponse.json(todo)
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

const putSchema = yup.object({
  description: yup.string().optional(),
  completed: yup.boolean().optional()
})

export async function PUT(request: NextRequest, { params }: paramsTodo) {
  const { id } = params

  try {
    const todo = await getTodo(id)

    if (!todo) {
      return NextResponse.json({ message: 'Todo not found' }, { status: 404 })
    }

    const { completed, description } = await putSchema.validate(await request.json())

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { completed, description }
    })

    return NextResponse.json(updatedTodo)
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
