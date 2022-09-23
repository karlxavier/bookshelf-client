import React, { useState, useEffect } from "react";
import { Books } from 'components/Books';
import * as Api from 'services/books';
import { BookProps } from "services/books";

export const List = () => {
  const [books, setBooks] = useState<BookProps[]>([]);

  const loadData = () => {
    Api.getReadingList().then((response) => {
      const data = response.data;
      setBooks(data);
    });
  }

  const markAsReadBook = (id: string, onComplete: (response: BookProps) => void) => {
    Api.MarkAsRead(id).then((response) => {
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
          <Books books={books} handleBookClick={markAsReadBook} />
        }
      </>
    )
  } else {
    return null
  }
  
}

export default List