export default async function createGuestSession() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }
  const apiKey = process.env.REACT_APP_API_KEY

  if (localStorage.getItem('guestSessionId')) {
    return
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`,
      options
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    localStorage.setItem('guestSessionId', data.guest_session_id)
  } catch (err) {
    console.error(err)
  }
}
