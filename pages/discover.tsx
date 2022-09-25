import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import { Books } from 'components/Books'
import * as Api from 'services/books'
import { BookProps } from "services/books";

export const Discover = () => {
  const [books, setBooks] = useState<BookProps[]>([]);
  const [searchData, setSearchData] = useState(books);

  const loadData = () => {
    Api.getAvailableBooks().then((response) => {
      const data = response.data;
      setBooks(data);
      setSearchData(data);
    });
  }

  const addToReadingBooks = (id: string, onComplete: (response: BookProps) => void) => {
    Api.AddToReadingList(id).then((response) => {
      if (response.ok) {
        onComplete && onComplete(response);
      }
      return response;
    });
  }

  const searchBooks = (query: string) => {
    if (!query) {
      setSearchData(books);
      return;
    }
    const fuse = new Fuse(books, {
      keys: ["title", "author"]
    });

    const result = fuse.search(query);
    const finalResult: React.SetStateAction<Api.BookProps[]> = [];

    if (result.length) {
      result.forEach((item) => {
        finalResult.push(item.item);
      });
      setSearchData(finalResult);
    } else {
      setSearchData([]);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container my-24 px-6 mx-auto">
      <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
          <div className="input-group relative flex items-stretch w-full mb-4 rounded">
            <input
              type="search" 
              onChange={(e) => searchBooks(e.target.value)}
              placeholder="Search Books"
              className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Search" aria-describedby="button-addon2"
            />
            <span className="input-group-text flex items-center px-3 py-1.5 text-base font-normal text-gray-700 text-center whitespace-nowrap rounded" id="basic-addon2">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
      <section className="mb-32 text-gray-800 text-center md:text-left">
        <h2 className="text-3xl font-bold mb-12 text-center">Discover Books</h2>
        {
          <Books 
            books={searchData} 
            buttonLabel='Add to List' 
            handleBookClick={addToReadingBooks}
          />
        }
      </section>
    </div>
  )

}

export default Discover
