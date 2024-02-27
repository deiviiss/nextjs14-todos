import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'

export async function GET(request: Request) {
  await prisma.todo.deleteMany() // DELETE ALL todos
  await prisma.user.deleteMany() // DELETE ALL users

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@mail.com',
      password: bcrypt.hashSync('admin'),
      name: 'admin',
      roles: ['Admin', 'user', 'invitado', 'SuperAdmin']
    }
  })

  await prisma.todo.createMany({
    data: [
      {
        userId: adminUser.id,
        description: 'Piedra del alma',
        completed: true
      },
      {
        userId: adminUser.id,
        description: 'Piedra del tiempo'
      },
      {
        userId: adminUser.id,
        description: 'Piedra del poder'
      },
      {
        userId: adminUser.id,
        description: 'Piedra del espacio'
      },
      {
        userId: adminUser.id,
        description: 'Piedra de la realidad'
      }
    ]
  })

  return NextResponse.json({ message: 'Executed seeded' })
}
