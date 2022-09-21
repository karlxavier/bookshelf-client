import React, { useState, useEffect } from "react";
import { Books } from 'components/Books'
import * as Api from 'services/books'
import { IBook } from 'components/Books/props'

export const Discover = () => {
  const [books, setBooks] = useState<IBook[]>([]);

  const loadData = () => {
    Api.getAvailableBooks().then((response) => {
      const data = response.data;
      setBooks(data);
    });
  }

  const addToReadingBooks = (bookId: number, onComplete: (response: IBook) => void) => {
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