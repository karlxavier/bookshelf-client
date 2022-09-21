const API_ENDPOINT = 'http://localhost:3001'
import { getSession } from 'next-auth/react'

const fetchApi = async(url: string, method: string, { variables }: Record<string, any> = {}) => {
  const session = await getSession()
  const userSession = JSON.stringify(session?.user);
  const accessToken = JSON.parse(userSession)?.accessToken

  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: variables
  }
  
  const response = await fetch(url, options)
  const result = await response.json();

  if (result.errors) {
    console.error(result.errors)
    throw new Error('Failed to fetch API')
  }

  return result
}

export const getAvailableBooks = async () => {
  const url = `${API_ENDPOINT}/v1/books/discover`
  const response = await fetchApi(url, 'GET')
  return response
}

export const getFinishedBooks = async () => {
  const url = `${API_ENDPOINT}/v1/books/finished_books`
  const response = await fetchApi(url, 'GET')
  return response
}

export const getReadingList = async () => {
  const url = `${API_ENDPOINT}/v1/books/reading_list`
  const response = await fetchApi(url, 'GET')
  return response
}

export const AddToReadingList = async (bookId: number) => {
  const payload = {
    id: bookId
  }
  const url = `${API_ENDPOINT}/v1/books/add_reading_list`

  const response = await fetchApi(
    url,
    'POST',
    {
      variables: JSON.stringify(payload),
    }
  )

  return response
}

export const MarkAsUnread = async (bookId: number) => {
  const payload = {
    id: bookId
  }
  const url = `${API_ENDPOINT}/v1/books/mark_as_unread`

  const response = await fetchApi(
    url,
    'POST',
    {
      variables: JSON.stringify(payload),
    }
  )

  return response
}

export const MarkAsRead = async (bookId: number) => {
  const payload = {
    id: bookId
  }
  const url = `${API_ENDPOINT}/v1/books/mark_as_read`

  const response = await fetchApi(
    url,
    'POST',
    {
      variables: JSON.stringify(payload),
    }
  )

  return response
}
