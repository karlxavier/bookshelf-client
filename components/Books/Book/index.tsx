import { Button } from "@chakra-ui/button";
import React, { FC, useState } from "react";
import { BookProps as BookType} from "services/books";

interface BookProps {
  book: BookType
  handleBookClick: (
    id: string,
    onComplete: () => void
  ) => void;
}

export const Book: FC<BookProps> = ({ book, handleBookClick}) => {
  const [loading, setLoading] = useState(false);
  const [hidden, setHide] = useState(false);

  const handleBookEvent = async (
      e: React.SyntheticEvent<EventTarget>,
      book: BookType
    ) => {
      e.stopPropagation();
      const onComplete = () => {
        setLoading(false);
        setHide(true);
      };
      console.log(book.id);
      handleBookClick(book.id, onComplete);
  };

  if (book) {
    return(
      <div key={book.id} className={`max-w-sm rounded overflow-hidden shadow-lg ${hidden ? 'hidden' : ''}`}>
        <img className="w-full" src={book.image} alt="Sunset in the mountains"></img>
        <div className="px-6 py-4">
          <div className="mb-2 text-xl font-bold">{book.title}</div>
          <div className="mb-2 font-italic text-x">{book.author}</div>
          <p className="text-base text-gray-700">
            {book.description}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <Button
            onClick={(e) => handleBookEvent(e, book)}
            disabled={loading}
            className="px-4 py-2 font-semibold text-gray-800 bg-white border border-gray-400 rounded shadow hover:bg-gray-100"
          >
            Add to List
          </Button>
        </div>
      </div>
    )
  } else {
    return null
  }

}

export default Book;
