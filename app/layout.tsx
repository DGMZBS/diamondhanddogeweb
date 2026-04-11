import type { Metadata } from 'next'
import { Rajdhani, Inter } from 'next/font/google'
import '../styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-orbitron',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Diamond Hand Doge (DHD) | The Solana Meme Coin for Diamond Hands',
  description:
    'Diamond Hand Doge (DHD) is the Solana meme coin that rewards true holders. Hold strong, earn big. Buy DHD on Raydium today.',
  keywords: ['DHD', 'Diamond Hand Doge', 'Solana meme coin', 'DHD coin', 'buy DHD', 'crypto'],
  openGraph: {
    title: 'Diamond Hand Doge (DHD)',
    description: 'The Solana meme coin for those with diamond hands.',
    url: 'https://www.diamondhanddoge.com',
    siteName: 'Diamond Hand Doge',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${rajdhani.variable} ${inter.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
