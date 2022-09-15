import { Button } from "@chakra-ui/button";
import React, { FC, useState } from "react";
import { useSession } from "next-auth/react"
import { BookProps } from './props'
import * as Api from '../../../api/requests'

export const Book: FC<BookProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const handleAddToList = (bookId: number) => {
    setLoading(true);
    const userSession = JSON.stringify(session?.user);
    const token = JSON.parse(userSession)?.accessToken

    Api.AddToReadingList(token, bookId).then((response) => {
      if (response.ok) {
        // remove book from the list
      }
    });
    setLoading(false);
  };

  if (props) {
    return(
      <div key={props.bookId} className="max-w-sm rounded overflow-hidden shadow-lg">
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
            onClick={(e) => handleAddToList(props.bookId)}
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