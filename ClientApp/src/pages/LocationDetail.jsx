import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import format from 'date-fns/format'
import { getUser, authHeader, isLoggedIn } from '../auth'

const dateFormat = `EEEE, MMMM do, yyyy 'at' h:mm aaa`

export function LocationDetail() {
  const history = useHistory()

  const user = getUser()

  const params = useParams()
  const id = params.id

  const [location, setLocation] = useState({
    name: '',
    description: '',
    address: '',
    movie: '',
    photoURL: '',
    reviews: [],
  })

  const [newReview, setNewReview] = useState({
    body: '',
    summary: '',
    locationId: id,
  })

  async function fetchLocation() {
    const response = await fetch(`/api/Locations/${id}`)
    const apiData = await response.json()

    setLocation(apiData)
  }
  useEffect(() => {
    fetchLocation()
  }, [id])

  // useEffect(() => {
  //   async function fetchLocation() {
  //     const response = await fetch(`/api/Locations/${id}`)
  //     const apiData = await response.json()
  //     setLocation(apiData)
  //   }
  //   fetchLocation()
  // }, [id])

  async function handleDelete(event) {
    event.preventDefault()

    const response = await fetch(`/api/Locations/${id}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json', ...authHeader() },
    })

    if (response.status === 200 || response.status === 204) {
      history.push('/')
    }
  }

  async function handleDeleteReview(event, reviewId) {
    event.preventDefault()

    await fetch(`/api/Reviews/${reviewId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json', ...authHeader() },
    })

    fetchLocation()
  }

  return (
    <>
      <main className="page">
        <nav>
          <h2>{location.name}</h2>
        </nav>
        <address>{location.address}</address>
        <hr />
        <p>{location.description}</p>
        <h3>Photos For {location.name} </h3>
        {location.photoURL && (
          <img alt="Location Photo" width={200} src={location.photoURL} />
        )}
        {isLoggedIn() && location.userId === user.id && (
          <button onClick={handleDelete}>Delete</button>
        )}
        {isLoggedIn() && location.userId === user.id && (
          <button>
            <Link className="button" to={`/locations/${id}/edit`}>
              Edit
            </Link>
          </button>
        )}
        {location.reviews.length > 0 && (
          <h3>Reviews htmlFor {location.name}</h3>
        )}
        {location.reviews.length}({location.reviews.length})
        <ul className="reviews">
          {location.reviews.map((review) => (
            <li key={review.id}>
              <div className="author">
                Gavin said: <em>{review.summary}</em>
              </div>
              <div className="body">
                <p>{review.body}</p>
              </div>
              <div className="meta">
                <span
                  className="stars"
                  style={{ '--rating': review.stars }}
                  aria-label={`Star rating of this location is ${review.stars} out of 5.`}
                ></span>
                <time>{format(new Date(review.createdAt), dateFormat)}</time>
              </div>
              {isLoggedIn() && review.user.id === user.id && (
                <div>
                  <button
                    className="small"
                    onClick={(event) => handleDeleteReview(event, review.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
        {/* <h3>Enter your own review</h3>
        <form action="#">
          <p className="form-input">
            <label htmlFor="summary">Summary</label>
            <input type="text" name="summary" />
            <span className="note">
              Enter a brief summary of your review. Example:{' '}
              <strong>Lorem ipsum, dolor si</strong>
            </span> */}
        {/* </p> */}
        {/* <p className="form-input">
            <label htmlFor="review">Review</label>
            <textarea type="text" name="review"></textarea>
          </p>
          <p className="rating">
            <input
              id="star-rating-1"
              type="radio"
              name="star-rating"
              value="1"
            />
            <label htmlFor="star-rating-1">1 star</label>
            <input
              id="star-rating-2"
              type="radio"
              name="star-rating"
              value="2"
            />
            <label htmlFor="star-rating-2">2 stars</label>
            <input
              id="star-rating-3"
              type="radio"
              name="star-rating"
              value="3"
            />
            <label htmlFor="star-rating-3">3 stars</label>
            <input
              id="star-rating-4"
              type="radio"
              name="star-rating"
              value="4"
            />
            <label htmlFor="star-rating-4">4 stars</label>
            <input
              id="star-rating-5"
              type="radio"
              name="star-rating"
              value="5"
            />
            <label htmlFor="star-rating-5">5 stars</label>
            <div className="star-rating">
              <label
                htmlFor="star-rating-1"
                aria-label="1 star"
                title="1 star"
              ></label>
              <label
                htmlFor="star-rating-2"
                aria-label="2 stars"
                title="2 stars"
              ></label>
              <label
                htmlFor="star-rating-3"
                aria-label="3 stars"
                title="3 stars"
              ></label>
              <label
                htmlFor="star-rating-4"
                aria-label="4 stars"
                title="4 stars"
              ></label>
              <label
                htmlFor="star-rating-5"
                aria-label="5 stars"
                title="5 stars"
              ></label>
            </div>
          </p>
          <p>
            <input type="submit" value="Submit" />
          </p>
        </form> */}
      </main>
    </>
  )
}
