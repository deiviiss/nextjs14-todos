import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { CiBookmarkCheck } from 'react-icons/ci'
import { IoBasketOutline, IoCodeWorkingOutline, IoPersonOutline } from 'react-icons/io5'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { SideMenuItem, LogoutButton } from '@/components/'

const navItems = [
  {
    path: '/dashboard',
    icon: <CiBookmarkCheck size={30} />,
    title: 'Dashboard'
  },
  {
    path: '/dashboard/rest-todos',
    icon: <CiBookmarkCheck size={30} />,
    title: 'Rest Todos'
  },
  {
    path: '/dashboard/server-todos',
    icon: <CiBookmarkCheck size={30} />,
    title: 'Server Actions'
  },
  {
    path: '/dashboard/cookies',
    icon: <IoCodeWorkingOutline size={30} />,
    title: 'Cookies'
  },
  {
    path: '/dashboard/products',
    icon: <IoBasketOutline size={30} />,
    title: 'Productos'
  },
  {
    path: '/dashboard/profile',
    icon: <IoPersonOutline size={30} />,
    title: 'Perfil'
  }
]

export const Sidebar = async () => {
  const session = await getServerSession(authOptions)

  const userName = session?.user?.name || 'User'
  const userImage = session?.user?.image || 'https://tailus.io/sources/blocks/stats-cards/preview/images/avatar.svg'
  const userRoles = session?.user?.roles || ['no roles']

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">

          <Link href="/dashboard" title="home">

            <Image src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" width={150} height={150} className="w-32" alt="tailus logo" />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image src={userImage} alt={userName} className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" width={150} height={150} />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
          <span className="hidden text-gray-400 lg:block capitalize">{userRoles.join(',')}</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {
            navItems.map((item, index) => (
              <SideMenuItem key={index} {...item} />
            ))
          }
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  )
}
