import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import format from 'date-fns/format'

const dateFormat = `EEEE, MMMM do, yyyy 'at' h:mm aaa`

export function LocationDetail() {
  const params = useParams()
  const id = params.id

  const [location, setLocation] = useState({
    name: '',
    description: '',
    address: '',
    telephone: '',
    reviews: [],
  })

  useEffect(() => {
    async function fetchLocation() {
      const response = await fetch(`/api/Locations/${id}`)
      const apiData = await response.json()
      setLocation(apiData)
    }
    fetchLocation()
  }, [id])

  return (
    <>
      <main className="page">
        <nav>
          <h2>{location.name}</h2>
        </nav>
        <address>{location.address}</address>
        <hr />
        <h3>Photos For {location.name} </h3>
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
            </li>
          ))}
        </ul>
        <h3>Enter your own review</h3>
        <form action="#">
          <p className="form-input">
            <label htmlFor="summary">Summary</label>
            <input type="text" name="summary" />
            <span className="note">
              Enter a brief summary of your review. Example:{' '}
              <strong>Great food, good prices.</strong>
            </span>
          </p>
          <p className="form-input">
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
        </form>
      </main>
    </>
  )
}
