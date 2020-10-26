import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'

import '../styles/signUp.scss'
import { authHeader } from '../auth'

export function SignUp() {
  const history = useHistory()
  const [isUploading, setIsUploading] = useState(false)

  const [errorMessage, setErrorMessage] = useState()

  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    password: '',
    photoURL: '',
  })
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropFile,
  })

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedUser = { ...newUser, [fieldName]: value }

    setNewUser(updatedUser)
  }
  async function handleFormSubmit(event) {
    event.preventDefault()

    const response = await fetch('/api/Users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newUser),
    })
    const apiResponse = await response.json()

    if (apiResponse.status === 400) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      history.push('/')
    }
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
      // sent along when creating the user,
      // otherwise show an error
      if (response.status === 200) {
        const apiResponse = await response.json()

        const url = apiResponse.url

        setNewUser({ ...newUser, photoURL: url })
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
  let dropZoneMessage = 'Drag a picture of the user here to upload!'

  if (isUploading) {
    dropZoneMessage = 'Uploading...'
  }

  if (isDragActive) {
    dropZoneMessage = 'Drop the files here ...'
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="container">
          <h1 className="signUp">Sign Up</h1>
          <section>
            <p>Please fill in this form to create an account.</p>

            {errorMessage && <p>{errorMessage}</p>}
            <label for="fullName">
              <b>Full Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              name="fullName"
              value={newUser.fullName}
              onChange={handleStringFieldChange}
              required
            />
            <label for="email">
              <b>Email</b>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              value={newUser.email}
              onChange={handleStringFieldChange}
            />

            <label for="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={newUser.password}
              onChange={handleStringFieldChange}
            />
            {newUser.photoURL && (
              <p>
                <img alt="User Photo" width={200} src={newUser.photoURL} />
              </p>
            )}

            <div className="file-drop-zone">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {dropZoneMessage}
              </div>
            </div>

            <label>
              <input type="checkbox" checked="checked" name="remember" />{' '}
              Remember me
            </label>

            <div className="clearfix">
              <button type="button" className="cancelbtn">
                Cancel
              </button>
              <button type="submit" className="signupbtn">
                Sign Up
              </button>
            </div>
          </section>
        </div>
      </form>
    </>
  )
}
