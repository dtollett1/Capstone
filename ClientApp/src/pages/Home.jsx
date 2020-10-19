import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl'

import logo from '../images/onlocation.png'
import '../styles/home.scss'

export function Home() {
  const [locations, setLocations] = useState([])
  const [filterText, setFilterText] = useState('')
  const [movies, setMovies] = useState([])

  const [selectedMapLocation, setSelectedMapLocation] = useState(null)

  const [viewport, setViewport] = useState({
    width: 327,
    height: 264,
    latitude: 27.77101804911986,
    longitude: -82.66090611749074,
    zoom: 9.8,
  })

  // useEffect(() => {
  //   async function fetchMovies() {
  //     const response = await fetch(
  //       'https://api.themoviedb.org/3/discover/movie?&sort_by=popularity.desc&api_key=e2491dbfebc8bc34967b24ea37c22a92'
  //     )
  //     const apiData = await response.json()
  //     console.log(apiData.results)
  //     setMovies(apiData.results)
  //   }
  //   fetchMovies()
  // }, [])

  useEffect(
    function () {
      async function loadLocations() {
        const url = `/api/locations?filter=${filterText}`
        const { data: newLocations } = await axios({
          method: 'get',
          url: url,
        })

        setLocations(newLocations)
      }
      loadLocations()
    },
    [filterText]
  )
  return (
    <>
      <main className="home">
        <section>
          <div>
            <input
              type="text"
              placeholder="Search..."
              value={filterText}
              onChange={function (event) {
                setFilterText(event.target.value)
              }}
            />
          </div>
        </section>
        <h1>On Location</h1>

        <h2>Movie Locations Near You</h2>
        <ul>
          <li>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Exercitationem recusandae illo in aut? Nam dolores esse at, quos
            saepe possimus, optio eos eum illum doloremque delectus ipsam itaque
            illo mollitia.
          </li>
        </ul>
        <h2>Plan Your Next Location</h2>
        <ul>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati,
            voluptatibus? Iste, quibusdam explicabo adipisci quis facilis
            accusantium dolorem tempore, molestiae, modi accusamus similique
            veritatis iusto quas est perspiciatis pariatur vel.
          </li>
        </ul>
        <h2>Mapped Locations</h2>
        <section className="map">
          <ReactMapGL
            style={{ position: 'absolute' }}
            {...viewport}
            onViewportChange={setViewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          >
            {selectedMapLocation && (
              <Popup
                latitude={selectedMapLocation.latitude}
                longitude={selectedMapLocation.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setSelectedMapLocation(null)}
                offsetTop={-5}
              >
                <div>
                  <p>{selectedMapLocation.name}</p>
                  <p>{selectedMapLocation.description}</p>
                </div>
              </Popup>
            )}
            {locations.map((location) => (
              <Marker
                key={location.id}
                latitude={location.latitude}
                longitude={location.longitude}
              >
                <span
                  role="img"
                  aria-label={location.name}
                  onClick={() => setSelectedMapLocation(location)}
                >
                  🎬
                </span>
              </Marker>
            ))}

            <div style={{ position: 'absolute', right: 0 }}>
              <NavigationControl />
            </div>
          </ReactMapGL>
        </section>
        <section className="movieList">
          <h2>Movies</h2>
          <h3>New York</h3>
          {/* <ul>
            {movies.map((movie) => (
              <li>
                <img
                  src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
                  width="210"
                  height="315"
                ></img>
              </li>
            ))}
          </ul> */}
          <h3>Chicago</h3>
          <ul>
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
          <h3>Tampa</h3>
          <ul>
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
      </main>
    </>
  )
}
