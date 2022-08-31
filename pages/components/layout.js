import Head from 'next/head'
import styles from '../components/layout.module.css'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Bookshelf</title>
      </Head>
      <main className={styles.main}>{children}</main>
    </>
  )
}