import Layout from '../layout'
import React, { FC } from "react";
import { Book } from "./Book"
import { Book as BookType} from "services/books";

interface BooksProps {
  books: BookType[]
  handleBookClick: (
    bookId: string,
    onComplete: () => void
  ) => void;
}

export const Books: FC<BooksProps> = ({books, handleBookClick}) => {
  if (books.length > 0) {
    return (
      <Layout>
        <section>
          {
            books.map((book) => {
              return <Book key={book.bookId}
                book={book}
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
