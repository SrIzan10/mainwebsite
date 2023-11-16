import '../../_css/Root.css';
import React from 'react';
import { SiOsu } from 'react-icons/si';
import { FaDiscord, FaGithub, FaMastodon, FaTwitter, FaBlog } from 'react-icons/fa6';
import Link from "next/link";
import Button from '@mui/material/Button'

export default function Page() {
  return (
    <div>
      <div className='aboutMeBox'>
        {/* style={{ borderRadius: '70px' }} */}
        <Link href='/collab'><img src='/pfp.webp' alt='main profile picture' height='200px' /></Link>
        <p>I'm a hobbyist developer and osu! player based on Spain who loves to open-source and to work on teams.</p>
        <Button>e</Button>
        <p>Stalk me on social media:</p>
            <div className='icons'>
            <a href='https://github.com/SrIzan10'><FaGithub /></a>
            <Link href='/blog'><FaBlog /></Link>
            <a href='https://discord.com/users/703974042700611634'><FaDiscord /></a>
            <a href='https://social.srizan.dev'><FaMastodon /></a>
            <a href='https://twitter.com/itssrizan'><FaTwitter /></a>
            <a href='https://osu.ppy.sh/users/25350735'><SiOsu /></a>
        </div>
      </div>
    </div>
  )
}
