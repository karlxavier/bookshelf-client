import React, { FC, useState } from "react";
import { BookProps as BookType} from "services/books";

interface BookProps {
  book: BookType
  buttonLabel: string
  handleBookClick: (
    id: string,
    onComplete: () => void
  ) => void;
}

export const Book: FC<BookProps> = ({ book, buttonLabel, handleBookClick}) => {
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
      handleBookClick(book.id, onComplete);
  };

  if (book) {
    return(
      <div className="flex flex-wrap mb-6">
        <div key={book.id} className="grow-0 shrink-0 basis-auto w-full md:w-2/12 px-2 mb-2 md:mb-0 ml-auto">
          <div
            className="relative overflow-hidden bg-no-repeat bg-cover relative overflow-hidden bg-no-repeat bg-cover ripple shadow-lg rounded-lg mb-6"
            data-mdb-ripple="true" data-mdb-ripple-color="light">
              <img src={book.image} className="w-full" />
          </div>
        </div>

        <div className="relative grow-0 shrink-0 basis-auto w-full md:w-9/12 xl:w-7/12 px-3 mb-6 md:mb-0 mr-auto">
          <h5 className="text-lg font-bold mb-3">
            {book.title}
          </h5>
          <p className="text-gray-500 mb-6">
            <small>Published <u>13.01.2022</u> by 
              <strong className="text-gray-900"> {book.author}</strong></small>
          </p>
          <p className="text-gray-500">
            {book.description}
          </p>
          <div className="absolute inset-x-0 bottom-6">
            <button type="button" 
              className="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out"
              onClick={(e) => handleBookEvent(e, book)}
              disabled={loading}
              >
              {buttonLabel}
            </button>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }

}

export default Book;
