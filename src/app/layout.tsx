import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { RootStyleRegistry } from './_components/ThemeRegistry/EmotionRootStyleRegistry';
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sr Izan\'s corner of the net',
  icons: { icon: '/pfp.webp' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <SpeedInsights />
      <head>
        <script async src="https://analytics.srizan.dev/ua.js" data-website-id="54ccb44c-b03c-4790-8262-3e1a82241a24" />
      </head>
      <body className={inter.className}>
        <RootStyleRegistry>
          {children}
        </RootStyleRegistry>
      </body>
    </html>
  )
}
