import Layout from '../layout'
import React, { FC } from "react";
import { Book } from "./Book"

interface Books {
  books: {
    data: [{
      bookId: number
      title: string
      description: string
      author: string
      image: string
    }]
  };
  handleBookClick: (
    bookId: number,
    onComplete: () => void
  ) => void;
}

export const Books: FC<Books> = ({books, handleBookClick}) => {
  const records = JSON.parse(
    JSON.stringify(books)
  )

  if (records.length > 0) {
    return (
      <Layout>
        <section>
          {
            records.map((book: any) => {
              return <Book key={book.id}
                bookId={book.id}
                title={book.title}
                description={book.description}
                author={book.author}
                image={book.image} 
                handleBookClick={handleBookClick}
              />;
            })
          }
        </section>
      </Layout>
    );
  } else {
    return null
  }
}

export default Books;