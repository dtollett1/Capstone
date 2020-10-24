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
import { MovieDetail } from './pages/MovieDetail'
import { isLoggedIn, logout, getUser } from './auth'

function handleLogout() {
  logout()
}
const user = getUser()

export function App() {
  return (
    <>
      <header>
        <nav>
          <div className="topnav" id="myTopnav">
            {isLoggedIn() && <p>{user.fullName}</p>}
            <Link to="/home" className="active">
              Home
            </Link>
            <Link to="/locations">Locations</Link>
            {isLoggedIn() && <Link to="/new">Add a Location</Link>}
            <Link to="/movies">Movies</Link>
            {isLoggedIn() || <Link to="/signup">Sign Up</Link>}
            {isLoggedIn() || <Link to="/signin">Sign In</Link>}
            {isLoggedIn() && (
              <Link to="/" onClick={handleLogout}>
                Sign Out
              </Link>
            )}

            <Link
              to="javascript:void(0);"
              className="icon"
              // onclick="myFunction()"
            >
              <i className="fa fa-bars"></i>
            </Link>
          </div>
        </nav>
        <h1 className="title"></h1>
      </header>

      <main className="background">
        <Switch>
          <Route exact path="/home">
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
