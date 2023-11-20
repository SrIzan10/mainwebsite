import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { RootStyleRegistry } from './_components/ThemeRegistry/EmotionRootStyleRegistry';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sr Izan\'s corner for the net',
  icons: { icon: '/pfp.webp' }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootStyleRegistry>
          {children}
        </RootStyleRegistry>
      </body>
    </html>
  )
}
