import { Button } from "@chakra-ui/button";
import React, { FC, useState } from "react";
import { IBook } from '../props';

export const Book: FC<IBook> = (props) => {
  const [loading, setLoading] = useState(false);
  const [hidden, setHide] = useState(false);

  const handleBookEvent = async (
      e: React.SyntheticEvent<EventTarget>,
      bookId: number
    ) => {
      e.stopPropagation();
      const onComplete = () => {
        setLoading(false);
        setHide(true);
      };
      props.handleBookClick(bookId, onComplete);
  };

  if (props) {
    return(
      <div key={props.bookId} className={`max-w-sm rounded overflow-hidden shadow-lg ${hidden ? 'hidden' : ''}`}>
        <img className="w-full" src={props.image} alt="Sunset in the mountains"></img>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{props.title}</div>
          <div className="font-italic text-x mb-2">{props.author}</div>
          <p className="text-gray-700 text-base">
            {props.description}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <Button 
            onClick={(e) => handleBookEvent(e, props.bookId)}
            disabled={loading}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
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