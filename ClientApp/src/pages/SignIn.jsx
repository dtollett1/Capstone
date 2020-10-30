import React, { useState } from 'react'
import { recordAuthentication } from '../auth'

import '../styles/signIn.scss'

export function SignIn() {
  const [errorMessage, setErrorMessage] = useState()

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  function handleStringFieldChange(event) {
    const value = event.target.value
    const fieldName = event.target.name

    const updatedUser = { ...user, [fieldName]: value }

    setUser(updatedUser)
  }

  async function handleFormSubmit(event) {
    event.preventDefault()

    const response = await fetch('/api/Sessions', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(user),
    })

    const apiResponse = await response.json()

    if (apiResponse.status === 400) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      // TODO, record the login
      recordAuthentication(apiResponse)
      window.location.assign('/')
    }
  }
  return (
    <>
      <section className="signIn">
        <form onSubmit={handleFormSubmit} method="post">
          {errorMessage && <p>{errorMessage}</p>}
          <div className="container">
            <label>
              <b>Email</b>
            </label>
            <input
              className="signIn"
              type="text"
              placeholder="Enter Email"
              name="email"
              value={user.email}
              onChange={handleStringFieldChange}
            />

            <label>
              <b>Password</b>
            </label>
            <input
              className="signIn"
              type="password"
              placeholder="Enter Password"
              name="password"
              value={user.password}
              onChange={handleStringFieldChange}
            />

            <button type="submit">Login</button>
          </div>
        </form>
      </section>
    </>
  )
}
