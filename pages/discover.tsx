import React, { useState, useEffect } from "react";
import { Books } from 'components/Books'
import * as Api from 'services/books'
import { IBook } from 'components/Books/props'
import { Book } from "services/books";

export const Discover = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const loadData = () => {
    Api.getAvailableBooks().then((response) => {
      const data = response.data;
      setBooks(data);
    });
  }

  const addToReadingBooks = (bookId: string, onComplete: (response: IBook) => void) => {
    Api.AddToReadingList(bookId).then((response) => {
      if (response.ok) {
        onComplete && onComplete(response);
      }
      return response.json();
    });
  }

  useEffect(() => {
    loadData();
  }, []);

  if (books.length > 0) {
    return (
      <>
        {
          <Books books={books} handleBookClick={addToReadingBooks} />
        }
      </>
    )
  } else {
    return null
  }

}

export default Discover
