import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link'
import styles from '../components/sidebar.module.css'

export default function Sidebar() {
  const { data: accessToken } = useSession();

  return (
    <nav className={styles.nav}>
      <input className={styles.input} placeholder="Search..." />
      <Link href="/">
        <a>Reading List</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/discover">
        <a>Discover</a>
      </Link>
      <button
        className={`mt-10 uppercase text-sm font-bold tracking-wide text-gray-100 p-3 rounded-lg  focus:outline-none focus:shadow-outline hover:shadow-xl active:scale-90 transition duration-150  ${
          accessToken ? 'bg-red-400' : 'bg-green-400'
        }`}
        onClick={() => (accessToken ? signOut() : signIn())}
      >
        {accessToken ? 'Sign Out' : 'Sign In'}
      </button>
    </nav>
  )
}