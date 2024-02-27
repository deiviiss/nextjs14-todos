import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '../api/auth/[...nextauth]/route'
import { WidgetItem } from '@/components'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <div className="grid gap-6 grid-cols-1">
      <WidgetItem title='Server side' >
        <div className='flex flex-col'>
          <span>{session.user?.name}</span>
          <span>{session.user?.email}</span>
          <span>{session.user?.image}</span>
          <span>{session.user?.roles}</span>
          <span>{session.user?.id}</span>
        </div>

      </WidgetItem >

    </div >
  )
}
