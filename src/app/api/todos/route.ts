import { NextResponse } from 'next/server'
import * as yup from 'yup'
import prisma from '@/libs/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const take = Number(searchParams.get('take') ?? '10')
  const skip = Number(searchParams.get('skip') ?? '0')

  if (isNaN(take)) {
    return NextResponse.json({ message: 'take must be a number' }, { status: 400 })
  }

  if (isNaN(skip)) {
    return NextResponse.json({ message: 'skip must be a number' }, { status: 400 })
  }
  const todos = await prisma.todo.findMany(
    {
      take,
      skip
    }
  )

  return NextResponse.json(todos)
}

const postSchema = yup.object({
  description: yup.string().required(),
  completed: yup.boolean().optional().default(false)
})

export async function POST(request: Request) {
  try {
    const body = await postSchema.validate(await request.json())

    const todo = await prisma.todo.create({ data: body })
    return NextResponse.json(todo)
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}

export async function DELETE(request: Request) {
  try {
    const rta = await prisma.todo.deleteMany({
      where: { completed: true }
    })

    return NextResponse.json({ message: 'Delete Completed', count: rta.count }, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 400 })
  }
}
