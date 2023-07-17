import './App.css'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faGithub, faMastodon, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faBlog, faCircle } from '@fortawesome/free-solid-svg-icons'

function App() {
  // sorry peppy for naming the variable Osu instead of osu! you know camel case stuff please don't kill me or ban me but at lease give me a plushie or something the taikonator one is really nice actually but who can't pass the offer of getting pippi lol she's so fucking cute
  const [osuBeat, setOsuBeat] = React.useState(false)
  return (
    <div>
      <div className='aboutMeBox'>
        <img src='https://github.com/SrIzan10.png' height='200px' />
        <p>I'm a hobbyist developer and osu! player based on Spain who loves to open-source and to work on teams.</p>
        <p>Stalk me on social media:</p>
        <div className='icons'>
          <a href='https://github.com/SrIzan10'><FontAwesomeIcon icon={faGithub} /></a>
          <a href='https://social.srizan.dev'><FontAwesomeIcon icon={faMastodon} /></a>
          <a href='https://twitter.com/itssrizan'><FontAwesomeIcon icon={faTwitter} /></a>
          <a href='https://srizan.dev/blog'><FontAwesomeIcon icon={faBlog} /></a>
          <a href='https://discord.com/users/703974042700611634'><FontAwesomeIcon icon={faDiscord} /></a>
          <a href='https://osu.ppy.sh/users/25350735'><FontAwesomeIcon icon={faCircle} onMouseEnter={() => setOsuBeat(true)} onMouseLeave={() => setOsuBeat(false)} beatFade={osuBeat} /></a>
        </div>
      </div>
    </div>
  )
}

export default App
