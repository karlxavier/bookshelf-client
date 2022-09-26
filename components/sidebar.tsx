import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from "next/router";

const Sidebar = () => {
  const { data: accessToken } = useSession();
  const router = useRouter();
  const menuItems = [
    {
      href: '/list',
      title: 'Reading List',
    },
    {
      href: '/finished',
      title: 'Finished Books',
    },
    {
      href: '/discover',
      title: 'Discover',
    },
  ];

  if (accessToken){
    return (
      <aside className='h-screen sticky top-0 bg-gray-100 w-full md:w-60'>
        <nav>
          <ul>
          <li className='m-2'>
            
          </li>
            {menuItems.map(({ href, title }) => (
              <li className='m-2' key={title}>
                <Link href={href}>
                  <a
                    className={`flex p-2 bg-gray-200 rounded hover:bg-gray-400 cursor-pointer ${
                      router.asPath === href && 'bg-gray-600 text-white'
                    }`}
                  >
                    {title}
                  </a>
                </Link>
              </li>
            ))}

            <li className='m-2 absolute inset-x-0 bottom-6'>
              <a
                onClick={() => (accessToken ? signOut() : signIn())} 
                href="#" 
                className="flex p-2 bg-gray-200 rounded hover:bg-red-400 hover:text-white cursor-pointer"
                >
                <span>Sign Out</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    )
  } else {
    return null
  }
}

export default Sidebar