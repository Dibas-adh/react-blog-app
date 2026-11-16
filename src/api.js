// Small helper around fetch() for the JSONPlaceholder API.
// It throws on HTTP errors (fetch only rejects on network failures),
// so every caller can handle problems in a single .catch().
export const API_URL = 'https://jsonplaceholder.typicode.com'

export class NotFoundError extends Error {}

export async function fetchJson(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options)
  if (response.status === 404) {
    throw new NotFoundError(`Not found: ${path}`)
  }
  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`)
  }
  return response.json()
}

// Sends JSON with a POST request and returns the parsed response
export function postJson(path, data) {
  return fetchJson(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data),
  })
}

// True when a request was cancelled on purpose (e.g. the component unmounted)
export const isAbortError = (error) => error.name === 'AbortError'
