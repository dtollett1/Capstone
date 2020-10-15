import React, { useState, useEffect } from 'react'
import axios from 'axios'

import logo from '../images/onlocation.png'
import '../styles/home.scss'

export function Home() {
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
      </main>
    </>
  )
}
