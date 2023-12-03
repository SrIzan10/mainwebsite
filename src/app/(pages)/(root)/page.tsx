import '../../_css/Root.css';
import React from 'react';
import { SiOsu } from 'react-icons/si';
import { FaDiscord, FaGithub, FaMastodon, FaTwitter, FaBlog } from 'react-icons/fa6';
import Link from "next/link";
import Image from 'next/image';
import Backgrounds from '../../../backgrounds.json'
import ImageAuthor from '@/app/_components/ImageAuthor';

export default function Page() {
  const randomBg = Backgrounds[Math.floor(Math.random() * Backgrounds.length)];
  return (
    <div>
      <div className='bgImage' style={{ backgroundImage: `url("${randomBg.url}")` }} />
      <div className='aboutMeBox'>
        <Image src='/pfp.webp' alt='main profile picture' width='200' height='200' style={{ borderRadius: '100px' }} />
        <p>A spanish hobbyist developer and osu! player</p>
        <p>Stalk me on social media:</p>
          <div className='icons'>
            <Link href='https://github.com/SrIzan10'><FaGithub /></Link>
            <Link href='/blog'><FaBlog /></Link>
            <Link href='https://discord.com/users/703974042700611634'><FaDiscord /></Link>
            <Link href='https://social.srizan.dev'><FaMastodon /></Link>
            <Link href='https://twitter.com/itssrizan'><FaTwitter /></Link>
            <Link href='https://osu.ppy.sh/users/25350735'><SiOsu style={{ strokeWidth: "0.8" }} /></Link>
        </div>
      </div>
      <ImageAuthor {...randomBg} />
    </div>
  )
}
