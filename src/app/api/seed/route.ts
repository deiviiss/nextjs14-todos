import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export async function GET(request: Request) {
  await prisma.todo.deleteMany() // DELETE ALL todos

  await prisma.todo.createMany({
    data: [
      {
        description: 'Piedra del alma', completed: true
      },
      {
        description: 'Piedra del tiempo'
      },
      {
        description: 'Piedra del poder'
      },
      {
        description: 'Piedra del espacio'
      },
      {
        description: 'Piedra de la realidad'
      }
    ]
  }
  )

  return NextResponse.json({ message: 'Executed seeded' })
}
