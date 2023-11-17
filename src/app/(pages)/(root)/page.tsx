import '../../_css/Root.css';
import React from 'react';
import { SiOsu } from 'react-icons/si';
import { FaDiscord, FaGithub, FaMastodon, FaTwitter, FaBlog } from 'react-icons/fa6';
import Link from "next/link";
import Image from 'next/image';

export default function Page() {
  return (
    <div>
      <div className='aboutMeBox'>
        {/* style={{ borderRadius: '70px' }} */}
        <Link href='/collab'><Image src='/pfp.webp' alt='main profile picture' width='200' height='200' /></Link>
        <p>A spanish hobbyist developer and osu! player</p>
        <p>Stalk me on social media:</p>
          <div className='icons'>
            <Link href='https://github.com/SrIzan10'><FaGithub /></Link>
            <Link href='/blog'><FaBlog /></Link>
            <Link href='https://discord.com/users/703974042700611634'><FaDiscord /></Link>
            <Link href='https://social.srizan.dev'><FaMastodon /></Link>
            <Link href='https://twitter.com/itssrizan'><FaTwitter /></Link>
            <Link href='https://osu.ppy.sh/users/25350735'><SiOsu /></Link>
        </div>
      </div>
    </div>
  )
}
