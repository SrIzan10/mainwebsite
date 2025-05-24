// code based on https://github.com/jktrn/enscribe.dev/blob/main/src/components/bento/SpotifyPresence.tsx
// which is under copyright.

import { useEffect, useState } from "react"
import { Skeleton } from "./ui/skeleton"
import { FaSpotify } from 'react-icons/fa'
import { MoveUpRight } from "lucide-react"

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
      <div className="relative h-full w-full overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[radial-gradient(circle_at_20%_80%,_theme(colors.green.500)_0%,_transparent_50%)]"></div>
        </div>
        
        {/* Spotify Logo */}
        <div className="absolute right-3 top-3 z-10">
          <FaSpotify size={24} className="text-primary" />
        </div>

        <div className="relative z-10 flex h-full flex-col p-4">
          {/* Header Skeleton */}
          <div className="mb-4 flex items-center gap-2">
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-3 w-20" />
          </div>

          {/* Album Art & Info Skeleton */}
          <div className="flex flex-1 gap-3">
            <Skeleton className="h-16 w-16 rounded-lg flex-shrink-0" />
            
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>

          {/* Footer Skeleton */}
          <div className="mt-4 flex items-center justify-between">
            <Skeleton className="h-1 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!displayData) return <p>Something absolutely horrible has gone wrong</p>

  const { name: song, artist, album, image, url } = displayData

  return (
  <div className="relative h-full w-full overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-5">
      <div className="h-full w-full bg-[radial-gradient(circle_at_20%_80%,_theme(colors.primary)_0%,_transparent_50%)]"></div>
    </div>
    
    {/* Spotify Logo */}
    <div className="absolute right-3 top-3 z-10">
      <FaSpotify size={24} className="text-primary" />
    </div>

    <div className="relative z-10 flex h-full flex-col p-4">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></div>
        <span className="text-xs font-medium text-muted-foreground">
          {displayData['@attr']?.nowplaying === 'true'
            ? 'NOW PLAYING'
            : 'LAST PLAYED'}
        </span>
      </div>

      {/* Album Art & Info */}
      <div className="flex flex-1 gap-3">
        <div className="relative flex-shrink-0">
          <img
            src={image[3]['#text']}
            alt="Album art"
            width={64}
            height={64}
            className="h-16 w-16 rounded-lg border shadow-lg"
          />
          {displayData['@attr']?.nowplaying === 'true' && (
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-primary border-2 border-background"></div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <h3 className="mb-1 truncate text-sm font-bold leading-tight">
            {song}
          </h3>
          <p className="truncate text-xs text-muted-foreground">
            {artist['#text']}
          </p>
          <p className="truncate text-xs text-muted-foreground/70">
            {album['#text']}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="h-1 w-8 rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary"></div>
          </div>
        </div>
        
        <a
          href={url}
          aria-label="View on last.fm"
          title="View on last.fm"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/80 text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground hover:scale-110"
        >
          <MoveUpRight size={14} />
        </a>
      </div>
    </div>
  </div>
)
}
