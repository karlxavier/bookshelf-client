import React, { useState, useEffect } from "react";
import { Books } from 'components/Books'
import * as Api from 'services/books'
import { BookProps } from "services/books";

export const Finished = () => {
  const [books, setBooks] = useState<BookProps[]>([]);

  const loadData = () => {
    Api.getFinishedBooks().then((response) => {
      const data = response.data;
      setBooks(data);
    });
  }

  const markAsUnreadBook = (id: string, onComplete: (response: BookProps) => void) => {
    Api.MarkAsUnread(id).then((response) => {
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
          <Books books={books} handleBookClick={markAsUnreadBook} />
        }
      </>
    )
  } else {
    return null
  }
  
}

export default Finished