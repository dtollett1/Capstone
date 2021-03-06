import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'
import { useDropzone } from 'react-dropzone'

import { authHeader } from '../auth'
import { MovieDetail } from './MovieDetail'

export function NewLocation() {
  const [isUploading, setIsUploading] = useState(false)

  const [movies, setMovies] = useState([])

  const [errorMessage, setErrorMessage] = useState('')

  const [newLocation, setNewLocation] = useState({
    name: '',
    description: '',
    address: '',
    movie: '',
    photoURL: '',
    filmId: 0,
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
      headers: { 'content-type': 'application/json', ...authHeader() },
      body: JSON.stringify(newLocation),
    })
    if (response.status === 401) {
      setErrorMessage('Not Authorized')
    } else {
      const json = await response.json()
      if (response.status === 400) {
        setErrorMessage(Object.values(json.errors).join(' '))
      } else {
        history.push('/')
      }
    }
    console.log(newLocation)
  }
  function getMovies() {
    // const response = await fetch('/api/Films')
    // const apiData = response.json()
    // setMovies(await apiData)
    // setNewLocation({ ...newLocation, filmId: apiData[0].id })
    // console.log(apiData)
    fetch('/api/Films')
      .then((response) => {
        return response.json()
      })
      .then((apiData) => {
        setMovies(apiData)
        setNewLocation({ ...newLocation, filmId: apiData[0].id })
      })
  }
  console.log(newLocation)
  async function onDropFile(acceptedFiles) {
    const fileToUpload = acceptedFiles[0]
    console.log(fileToUpload)

    const formData = new FormData()

    formData.append('file', fileToUpload)

    try {
      setIsUploading(true)

      const response = await fetch('/api/Uploads', {
        method: 'POST',
        headers: {
          ...authHeader(),
        },
        body: formData,
      })

      setIsUploading(false)

      if (response.status === 200) {
        const apiResponse = await response.json()

        const url = apiResponse.url

        setNewLocation({ ...newLocation, photoURL: url })
      } else {
        setErrorMessage('Unable to upload image')
      }
    } catch {
      setIsUploading(false)

      setErrorMessage('Unable to upload image')
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropFile,
  })

  let dropZoneMessage = 'Drag a picture of the location here to upload!'

  if (isUploading) {
    dropZoneMessage = 'Uploading...'
  }

  if (isDragActive) {
    dropZoneMessage = 'Drop the files here ...'
  }
  useEffect(() => {
    getMovies()
  }, [])
  console.log(movies)

  return (
    <>
      <main>
        <div className="container">
          <h2>Add a Location</h2>
          <form onSubmit={handleFormSubmit}>
            {errorMessage && <p>{errorMessage}</p>}
            <p>
              <label htmlFor="name">Name</label>
              <input
                className="textForm"
                type="text"
                name="name"
                value={newLocation.name}
                onChange={handleStringFieldChange}
              />
            </p>
            <p>
              <label htmlFor="description">Description</label>
              <textarea
                className="textForm"
                name="description"
                value={newLocation.description}
                onChange={handleStringFieldChange}
              ></textarea>
              <span className="note">
                Enter a Brief description of the Location.
              </span>
            </p>
            <p>
              <label htmlFor="address">Address</label>
              <input
                className="textForm"
                name="address"
                value={newLocation.address}
                onChange={handleStringFieldChange}
              ></input>
            </p>
            <p className="form-input">
              <label htmlFor="name">Movie</label>
              {/* <input
              name="movie"
              value={newLocation.movie}
              onChange={handleStringFieldChange}
            /> */}
              <select
                className="textForm"
                onChange={(event) => {
                  setNewLocation({
                    ...newLocation,
                    filmId: parseInt(event.target.value),
                  })
                }}
              >
                {movies.map((movie) => (
                  <option key={movie.id} value={movie.id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </p>
            {newLocation.photoURL && (
              <p>
                <img
                  alt="Location Photo"
                  width={200}
                  src={newLocation.photoURL}
                />
              </p>
            )}
            <div className="file-drop-zone">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {dropZoneMessage}
              </div>
            </div>
            <p>
              <input className="submit" type="submit" value="submit" />
            </p>
          </form>
        </div>
      </main>
    </>
  )
}
