import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

export function MovieDetail() {
  const params = useParams()
  const id = params.id

  const [film, setFilm] = useState({
    title: '',
    description: '',
    year: '',
    poster: '',
    locations: [],
    trailer: '',
  })

  useEffect(() => {
    async function fetchFilm() {
      const response = await fetch(`/api/Films/${id}`)
      const apiData = await response.json()
      setFilm(apiData)
    }
    fetchFilm()
  }, [id])

  return (
    <>
      <main>
        <div className="filmhead">
          <h1>{film.title}</h1>
          <h2>{film.year}</h2>
          <iframe
            width="560"
            height="315"
            src={film.trailer}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <img src={film.poster} width="210" height="315" />
        </div>
        <div className="locationsList">
          <h2>Locations</h2>
          <ul>
            {film.locations.map((location) => (
              <li key={location.id} className="results">
                <h2>
                  <Link to={`/locations/${location.id}`}>{location.name}</Link>
                </h2>

                <address>{location.address}</address>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}
