import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl'

import '../styles/home.scss'
import { Link } from 'react-router-dom'

export function Home() {
  const [locations, setLocations] = useState([])
  const [filterText, setFilterText] = useState('')
  const [films, setFilms] = useState([])

  const [selectedMapLocation, setSelectedMapLocation] = useState(null)

  const [viewport, setViewport] = useState({
    width: 650,
    // 327
    height: 530,
    // 264
    latitude: 27.77101804911986,
    longitude: -82.66090611749074,
    zoom: 9.8,
  })

  useEffect(
    function () {
      async function loadFilms() {
        const url = `/api/films?filter=${filterText}`
        const { data: newFilms } = await axios({
          method: 'get',
          url: url,
        })

        setFilms(newFilms)
      }
      loadFilms()
    },
    [filterText]
  )

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
        <h2 className="category">Mapped Locations</h2>
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
        <section>
          <h2 className="category">Movies</h2>
          {/* <input
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={function (event) {
              setFilterText(event.target.value)
            }}
          /> */}
          <ul className="movieList">
            {films.map((film) => (
              <li key={film.id}>
                <img
                  src={film.poster}
                  width="210"
                  height="315"
                  alt={film.title}
                ></img>
                <h2>
                  <Link to={`/films/${film.id}`}>{film.title}</Link>
                </h2>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}
