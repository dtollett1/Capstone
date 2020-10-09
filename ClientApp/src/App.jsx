import React from 'react'
import './custom.scss'
import logo from './images/onlocation.png'
import map from './images/map.png'

export function Home() {
  return (
    <>
      <header>
        <div className="title">
          <ul>
            <li>
              <img src={logo} />
            </li>
            <li></li>
          </ul>
        </div>

        <div className="social">
          <ul>
            <li>facebook</li>
            <li>twitter</li>
            <li>join</li>
            <li>sign in</li>
          </ul>
        </div>
      </header>
      <main>
        <h1>Welcome to On Location</h1>
        <input type="text" placeholder="Search..." />
        <section>
          <h2>New York</h2>
          <ul>
            <li>
              <img
                src="https://theposterdb.com/api/assets/23880"
                width="210"
                height="315"
              ></img>
            </li>
            <li>
              <img
                src="https://theposterdb.com/api/assets/36537"
                width="210"
                height="315"
              ></img>
            </li>
            <li>
              <img
                src="https://theposterdb.com/api/assets/35174"
                width="210"
                height="315"
              ></img>
            </li>
            <li>
              <img
                src="https://theposterdb.com/api/assets/5918"
                width="210"
                height="315"
              ></img>
            </li>
            <li>
              <img
                src="https://theposterdb.com/api/assets/35901"
                width="210"
                height="315"
              ></img>
            </li>
            <li>
              <img
                src="https://theposterdb.com/api/assets/560"
                width="210"
                height="315"
              ></img>
            </li>
          </ul>
        </section>
        <section>
          <h2>New Orleans</h2>
          <ul>
            <li>
              <img
                src="https://theposterdb.com/api/assets/88381"
                width="210"
                height="315"
              ></img>
            </li>
            <li>
              <img
                src="https://theposterdb.com/api/assets/8609"
                width="210"
                height="315"
              ></img>
            </li>
            <li>
              <img
                src="https://theposterdb.com/api/assets/77118"
                width="210"
                height="315"
              ></img>
            </li>
            <li>
              <img
                src="https://theposterdb.com/api/assets/64096"
                width="210"
                height="315"
              ></img>
            </li>
            <li>
              <img
                src="https://theposterdb.com/api/assets/2629"
                width="210"
                height="315"
              ></img>
            </li>
            <li>
              <img
                src="https://theposterdb.com/api/assets/41482"
                width="210"
                height="315"
              ></img>
            </li>
          </ul>
        </section>
        <section>
          <h2> Martin Scorsese</h2>
          <ul>
            <li>
              <img
                src="https://theposterdb.com/api/assets/54268"
                width="210"
                height="315"
              ></img>
            </li>
            <li>
              <img
                src="https://theposterdb.com/api/assets/54275"
                width="210"
                height="315"
              ></img>
            </li>
            <li>
              <img
                src="https://theposterdb.com/api/assets/47512"
                width="210"
                height="315"
              ></img>
            </li>
            <li>
              <img
                src="https://theposterdb.com/api/assets/9316"
                width="210"
                height="315"
              ></img>
            </li>
            <li>
              <img
                src="https://theposterdb.com/api/assets/81198"
                width="210"
                height="315"
              ></img>
            </li>
            <li>
              <img
                src="https://theposterdb.com/api/assets/50890"
                width="210"
                height="315"
              ></img>
            </li>
          </ul>
        </section>
        <section>
          <h2>David Fincher</h2>
          <ul>
            <li>
              <img
                src="https://theposterdb.com/api/assets/66490"
                width="210"
                height="315"
              ></img>
            </li>
            <li>
              <img
                src="https://theposterdb.com/api/assets/64096"
                width="210"
                height="315"
              ></img>
            </li>
            <li>
              <img
                src="https://theposterdb.com/api/assets/28666"
                width="210"
                height="315"
              ></img>
            </li>
            <li>
              <img
                src="https://theposterdb.com/api/assets/55575"
                width="210"
                height="315"
              ></img>
            </li>
            <li>
              <img
                src="https://theposterdb.com/api/assets/27354"
                width="210"
                height="315"
              ></img>
            </li>
            <li>
              <img
                src="https://theposterdb.com/api/assets/31579"
                width="210"
                height="315"
              ></img>
            </li>
          </ul>
        </section>
      </main>
      <footer>
        <p>about</p>
        <p>contact us</p>
        <p>home</p>
        <p>Designed by</p>
      </footer>
    </>
  )
}

