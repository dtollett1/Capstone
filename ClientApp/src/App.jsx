import React from 'react'
import { Switch, Route } from 'react-router-dom'

import './custom.scss'
import { Home } from './pages/Home'
import { Locations } from './pages/Locations'
import { NewLocation } from './pages/NewLocation'
import { LocationDetail } from './pages/LocationDetail'

export function App() {
  return (
    <>
      <header>
        <div className="title"></div>

        <div className="social">
          <ul>
            <li>facebook</li>
            <li>twitter</li>
            <li>join</li>
            <li>sign in</li>
          </ul>
        </div>
      </header>
      <Switch>
        <Route exact path="/">
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
