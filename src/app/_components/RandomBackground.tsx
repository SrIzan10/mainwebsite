"use client"
import Backgrounds from '../../backgrounds.json'
import ImageAuthor from '@/app/_components/ImageAuthor';
import '../_css/RandomBackground.css'

export default function RandomBackground() {
  const randomBg = Backgrounds[Math.floor(Math.random() * Backgrounds.length)];
  return (
    <div>
      <div className='bgImage' style={{ backgroundImage: `url("${randomBg.url}")` }} />
      <ImageAuthor {...randomBg} />
    </div>
  )
}