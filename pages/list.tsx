import React, { useState, useEffect } from "react";
import { Books } from 'components/Books'
import * as Api from 'services/api'
import { IBook, IBooks } from 'components/Books/props'

export const List = () => {
  const [books, setBooks] = useState<IBooks[]>([]);

  const loadData = () => {
    Api.getReadingList().then((response) => {
      const data = response.data;
      setBooks(data);
    });
  }

  const markAsReadBook = async (bookId: number, onComplete: (response: IBook) => void) => {
    Api.MarkAsRead(bookId).then((response) => {
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
          <Books books={books} handleBookClick={markAsReadBook} />
        }
      </>
    )
  } else {
    return null
  }
  
}

export default List