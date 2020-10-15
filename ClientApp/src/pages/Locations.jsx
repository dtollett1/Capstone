import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactMapGL, { NavigationControl } from 'react-map-gl'

import logo from '../images/onlocation.png'
import map from '../images/map.png'
import { Link } from 'react-router-dom'

export function Locations() {
  const [locations, setLocations] = useState([])
  const [filterText, setFilterText] = useState('')

  const [viewport, setViewport] = useState({
    width: 327,
    height: 264,
    latitude: 27.77101804911986,
    longitude: -82.66090611749074,
    zoom: 9.8,
  })

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
      <nav className="result"></nav>
      <div>
        {/* <img className="logo" src={logo} height="200" width="250" /> */}
        <h1>Locations</h1>
        <input
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={function (event) {
            setFilterText(event.target.value)
          }}
        />
        <section className="map">
          <ReactMapGL
            style={{ position: 'absolute' }}
            {...viewport}
            onViewportChange={setViewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          >
            <div style={{ position: 'absolute', right: 0 }}>
              <NavigationControl />
            </div>
          </ReactMapGL>
        </section>
        <ul className="results">
          {locations.map((location) => (
            <li key={location.id}>
              <h2>
                <Link to={`/locations/${location.id}`}>{location.name}</Link>
              </h2>
              {/* <img src={map} height="200" width="200" /> */}
              <p>
                <span
                  className="stars"
                  style={{ '--rating': 4.5 }}
                  aria-label="Star rating of this location is 4.7 out of 5"
                ></span>
                ({location.reviews.length})
              </p>
              <p>{location.description}</p>
              <address>{location.address}</address>
            </li>
          ))}
        </ul>
      </div>
      <div></div>
    </>
  )
}
