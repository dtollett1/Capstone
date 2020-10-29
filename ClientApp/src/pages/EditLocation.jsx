import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import Axios from 'axios'

import { authHeader } from '../auth'

export function EditLocation() {
  const params = useParams()
  const id = params.id
  const history = useHistory()

  const [isUploading, setIsUploading] = useState(false)

  const [movies, setMovies] = useState([])

  const [errorMessage, setErrorMessage] = useState()

  const [location, setLocation] = useState({
    name: '',
    description: '',
    address: '',
    movie: '',
    photoURL: '',
    filmId: 0,
  })
  useEffect(() => {
    fetchLocation()
  }, [id])

  const fetchLocation = async () => {
    const response = await fetch(`/api/Locations/${id}`)
    const apiData = await response.json()

    setLocation(apiData)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropFile,
  })

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedLocation = { ...location, [fieldName]: value }

    setLocation(updatedLocation)
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    const response = await fetch(`/api/Locations/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json', ...authHeader() },
      body: JSON.stringify(location),
    })

    if (response.status === 401) {
      setErrorMessage('Not Authorized')
    } else {
      if (response.status === 400) {
        const json = await response.json()

        setErrorMessage(Object.values(json.errors).join(' '))
      } else {
        history.push('/home')
      }
    }
  }

  async function getMovies() {
    const response = await fetch('/api/Films')
    const apiData = response.json()
    setMovies(await apiData)
  }

  async function onDropFile(acceptedFiles) {
    // Do something with the files
    const fileToUpload = acceptedFiles[0]
    console.log(fileToUpload)

    // Create a formData object so we can send this
    // to the API that is expecting som form data.
    const formData = new FormData()

    // Append a field that is the form upload itself
    formData.append('file', fileToUpload)

    try {
      setIsUploading(true)

      // Use fetch to send an authorization header and
      // a body containing the form data with the file
      const response = await fetch('/api/Uploads', {
        method: 'POST',
        headers: {
          ...authHeader(),
        },
        body: formData,
      })

      setIsUploading(false)

      // If we receive a 200 OK response, set the
      // URL of the photo in our state so that it is
      // sent along when creating the location,
      // otherwise show an error
      if (response.status === 200) {
        const apiResponse = await response.json()

        const url = apiResponse.url

        setLocation({ ...location, photoURL: url })
      } else {
        setErrorMessage('Unable to upload image')
      }
    } catch (error) {
      // Catch any network errors and show the user we could not process their upload
      console.debug(error)
      setErrorMessage('Unable to upload image')
      setIsUploading(false)
    }
  }

  let dropZoneMessage = 'Drag a picture of the location here to upload!'

  if (isUploading) {
    dropZoneMessage = 'Uploading...'
  }

  if (isDragActive) {
    dropZoneMessage = 'Drop the files here ...'
  }

  if (!location.id) {
    return <></>
  }

  // useEffect(() => {
  //   getMovies()
  // }, [])
  // console.log(movies)

  return (
    <main>
      <div className="container">
        <nav>
          <h2>Edit a Location</h2>
        </nav>
        <form onSubmit={handleFormSubmit}>
          {errorMessage && <p>{errorMessage}</p>}

          <p>
            <label htmlFor="name">Name</label>
            <input
              className="textForm"
              type="text"
              name="name"
              value={location.name}
              onChange={handleStringFieldChange}
            />
          </p>

          <p>
            <label htmlFor="description">Description</label>
            <textarea
              className="textForm"
              name="description"
              value={location.description}
              onChange={handleStringFieldChange}
            ></textarea>
            <span className="note">
              Enter a brief description of the location.
            </span>
          </p>
          <p className="form-input">
            <label htmlFor="name">Address</label>
            <textarea
              className="textForm"
              name="address"
              value={location.address}
              onChange={handleStringFieldChange}
            ></textarea>
          </p>

          {/* <select
            className="textForm"
            onChange={(event) => {
              setLocation({
                ...location,
                filmId: parseInt(event.target.value),
              })
            }}
          >
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))}
          </select> */}

          {location.photoURL && (
            <p>
              <img alt="Location Photo" width={200} src={location.photoURL} />
            </p>
          )}

          <div className="file-drop-zone">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {dropZoneMessage}
            </div>
          </div>

          <p>
            <input className="submit" type="submit" value="Submit" />
          </p>
        </form>
      </div>
    </main>
  )
}
