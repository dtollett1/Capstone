import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export function LocationDetail() {
  const params = useParams()
  const id = params.id

  const [location, setLocation] = useState({
    name: '',
    description: '',
    address: '',
    telephone: '',
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
          <a href="/">
            <i className="fa fa-home"></i>
          </a>
          <h2>{location.name}</h2>
        </nav>
        <address>{location.address}</address>
        <hr />
        <h3>Photos for {location.name} </h3>
      </main>
    </>
  )
}
