import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { MoveUpRight } from "lucide-react";

interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  global_name: string | null;
}

interface DiscordActivity {
  id: string;
  name: string;
  type: number;
  state?: string;
  details?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  application_id?: string;
}

interface LanyardData {
  discord_user: DiscordUser;
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: DiscordActivity[];
  listening_to_spotify: boolean;
  spotify?: {
    track_id: string;
    timestamps: {
      start: number;
      end: number;
    };
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
  };
}

interface LanyardResponse {
  success: boolean;
  data: LanyardData;
}

export default function BentoDiscord() {
  const [discordData, setDiscordData] = useState<LanyardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const fetchDiscordData = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/703974042700611634`);
        const data: LanyardResponse = await response.json();
        
        if (data.success) {
          setDiscordData(data.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Discord data:', error);
        setIsLoading(false);
      }
    };

    fetchDiscordData();
    
    // Update every 30 seconds
    const interval = setInterval(fetchDiscordData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "idle": return "bg-yellow-500";
      case "dnd": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "online": return "Online";
      case "idle": return "Away";
      case "dnd": return "Do Not Disturb";
      default: return "Offline";
    }
  };

  const getAvatarUrl = (user: DiscordUser) => {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`;
  };

  const getMainActivity = (activities: DiscordActivity[]) => {
    return activities.find(activity => activity.type !== 4 && activity.name !== "Spotify") || activities[0];
  };

  if (isLoading) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[radial-gradient(circle_at_20%_80%,_theme(colors.primary)_0%,_transparent_50%)]"></div>
        </div>
        
        {/* Discord Logo */}
        <div className="absolute right-3 top-3 z-10">
          <svg width="24" height="24" viewBox="0 0 24 24" className="text-primary">
            <path fill="currentColor" d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
        </div>

        <div className="relative z-10 flex h-full flex-col p-4">
          {/* Header Skeleton */}
          <div className="mb-4 flex items-center gap-2">
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-3 w-20" />
          </div>

          {/* Profile Skeleton */}
          <div className="flex flex-1 gap-3 items-center">
            <div className="relative flex-shrink-0">
              <Skeleton className="h-16 w-16 rounded-full" />
              <Skeleton className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full" />
            </div>
            
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
    );
  }

  if (!discordData) return <p>Something absolutely horrible has gone wrong</p>;

  const mainActivity = getMainActivity(discordData.activities);
  const displayName = discordData.discord_user.global_name || discordData.discord_user.username;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-primary/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[radial-gradient(circle_at_20%_80%,_theme(colors.primary)_0%,_transparent_50%)]"></div>
      </div>
      
      {/* Discord Logo */}
      <div className="absolute right-3 top-3 z-10">
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-primary">
          <path fill="currentColor" d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      </div>

      <div className="relative z-10 flex h-full flex-col p-4">
        {/* Header */}
        <div className="mb-4 flex items-center gap-2">
          <div className={`flex h-2 w-2 rounded-full ${getStatusColor(discordData.discord_status)} animate-pulse`}></div>
          <span className="text-xs font-medium text-muted-foreground">
            {getStatusText(discordData.discord_status).toUpperCase()}
          </span>
        </div>

        {/* Profile Info */}
        <div className="flex flex-1 gap-3 items-center">
          <div className="relative flex-shrink-0">
            <img
              src={getAvatarUrl(discordData.discord_user)}
              alt="Discord avatar"
              width={64}
              height={64}
              className="h-16 w-16 rounded-full border shadow-lg"
            />
            <div className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full ${getStatusColor(discordData.discord_status)} border-2 border-background`}></div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <h3 className="mb-1 truncate text-sm font-bold leading-tight">
              {displayName}
            </h3>
            {mainActivity ? (
              <>
                <p className="truncate text-xs text-muted-foreground">
                  {mainActivity.name}
                </p>
                {mainActivity.details && (
                  <p className="truncate text-xs text-muted-foreground/70">
                    {mainActivity.details}
                  </p>
                )}
              </>
            ) : (
              <p className="truncate text-xs text-muted-foreground">
                @{discordData.discord_user.username}
              </p>
            )}
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
            href={`https://discord.com/users/${discordData.discord_user.id}`}
            aria-label="View Discord profile"
            title="View Discord profile"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/80 text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground hover:scale-110"
          >
            <MoveUpRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}