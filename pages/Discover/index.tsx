import React, { useState, useEffect } from "react";
import { Books } from 'components/Books'
import * as Api from 'services/api'

export const Discover = () => {
  const [books, setBooks] = useState<any>([]);

  const loadData = () => {
    Api.getAvailableBooks().then((response) => {
      const data = response.data;
      setBooks(data);
    });
  }

  function addToReadingBooks(bookId: number) {
    Api.AddToReadingList(bookId).then((response) => {
      
    });
  }

  useEffect(() => {
    loadData();
  }, []);

  if (books.length > 0) {
    return (
      <>
        {
          <Books books={books} handleClick={addToReadingBooks.bind(this)} />
        }
      </>
    )
  } else {
    return null
  }
  
}

export default Discover