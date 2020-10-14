import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import '../styles/signUp.scss'

export function SignUp() {
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState()

  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    password: '',
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
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="container">
          <h1>Sign Up</h1>
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

          <label>
            <input type="checkbox" checked="checked" name="remember" /> Remember
            me
          </label>

          <div className="clearfix">
            <button type="button" className="cancelbtn">
              Cancel
            </button>
            <button type="submit" className="signupbtn">
              Sign Up
            </button>
          </div>
        </div>
      </form>{' '}
    </>
  )
}
