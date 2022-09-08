import Layout from './components/layout'
import React from "react"
import { useSession, getSession } from "next-auth/react"

const SERVER_HOST = 'http://localhost:3001'

interface BookProps {
  books: {
    data: [{
      id: number
      title: string
      description: string
      author: string
      image: string
    }]
  }
}

const handleAddToList = async (e: any, bookId: number) => {
  const response = await fetch(`${SERVER_HOST}/v1/books/${bookId}/add_reading_list`, {
    method: 'POST',
    headers: new Headers({
      'Authorization': 'Basic '+btoa('username:password'), 
      'Content-Type': 'application/x-www-form-urlencoded'
    }), 
    body: 'A=1&B=2'
  })

  const json = await response.json()
  return json
}

const Discover: React.FC<BookProps> = ({books}) => {
  const data = books.data

  return (
    <Layout>
      <section>
        {data.map((book) => (
          <div key={book.id} className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full" src={book.image} alt="Sunset in the mountains"></img>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{book.title}</div>
              <div className="font-italic text-x mb-2">{book.author}</div>
              <p className="text-gray-700 text-base">
                {book.description}
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <button 
                onClick={(e) => handleAddToList(e, book.id)}
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              >
                Add to List
              </button>
            </div>
          </div>
        ))}
      </section>
    </Layout>
  )
}

export async function getServerSideProps({context}: any) {
  const response = await fetch(`${SERVER_HOST}/v1/books/discover`)
  const books = await response.json()
  return {
    props: { books }
  }
}

export default Discover