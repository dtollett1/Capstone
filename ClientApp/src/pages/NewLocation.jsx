import React, { useState } from 'react'

export function NewLocation() {
  const [newLocation, setNewLocation] = useState({
    name: '',
    description: '',
    address: '',
    telephone: '',
  })

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name
    const updatedLocation = { ...newLocation, [fieldName]: value }
    setNewLocation(updatedLocation)
  }
  return (
    <>
      <main>
        <h2>Add a Location</h2>
        <form action="#">
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