export function SearchPage() {
  return (
    <>
      <header>
        <div className="title">
          <ul>
            <li>
              <img src={logo} />
            </li>
            <li></li>
          </ul>
        </div>

        <div className="social">
          <ul>
            <li>facebook</li>
            <li>twitter</li>
            <li>join</li>
            <li>sign in</li>
          </ul>
        </div>
      </header>
      <main>
        <h1>
          <input type="text" placeholder="Search..." />
        </h1>
        <section>
          <img
            src="https://theposterdb.com/api/assets/2436"
            width="210"
            height="315"
          ></img>
          <h2>Jaws</h2>
          <p>
            When an insatiable great white shark terrorizes the townspeople of
            Amity Island, the police chief, an oceanographer and a grizzled
            shark hunter seek to destroy the blood-thirsty beast.
          </p>
        </section>
        <section>
          <img
            src="https://theposterdb.com/api/assets/34112"
            width="210"
            height="315"
          ></img>
          <h2>Interview with the Vampire</h2>
          <p>
            A vampire relates his epic life story of love, betrayal, loneliness,
            and dark hunger to an over-curious reporter.
          </p>
        </section>
        <section>
          <img
            src="https://theposterdb.com/api/assets/7545"
            width="210"
            height="315"
          ></img>
          <h2>Ghostbusters</h2>
          <p>
            After losing their academic posts at a prestigious university, a
            team of parapsychologists goes into business as proton-pack-toting
            "ghostbusters" who exterminate ghouls, hobgoblins and supernatural
            pests of all stripes. An ad campaign pays off when a knockout
            cellist hires the squad to purge her swanky digs of demons that
            appear to be living in her refrigerator.
          </p>
        </section>
        <section>
          <img
            src="https://theposterdb.com/api/assets/30668"
            width="210"
            height="315"
          ></img>
          <h2>The Shining</h2>
          <p>
            Jack Torrance accepts a caretaker job at the Overlook Hotel, where
            he, along with his wife Wendy and their son Danny, must live
            isolated from the rest of the world for the winter. But they aren't
            prepared for the madness that lurks within.
          </p>
        </section>
      </main>
      <footer>
        <p>about</p>
        <p>contact us</p>
        <p>home</p>
        <p>Designed by</p>
      </footer>
    </>
  )
}
export function MovieLanding() {
  return (
    <>
      <header>
        <div className="title">
          <ul>
            <li>
              <img src={logo} />
            </li>
            <li></li>
          </ul>
        </div>

        <div className="social">
          <ul>
            <li>facebook</li>
            <li>twitter</li>
            <li>join</li>
            <li>sign in</li>
          </ul>
        </div>
      </header>
      <main>
        <div>
          <h1>Locations</h1>
          <section>
            <h2></h2>
            <img src={map} height="200" width="200" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
              reprehenderit atque maxime tempore corporis magni! Ad eos, ea
              maxime provident, nemo veritatis eum tempora assumenda obcaecati
              necessitatibus aspernatur non. Laboriosam.
            </p>
          </section>
          <section>
            <h2></h2>
            <img src={map} height="200" width="200" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
              reprehenderit atque maxime tempore corporis magni! Ad eos, ea
              maxime provident, nemo veritatis eum tempora assumenda obcaecati
              necessitatibus aspernatur non. Laboriosam.
            </p>
          </section>
          <section>
            <h2></h2>
            <img src={map} height="200" width="200" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
              reprehenderit atque maxime tempore corporis magni! Ad eos, ea
              maxime provident, nemo veritatis eum tempora assumenda obcaecati
              necessitatibus aspernatur non. Laboriosam.
            </p>
          </section>
        </div>
        <div>
          <h1>Reviews</h1>
          <section>
            <h2></h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est
              repudiandae, quos dignissimos omnis minima velit consequatur
              facilis, aut magnam fugit eos ad saepe dolorem facere. Itaque
              debitis maiores obcaecati eos?
            </p>
          </section>
          <section>
            <h2></h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est
              repudiandae, quos dignissimos omnis minima velit consequatur
              facilis, aut magnam fugit eos ad saepe dolorem facere. Itaque
              debitis maiores obcaecati eos?
            </p>
          </section>{' '}
          <section>
            <h2></h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est
              repudiandae, quos dignissimos omnis minima velit consequatur
              facilis, aut magnam fugit eos ad saepe dolorem facere. Itaque
              debitis maiores obcaecati eos?
            </p>
          </section>
        </div>
      </main>
      <footer>
        <p>about</p>
        <p>contact us</p>
        <p>home</p>
        <p>Designed by</p>
      </footer>
    </>
  )
}

export function App() {
  return (
    <>
      <Home />
    </>
  )
}
