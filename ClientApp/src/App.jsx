import React from 'react'
import './custom.scss'
import { Home } from './pages/Home'
import { MovieLanding } from './pages/MovieLanding'
import { NewLocation } from './pages/NewLocation'

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
      <MovieLanding />
      <footer>
        <p>home</p>
        <p>contact us</p>
        <p>about</p>
        <p>Designed by</p>
      </footer>
    </>
  )
}
