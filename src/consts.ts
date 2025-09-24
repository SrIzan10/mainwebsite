import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'srizan\'s corner',
  description:
    'Ethan\'s personal website, where I share my thoughts on programming, language learning and life.',
  href: 'https://srizan.dev',
  author: 'SrIzan10',
  locale: 'en-US',
  featuredPostCount: 2,
  postsPerPage: 3,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/about',
    label: 'about',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/SrIzan10',
    label: 'GitHub',
  },
  {
    href: 'mailto:izan@srizan.dev',
    label: 'Email',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  RSS: 'lucide:rss',
}
