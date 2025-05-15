import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
// Navbar and Toaster are removed from here

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

// const geistMono = Geist_Mono({ // Still commented out due to previous error
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// })

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
      {/* className still includes geistSans.variable, geistMono.variable is commented out */}
      <body
        className={`${geistSans.variable} flex min-h-screen flex-col font-sans antialiased`}
      >
        {/* Children will be the content from route group layouts */}
        {children}
      </body>
    </html>
  )
}
