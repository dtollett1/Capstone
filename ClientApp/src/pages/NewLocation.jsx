import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

export function NewLocation() {
  const [newLocation, setNewLocation] = useState({
    name: '',
    description: '',
    address: '',
    telephone: '',
  })
  const history = useHistory()
  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name
    const updatedLocation = { ...newLocation, [fieldName]: value }
    setNewLocation(updatedLocation)
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    const response = await fetch('/api/Locations', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newLocation),
    })
    const json = await response.json()

    history.push('/')
  }

  return (
    <>
      <main>
        <h2>Add a Location</h2>
        <form onSubmit={handleFormSubmit}>
          <p className="form-input">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={newLocation.name}
              onChange={handleStringFieldChange}
            />
          </p>
          <p className="form-input">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={newLocation.description}
              onChange={handleStringFieldChange}
            ></textarea>
            <span className="note">
              Enter a Brief description of the Location.
            </span>
          </p>
          <p className="form-input">
            <label htmlFor="address">Address</label>
            <textarea
              name="address"
              value={newLocation.address}
              onChange={handleStringFieldChange}
            ></textarea>
          </p>
          <p className="form-input">
            <label htmlFor="name">Telephone</label>
            <input
              type="tel"
              name="telephone"
              value={newLocation.telephone}
              onChange={handleStringFieldChange}
            />
          </p>
          <p className="form-input">
            <label htmlFor="picture">Picture</label>
            <input type="file" name="picture" />
          </p>
          <p>
            <input type="submit" value="submit" />
          </p>
        </form>
      </main>
    </>
  )
}
