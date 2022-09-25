import { fetchApi } from "./base";

export type BookProps = {
  id: string
  title: string
  description: string
  author: string
  image: string
}

export const getAvailableBooks = async () => {
  const url = '/v1/books/discover'
  const response = await fetchApi(url, 'GET')
  return response as { data: BookProps[] }
}

export const getFinishedBooks = async () => {
  const url = '/v1/books/finished_books'
  const response = await fetchApi(url, 'GET')
  return response as { data: BookProps[] }
}

export const getReadingList = async () => {
  const url = '/v1/books/reading_lists'
  const response = await fetchApi(url, 'GET')
  return response
}

export const searchBooks = async () => {
  const url = '/v1/books/search'
  const response = await fetchApi(url, 'GET')
  return response
}

export const AddToReadingList = async (id: string) => {
  const payload = {
    id: id
  }
  const url = '/v1/books/add_reading_list'

  const response = await fetchApi(
    url,
    'POST',
    payload
  )

  return response
}

export const MarkAsUnread = async (id: string) => {
  const payload = {
    id: id
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

export const MarkAsRead = async (id: string) => {
  const payload = {
    id: id
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
