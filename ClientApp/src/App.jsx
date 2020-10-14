import React, { useReducer } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import './styles/custom.scss'
import { Home } from './pages/Home'
import { Locations } from './pages/Locations'
import { NewLocation } from './pages/NewLocation'
import { LocationDetail } from './pages/LocationDetail'
import { SignIn } from './pages/SignIn'
import { Movies } from './pages/Movies'
import { SignUp } from './pages/SignUp'
import { isLoggedIn, logout, getUser } from './auth'
function handleLogout() {
  logout()
}
const user = getUser()
export function App() {
  return (
    <>
      <header>
        <div className="topnav" id="myTopnav">
          {isLoggedIn() && <p>{user.fullName}</p>}
          <Link to="#home" className="active">
            Home
          </Link>
          <Link to="/locations">Locations</Link>
          {isLoggedIn() && <Link to="/new">Add a Location</Link>}
          <Link to="/movies">Movies</Link>
          {isLoggedIn() || <Link to="/signup">Sign Up</Link>}
          {isLoggedIn() || <Link to="/signin">Sign In</Link>}
          {isLoggedIn() && (
            <span className="link" onClick={handleLogout}>
              Sign Out
            </span>
          )}

          <Link
            to="javascript:void(0);"
            className="icon"
            onclick="myFunction()"
          >
            <i className="fa fa-bars"></i>
          </Link>
        </div>
      </header>

      <Switch>
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
        <Route exact path="/movies">
          <Movies />
        </Route>
      </Switch>

      <footer>
        <p>home</p>
        <p>contact us</p>
        <p>about</p>
        <p>Designed by</p>
      </footer>
    </>
  )
}
