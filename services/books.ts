import { fetchApi } from "./base";

export type Book = {
  bookId: string
  title: string
  description: string
  author: string
  image: string
}

export const getAvailableBooks = async () => {
  const url = '/v1/books/discover'
  const response = await fetchApi(url, 'GET')
  return JSON.parse(response) as { data: Book[] }
}

export const getFinishedBooks = async () => {
  const url = '/v1/books/finished_books'
  const response = await fetchApi(url, 'GET')
  return response as { data: Book[] }
}

export const getReadingList = async () => {
  const url = '/v1/books/reading_list'
  const response = await fetchApi(url, 'GET')
  return response
}

export const AddToReadingList = async (bookId: string) => {
  const payload = {
    id: bookId
  }
  const url = '/v1/books/add_reading_list'

  const response = await fetchApi(
    url,
    'POST',
    {
      variables: payload,
    }
  )

  return response
}

export const MarkAsUnread = async (bookId: number) => {
  const payload = {
    id: bookId
  }
  const url = '/v1/books/mark_as_unread'

  const response = await fetchApi(
    url,
    'POST',
    {
      variables: payload,
    }
  )

  return response
}

export const MarkAsRead = async (bookId: number) => {
  const payload = {
    id: bookId
  }
  const url = '/v1/books/mark_as_read'

  const response = await fetchApi(
    url,
    'POST',
    {
      variables: payload,
    }
  )

  return response
}
