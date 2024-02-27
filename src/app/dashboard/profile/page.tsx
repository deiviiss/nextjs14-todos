'use client'
import { useSession } from 'next-auth/react'

const ProfilePage = () => {
  const { data: session } = useSession()

  const userName = session?.user?.name || 'no user'
  const userImage = session?.user?.image || 'no image'
  const userEmail = session?.user?.email || 'no email'
  const userRoles = session?.user?.roles || ['no roles']

  return (
    <div>
      <h1>Perfil</h1>
      <hr />
      <div className="flex flex-col">
        <span>{userName}</span>
        <span>{userEmail}</span>
        <span>{userImage}</span>
        <span>{userRoles.join(',')}</span>

      </div>
    </div>

  )
}

export default ProfilePage
