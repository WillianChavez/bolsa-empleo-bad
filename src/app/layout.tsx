import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { Toaster } from 'sonner'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Bolsa de Empleo - UES',
  description:
    'Plataforma de bolsa de trabajo de la Universidad de El Salvador',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es' className='h-full'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col font-sans antialiased`}
      >
        <Navbar />
        <main className='container mx-auto flex-grow px-4 py-8 sm:px-6 lg:px-8'>
          {children}
        </main>
        <Toaster richColors closeButton position='top-right' />
      </body>
    </html>
  )
}
