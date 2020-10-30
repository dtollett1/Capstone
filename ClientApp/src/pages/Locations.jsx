import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl'
import { Link } from 'react-router-dom'

import '../styles/locations.scss'

export function Locations() {
  const [locations, setLocations] = useState([])
  const [filterText, setFilterText] = useState('')

  const [selectedMapLocation, setSelectedMapLocation] = useState(null)

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
      {/* <section className="map">
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
              <div className="popup">
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
      </section> */}

      <div className="category">
        <h1>Locations</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={function (event) {
          setFilterText(event.target.value)
        }}
      />
      <div>
        <ul className="locationResults">
          {locations.map((location) => (
            <li key={location.id}>
              <h2>
                <Link to={`/locations/${location.id}`}>{location.name}</Link>
              </h2>
              {/* <img src={map} height="200" width="200" /> */}

              <p className="description">{location.description}</p>
              <address>{location.address}</address>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
