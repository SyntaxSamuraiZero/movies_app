export default async function postRating(movieId, rating) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      value: rating,
    }),
  }

  let guestSessionId = localStorage.getItem('guestSessionId')
  const apiKey = process.env.REACT_APP_API_KEY

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${guestSessionId}`,
      options
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
  } catch (err) {
    console.error(err)
  }
}
