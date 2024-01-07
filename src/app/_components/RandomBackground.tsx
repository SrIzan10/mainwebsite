'use client';

import Backgrounds from '../../backgrounds.json'
import ImageAuthor from '@/app/_components/ImageAuthor';
import '../_css/RandomBackground.css'
import Image from 'next/image'
import React from 'react';

export default function RandomBackground() {
  const [randomBg, setRandomBg] = React.useState<typeof Backgrounds[0]>()
  React.useEffect(() => {
    const random = Math.floor(Math.random() * Backgrounds.length)
    setRandomBg(Backgrounds[random])
  }, [])
  return randomBg ? (
    <div>
      <Image className='bgImage' loader={() => randomBg.url} src={randomBg.url} fill={true} alt={randomBg.description} />
      <ImageAuthor {...randomBg} />
    </div>
  ) : null
}