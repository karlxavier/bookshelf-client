import React, { FC } from "react";
import { Book } from "./Book"
import { BookProps as BookType} from "services/books";

interface BooksProps {
  books: BookType[]
  buttonLabel: string
  handleBookClick: (
    id: string,
    onComplete: () => void
  ) => void;
}

export const Books: FC<BooksProps> = ({books, buttonLabel, handleBookClick}) => {
  if (books.length > 0) {
    return (
      <>
      {
        books.map((book) => {
          return <Book key={book.id}
            book={book}
            buttonLabel={buttonLabel}
            handleBookClick={handleBookClick}
          />;
        })
      }
      </>
    );
  } else {
    return null
  }
}

export default Books;
