import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import './custom.scss'
import { Home } from './pages/Home'
import { Locations } from './pages/Locations'
import { NewLocation } from './pages/NewLocation'
import { LocationDetail } from './pages/LocationDetail'

export function App() {
  return (
    <>
      {/* <header>
        <div className="title"></div>

        <div className="social">
          <ul>
            <li>facebook</li>
            <li>twitter</li>
            <li>join</li>
            <li>sign in</li>
          </ul>
        </div>
      </header> */}
      <div className="topnav" id="myTopnav">
        <Link to="#home" className="active">
          Home
        </Link>
        <Link to="/locations">Locations</Link>
        <Link to="/new">Add a Location</Link>
        <Link to="#contact">Movies</Link>
        <Link to="#about">Sign In</Link>

        <Link to="javascript:void(0);" className="icon" onclick="myFunction()">
          <i className="fa fa-bars"></i>
        </Link>
      </div>

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
