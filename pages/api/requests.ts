const API_ENDPOINT = 'http://localhost:3001'

export const getAvailableBooks = async (token: string) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }

  const response = await fetch(`${API_ENDPOINT}/v1/books/discover`, options)
  const result = await response.json()  

  return result
};

export const AddToReadingList = async (token: string, bookId: number) => {
  const payload = {
    id: bookId
  }

  const body = JSON.stringify(payload)
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: body,
  }

  const response = await fetch(`${API_ENDPOINT}/v1/books/add_reading_list`, options)

  return response
}
