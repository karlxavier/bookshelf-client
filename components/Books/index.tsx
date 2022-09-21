import Layout from '../layout'
import React, { FC } from "react";
import { Book } from "./Book"
import { IBooks, IBook } from './props'

export const Books: FC<IBooks> = ({books, handleBookClick}) => {
  const records = JSON.parse(
    JSON.stringify(books)
  )

  if (records.length > 0) {
    return (
      <Layout>
        <section>
          {
            records.map((book: IBook) => {
              return <Book key={book.bookId}
                bookId={book.bookId}
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