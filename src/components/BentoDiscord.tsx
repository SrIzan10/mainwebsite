import { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'

interface DiscordUser {
  id: string
  username: string
  discriminator: string
  avatar: string
  global_name: string | null
}

interface DiscordActivity {
  id: string
  name: string
  type: number
  state?: string
  details?: string
  timestamps?: {
    start?: number
    end?: number
  }
  assets?: {
    large_image?: string
    large_text?: string
    small_image?: string
    small_text?: string
  }
  application_id?: string
}

interface LanyardData {
  discord_user: DiscordUser
  discord_status: 'online' | 'idle' | 'dnd' | 'offline'
  activities: DiscordActivity[]
  listening_to_spotify: boolean
  spotify?: {
    track_id: string
    timestamps: {
      start: number
      end: number
    }
    song: string
    artist: string
    album_art_url: string
    album: string
  }
}

interface LanyardResponse {
  success: boolean
  data: LanyardData
}

export default function BentoDiscord() {
  const [discordData, setDiscordData] = useState<LanyardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDiscordData = async () => {
      try {
        const response = await fetch(
          `https://api.lanyard.rest/v1/users/703974042700611634`,
        )
        const data: LanyardResponse = await response.json()
        if (data.success) {
          setDiscordData(data.data)
        }
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching Discord data:', error)
        setIsLoading(false)
      }
    }

    fetchDiscordData()
    const interval = setInterval(fetchDiscordData, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-400'
      case 'idle':
        return 'bg-yellow-400'
      case 'dnd':
        return 'bg-red-400'
      default:
        return 'bg-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online':
        return 'Online'
      case 'idle':
        return 'Away'
      case 'dnd':
        return 'Do Not Disturb'
      default:
        return 'Offline'
    }
  }

  const getAvatarUrl = (user: DiscordUser) => {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`
  }

  const getMainActivity = (activities: DiscordActivity[]) => {
    return (
      activities.find(
        (activity) => activity.type !== 4 && activity.name !== 'Spotify',
      ) || null
    )
  }

  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col justify-between rounded-lg p-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-2 w-2 rounded-full" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 flex-shrink-0 rounded-full" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <Skeleton className="h-3 w-24" />
      </div>
    )
  }

  if (!discordData)
    return <p className="text-muted-foreground p-4 text-sm">Unavailable</p>

  const mainActivity = getMainActivity(discordData.activities)
  const displayName =
    discordData.discord_user.global_name || discordData.discord_user.username

  return (
    <a
      href={`https://discord.com/users/${discordData.discord_user.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group hover:bg-accent/40 flex h-full w-full flex-col justify-between rounded-lg p-4 transition-colors duration-200"
    >
      <div className="flex items-center gap-1.5">
        <span
          className={`h-2 w-2 flex-shrink-0 rounded-full ${getStatusColor(discordData.discord_status)}`}
        />
        <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          {getStatusText(discordData.discord_status)}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <img
          src={getAvatarUrl(discordData.discord_user)}
          alt="Discord avatar"
          width={48}
          height={48}
          className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
        />
        <div className="flex min-w-0 flex-col">
          <p className="truncate text-sm leading-snug font-semibold">
            {displayName}
          </p>
          <p className="text-muted-foreground truncate text-xs">
            @{discordData.discord_user.username}
          </p>
        </div>
      </div>

      <p className="text-muted-foreground/60 truncate text-xs">
        {mainActivity ? mainActivity.name : 'No activity'}
      </p>
    </a>
  )
}
