import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Orbitron, Rajdhani } from 'next/font/google'
import './globals.css'

const orbitron = Orbitron({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-orbitron',
})

const rajdhani = Rajdhani({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani',
})

export const metadata: Metadata = {
  title: 'DorkEngine - Google Dork Master',
  description: 'Professional Google Dorking Platform with 1000+ Pre-Built Dorks for Security Research & OSINT',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${rajdhani.variable}`}>{children}</body>
    </html>
  )
}
