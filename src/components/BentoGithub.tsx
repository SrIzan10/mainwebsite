import { useEffect, useRef, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { Skeleton } from './ui/skeleton'

interface GithubEvent {
  id: string
  type: string
  repo: {
    name: string
  }
  payload?: {
    action?: string
    ref_type?: string
    head?: string
    before?: string
    commits?: Array<{ sha?: string; message: string }>
    pull_request?: {
      title?: string
      html_url?: string
    }
    issue?: {
      title?: string
      html_url?: string
    }
  }
}

const EVENT_PRIORITY: Record<string, number> = {
  PushEvent: 5,
  PullRequestEvent: 4,
  IssuesEvent: 3,
  IssueCommentEvent: 2,
  ReleaseEvent: 2,
  CreateEvent: 1,
}

interface ActivityView {
  id: string
  title: string
  detail: string
  meta?: string
  repo: string
  url: string
}

async function parseActivity(event: GithubEvent): Promise<ActivityView> {
  const repo = event.repo.name
  const repoUrl = `https://github.com/${repo}`

  if (event.type === 'PushEvent') {
    const headSha = event.payload?.head
    const shortSha = headSha?.slice(0, 7)
    let detail = `Updated ${repo}`

    if (headSha) {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${repo}/commits/${headSha}`,
          {
            headers: {
              Accept: 'application/vnd.github+json',
            },
          },
        )

        if (response.ok) {
          const commitData: { commit?: { message?: string } } =
            await response.json()
          const commitMessage = commitData.commit?.message?.split('\n')[0]
          if (commitMessage) {
            detail = commitMessage
          }
        }
      } catch (error) {
        console.error('Error fetching commit details:', error)
      }
    }

    return {
      id: event.id,
      title: 'Pushed commit',
      detail,
      meta: shortSha ? shortSha : undefined,
      repo,
      url: headSha ? `${repoUrl}/commit/${headSha}` : `${repoUrl}/commits`,
    }
  }

  if (event.type === 'PullRequestEvent') {
    return {
      id: event.id,
      title: `${event.payload?.action ?? 'Updated'} pull request`,
      detail: event.payload?.pull_request?.title ?? repo,
      meta: 'pull request',
      repo,
      url: event.payload?.pull_request?.html_url ?? repoUrl,
    }
  }

  if (event.type === 'IssuesEvent') {
    return {
      id: event.id,
      title: `${event.payload?.action ?? 'Updated'} issue`,
      detail: event.payload?.issue?.title ?? repo,
      meta: 'issue',
      repo,
      url: event.payload?.issue?.html_url ?? repoUrl,
    }
  }

  if (event.type === 'IssueCommentEvent') {
    return {
      id: event.id,
      title: `${event.payload?.action ?? 'Updated'} comment`,
      detail: event.payload?.issue?.title ?? repo,
      meta: 'comment',
      repo,
      url: event.payload?.issue?.html_url ?? repoUrl,
    }
  }

  if (event.type === 'CreateEvent') {
    return {
      id: event.id,
      title: 'Created new item',
      detail: `${event.payload?.ref_type ?? 'resource'} in ${repo}`,
      meta: event.payload?.ref_type,
      repo,
      url: repoUrl,
    }
  }

  if (event.type === 'ReleaseEvent') {
    return {
      id: event.id,
      title: 'Published release',
      detail: `New release in ${repo}`,
      meta: 'release',
      repo,
      url: repoUrl,
    }
  }

  return {
    id: event.id,
    title: event.type.replace('Event', ''),
    detail: `Activity in ${repo}`,
    meta: undefined,
    repo,
    url: repoUrl,
  }
}

export default function BentoGithub() {
  const CARD_PADDING_X = 32
  const LIST_PADDING_X = 16
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [activity, setActivity] = useState<ActivityView[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(1)

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/users/SrIzan10/events/public?per_page=20',
          {
            headers: {
              Accept: 'application/vnd.github+json',
            },
          },
        )
        const events: GithubEvent[] = await response.json()
        if (Array.isArray(events) && events.length > 0) {
          const prioritizedEvents = events
            .filter((event) => EVENT_PRIORITY[event.type])
            .slice(0, 6)

          const parsedActivity = await Promise.all(
            prioritizedEvents.map((event) => parseActivity(event)),
          )

          setActivity(parsedActivity)
        }
      } catch (error) {
        console.error('Error fetching GitHub activity:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivity()
  }, [])

  useEffect(() => {
    if (isLoading || activity.length === 0) return

    const element = cardRef.current
    if (!element) return

    const updateVisibleCount = () => {
      const { width } = element.getBoundingClientRect()
      const contentWidth = width - CARD_PADDING_X - LIST_PADDING_X

      if (contentWidth >= 470) {
        setVisibleCount(3)
        return
      }

      if (contentWidth >= 310) {
        setVisibleCount(2)
        return
      }

      setVisibleCount(1)
    }

    updateVisibleCount()

    const observer = new ResizeObserver(updateVisibleCount)
    observer.observe(element)

    return () => observer.disconnect()
  }, [isLoading, activity.length])

  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col justify-between overflow-hidden rounded-lg p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-4" />
        </div>
        <div className="space-y-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-full" />
          </div>
          <div className="hidden space-y-2 sm:block">
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-3 w-4/5" />
          </div>
          <div className="hidden space-y-2 lg:block">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
        <Skeleton className="h-3 w-2/3" />
      </div>
    )
  }

  if (activity.length === 0)
    return <p className="text-muted-foreground p-4 text-sm">Unavailable</p>

  const visibleActivity = activity.slice(0, visibleCount)

  return (
    <div
      ref={cardRef}
      className="flex h-full w-full flex-col justify-between overflow-hidden rounded-lg p-4"
    >
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          GitHub Activity
        </span>
        <FaGithub className="text-muted-foreground/50" size={16} />
      </div>

      <div className="space-y-2.5 p-2">
        {visibleActivity.map((item) => {
          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-accent/40 block min-w-0 rounded-md px-2 py-1.5 transition-colors duration-200"
            >
              <p className="truncate text-sm leading-snug font-semibold">
                {item.title}
              </p>
              <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
                {item.detail}
              </p>
              <p className="text-muted-foreground/60 mt-1 truncate text-[11px]">
                {item.meta ? `${item.meta} in ${item.repo}` : item.repo}
              </p>
            </a>
          )
        })}
      </div>

      <p className="text-muted-foreground/60 truncate text-xs">
        github.com/SrIzan10
      </p>
    </div>
  )
}
