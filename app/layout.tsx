import type { Metadata } from 'next'
import { GameProvider } from '@/context/GameContext'
import '@/app/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'DumRoll',
  description: 'Experience the Game on Ludo with our favoi=urite DumDums',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-gradient-to-b from-blue-100 to-purple-200'>
        <Header />
        <GameProvider>
          {children}
        </GameProvider>
        <Footer />
      </body>
    </html>
  )
}