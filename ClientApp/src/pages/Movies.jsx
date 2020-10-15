import React, { useState, useEffect } from 'react'
import axios from 'axios'

export function Movies() {
  const [movies, setMovies] = useState({})

  // useEffect(() => {
  //   async function fetchMovies() {
  //     const response = await fetch(
  //       `https://api.themoviedb.org/3/discover/movie?&sort_by=popularity.desc&api_key=e2491dbfebc8bc34967b24ea37c22a92`
  //     )
  //     const apiData = await response.json()
  //     setMovies(apiData)
  //   }
  //   fetchMovies()
  // }, [])
  return (
    <>
      <section>
        <h2>New York</h2>

        <ul>
          <li>
            <img
              // src={`https://image.tmdb.org/t/p/w185/${poster_path}`}
              width="210"
              height="315"
            ></img>
          </li>
          <li>
            <img
              src="https://theposterdb.com/api/assets/36537"
              width="210"
              height="315"
            ></img>
          </li>
          <li>
            <img
              src="https://theposterdb.com/api/assets/35174"
              width="210"
              height="315"
            ></img>
          </li>
          <li>
            <img
              src="https://theposterdb.com/api/assets/5918"
              width="210"
              height="315"
            ></img>
          </li>
          <li>
            <img
              src="https://theposterdb.com/api/assets/35901"
              width="210"
              height="315"
            ></img>
          </li>
          <li>
            <img
              src="https://theposterdb.com/api/assets/560"
              width="210"
              height="315"
            ></img>
          </li>
        </ul>
      </section>
    </>
  )
}
