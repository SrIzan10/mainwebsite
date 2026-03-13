// code based on https://github.com/jktrn/enscribe.dev/blob/main/src/components/bento/SpotifyPresence.tsx
// which is under copyright.

import { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import { FaLastfm } from 'react-icons/fa'

interface Track {
  name: string
  artist: { '#text': string }
  album: { '#text': string }
  image: { '#text': string }[]
  url: string
  '@attr'?: { nowplaying: string }
}

export default function BentoSpotify() {
  const [displayData, setDisplayData] = useState<Track | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://lastfm-last-played.biancarosa.com.br/SrIzan10/latest-song')
      .then((response) => response.json())
      .then((data) => {
        setDisplayData(data.track)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching latest song:', error)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col justify-between rounded-lg p-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 flex-shrink-0 rounded-md" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <Skeleton className="h-3 w-20" />
      </div>
    )
  }

  if (!displayData)
    return <p className="text-muted-foreground p-4 text-sm">Unavailable</p>

  const { name: song, artist, album, image, url } = displayData
  const isNowPlaying = displayData['@attr']?.nowplaying === 'true'

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group hover:bg-accent/40 flex h-full w-full flex-col justify-between rounded-lg p-4 transition-colors duration-200"
    >
      {/* Label */}
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          {isNowPlaying ? 'Now Playing' : 'Last Played'}
        </span>
        <FaLastfm
          className="text-muted-foreground/50 group-hover:text-muted-foreground transition-colors"
          size={16}
        />
      </div>

      {/* Track info */}
      <div className="flex items-center gap-3">
        <img
          src={image[3]['#text']}
          alt="Album art"
          width={48}
          height={48}
          className="h-12 w-12 flex-shrink-0 rounded-md object-cover"
        />
        <div className="flex min-w-0 flex-col">
          <p className="truncate text-sm leading-snug font-semibold">{song}</p>
          <p className="text-muted-foreground truncate text-xs">
            {artist['#text']}
          </p>
        </div>
      </div>

      {/* Album */}
      <p className="text-muted-foreground/60 truncate text-xs">
        {album['#text']}
      </p>
    </a>
  )
}
