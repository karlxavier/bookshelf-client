import Head from 'next/head'
import Sidebar from './sidebar'

export default function Layout({ children }: any) {
  return (
    <>
      <Head>
        <title>Bookshelf</title>
      </Head>
      <main className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl'>
        <div className="grid gap-4 grid-cols-2 grid-rows-2">
          <div className='sticky top-0 bottom-0'>
            <Sidebar />
          </div>
          {children}
        </div>
      </main>
    </>
  )
}