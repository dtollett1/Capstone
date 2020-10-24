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
        <nav>
          <h2>{film.title}</h2>
          <h3>{film.year}</h3>
          <img src={film.poster} width="210" height="315" />
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/U1fu_sA7XhE"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <h2>Locations</h2>

          <ul>
            {film.locations.map((location) => (
              <li key={location.id} className="results">
                <h2>
                  <Link to={`/locations/${location.id}`}>{location.name}</Link>
                </h2>
                <p>{location.description}</p>
                <address>{location.address}</address>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </>
  )
}
