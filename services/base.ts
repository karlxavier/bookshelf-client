import { getSession } from 'next-auth/react'

const BASE_URL = 'http://localhost:3001';

const fetchApi = async(url: string, method: string, payload: any = null) => {
  const session = await getSession()
  const userSession = JSON.stringify(session?.user);
  const accessToken = JSON.parse(userSession)?.accessToken
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: payload
  }
  const reqUrl = `${BASE_URL}${url}`
  const response = await fetch(reqUrl, options)
  const result = await response.json();

  if (result.errors) {
    console.error(result.errors)
    throw new Error('Failed to fetch API')
  }

  return result
}

export { fetchApi };