import './App.css'
import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

function App() {
  // OsuBeat :weary:
  const [osuBeat, setOsuBeat] = React.useState(false)
  return (
    <div>
      <div className='aboutMeBox'>
        <img src='https://github.com/SrIzan10.png' height='200px' />
        <p>I'm a hobbyist developer and <a href='https://osu.ppy.sh/users/SrIzan10'>osu! player</a> based on Spain who loves to open-source and to work on teams.</p>
        <p>Stalk me on social media:</p>
        <div className='icons'>
          <FontAwesomeIcon icon={faGithub} onDragOver={() => setOsuBeat(true)} beatFade={osuBeat} />
          <FontAwesomeIcon icon={faGithub} />
        </div>
      </div>
    </div>
  )
}

export default App
