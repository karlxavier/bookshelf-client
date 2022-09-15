import Layout from '../layout'
import React, { FC } from "react";
import { BooksProps } from "./props";
import { Book } from "./Book"

export const Books: FC<BooksProps> = ({books, handleClick}) => {
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
                handleClick={handleClick}
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