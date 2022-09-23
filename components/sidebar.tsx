import { Button } from '@chakra-ui/button';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from "next/router";
import styles from 'styles/sidebar.module.css'

export default function Sidebar() {
  const { data: accessToken } = useSession();
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <input className={styles.input} placeholder="Search..." />
      <Link href="/list">
        <a className={router.pathname == "/list" ? "!border-b-red-400" : ""}>
          Reading List
        </a>
      </Link>

      <Link href="/finished">
        <a className={router.pathname == "/finished" ? "!border-b-red-400" : ""}>
          Finished Books
        </a>
      </Link>

      <Link href="/discover">
        <a className={router.pathname == "/discover" ? "!border-b-red-400" : ""}>
          Discover
        </a>
      </Link>

      <Button
        className={`mt-10 uppercase text-sm font-bold tracking-wide text-gray-100 p-3 rounded-lg  focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90 transition duration-150  ${
          accessToken ? 'bg-red-400' : 'bg-green-400'
        }`}
        onClick={() => (accessToken ? signOut() : signIn())}
      >
        {accessToken ? 'Sign Out' : 'Sign In'}
      </Button>
    </nav>
  )
}