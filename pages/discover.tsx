import React, { useState, useEffect } from "react";
import { Books } from 'components/Books'
import * as Api from 'services/books'
import { BookProps } from "services/books";

export const Discover = () => {
  const [books, setBooks] = useState<BookProps[]>([]);

  const loadData = () => {
    Api.getAvailableBooks().then((response) => {
      const data = response.data;
      setBooks(data);
    });
  }

  const addToReadingBooks = (id: string, onComplete: (response: BookProps) => void) => {
    Api.AddToReadingList(id).then((response) => {
      if (response.ok) {
        onComplete && onComplete(response);
      }
      return response;
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
