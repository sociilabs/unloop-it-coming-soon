import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Unloop IT',
  description: 'Your trusted partner in navigating the complexities of AI, automation, and modern IT strategy.',
  generator: 'Unloop IT',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
