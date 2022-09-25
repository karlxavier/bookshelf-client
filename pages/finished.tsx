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

  return (
    <div className="container my-24 px-6 mx-auto">
      <section className="mb-32 text-gray-800 text-center md:text-left">
        <h2 className="text-3xl font-bold mb-12 text-center">Reading Lists</h2>
        {
          <Books 
            books={books} 
            buttonLabel='Mark as Unread' 
            handleBookClick={markAsUnreadBook} 
          />
        }
      </section>
    </div>
  )
}

export default Finished