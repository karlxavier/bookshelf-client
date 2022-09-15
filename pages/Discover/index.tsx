import React, { useState, useEffect } from "react";
import { Books } from '../components/Books'
import { useSession } from "next-auth/react"
import * as Api from '../api/requests'

export const Discover = () => {
  const [books, setBooks] = useState<any>([]);
  const { data: session } = useSession();

  const loadData = () => {
    const userSession = JSON.stringify(session?.user);
    const token = JSON.parse(userSession)?.accessToken

    Api.getAvailableBooks(token).then((response) => {
      const data = response.data;
      setBooks(data);
    });
  }

  useEffect(() => {
    loadData();
  }, []);

  if (books.length > 0) {
    return (
      <>
        {
          <Books books={books} />
        }
      </>
    )
  } else {
    return null
  }
  
}

export default Discover