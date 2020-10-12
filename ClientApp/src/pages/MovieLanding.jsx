import React, { useState, useEffect } from 'react'
import axios from 'axios'
import logo from '../images/onlocation.png'
import map from '../images/map.png'

export function MovieLanding() {
  const [locations, setLocations] = useState([])
  const [filterText, setFilterText] = useState('')

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
      <main>
        <div>
          <img className="logo" src={logo} height="200" width="250" />
          <h1>Locations</h1>
          <input
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={function (event) {
              setFilterText(event.target.value)
            }}
          />
          {locations.map((location) => (
            <section key={location.id}>
              <h2>{location.name}</h2>
              {/* <img src={map} height="200" width="200" /> */}
              <p>{location.description}</p>
              <p>{location.address}</p>
            </section>
          ))}
        </div>
        <div>
          <h1>Reviews</h1>
          <section>
            <h2></h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est
              repudiandae, quos dignissimos omnis minima velit consequatur
              facilis, aut magnam fugit eos ad saepe dolorem facere. Itaque
              debitis maiores obcaecati eos?
            </p>
          </section>
          <section>
            <h2></h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est
              repudiandae, quos dignissimos omnis minima velit consequatur
              facilis, aut magnam fugit eos ad saepe dolorem facere. Itaque
              debitis maiores obcaecati eos?
            </p>
          </section>{' '}
          <section>
            <h2></h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est
              repudiandae, quos dignissimos omnis minima velit consequatur
              facilis, aut magnam fugit eos ad saepe dolorem facere. Itaque
              debitis maiores obcaecati eos?
            </p>
          </section>
        </div>
      </main>
    </>
  )
}