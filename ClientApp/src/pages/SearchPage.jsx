import React from 'react'
import logo from '../images/onlocation.png'

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
