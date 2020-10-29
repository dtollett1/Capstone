import React, { useReducer, useRef } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import './styles/custom.scss'
import { Home } from './pages/Home'
import { Locations } from './pages/Locations'
import { NewLocation } from './pages/NewLocation'
import { LocationDetail } from './pages/LocationDetail'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { MovieDetail } from './pages/MovieDetail'
import { EditUser } from './pages/EditUser'
import { isLoggedIn, logout, getUser } from './auth'
import { EditLocation } from './pages/EditLocation'

function handleLogout() {
  logout()
}
const user = getUser()

export function App() {
  return (
    <>
      <header className="tophead">
        <nav>
          <div className="topnav" id="myTopnav">
            {/* {isLoggedIn() && <p>{user.fullName}</p>} */}
            <Link to="/" className="active">
              Home
            </Link>
            <Link to="/locations">Locations</Link>
            {isLoggedIn() && <Link to="/new">Add a Location</Link>}
            {isLoggedIn() || <Link to="/signup">Sign Up</Link>}
            {isLoggedIn() || (
              <Link className="signOut" to="/signin">
                Sign In
              </Link>
            )}
            {isLoggedIn() && <Link to="/profile">Profile</Link>}
            {isLoggedIn() && (
              <Link className="signOut" to="/" onClick={handleLogout}>
                Sign Out
              </Link>
            )}

            {/* {isLoggedIn() && user.photoURL && (
              <li className="avatar">
                <img
                  src={user.photoURL}
                  alt={`${user.fullName}'s Avatar`}
                  height="64"
                  width="64"
                />
              </li>
            )} */}
          </div>
        </nav>
        <div className="title">
          <h1>On Location</h1>
        </div>
      </header>

      <main className="background">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/locations">
            <Locations />
          </Route>
          <Route exact path="/new">
            <NewLocation />
          </Route>
          <Route exact path="/locations/:id">
            <LocationDetail />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/films/:id">
            <MovieDetail />
          </Route>
          <Route exact path="/profile">
            <EditUser />
          </Route>
          <Route exact path="/locations/:id/edit">
            <EditLocation />
          </Route>
        </Switch>
      </main>

      <footer>
        <p>home</p>
        <p>contact us</p>
        <p>about</p>
        <p>Designed by</p>
      </footer>
    </>
  )
}
