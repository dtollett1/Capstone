import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'

import '../styles/signUp.scss'
import { authHeader } from '../auth'

export function SignUp() {
  const history = useHistory()
  const [isUploading, setIsUploading] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')

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

        setNewUser({ ...newUser, photoURL: url })
      } else {
        setErrorMessage('Unable to upload image')
      }
    } catch (error) {
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
            <label>
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
            <label>
              <b>Email</b>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              value={newUser.email}
              onChange={handleStringFieldChange}
            />

            <label>
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

            <div className="clearfix">
              <button type="button" className="cancelButton">
                Cancel
              </button>
              <button type="submit" className="signupButton">
                Sign Up
              </button>
            </div>
          </section>
        </div>
      </form>
    </>
  )
}
