'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Toaster } from 'sonner'

interface PublicLayoutProps {
  children: React.ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const pathname = usePathname()

  const showNavbar = ![
    '/login',
    '/register/applicant',
    '/register/company',
  ].includes(pathname)

  return (
    <>
      {showNavbar && <Navbar />}
      <main className='container mx-auto flex-grow px-4 py-8 sm:px-6 lg:px-8'>
        {children}
      </main>
      {/* Toaster can remain here or be in the root layout if preferred for all routes */}
      {/* For now, keeping it here for public routes that might use it extensively */}
      {!showNavbar && <Toaster richColors closeButton position='top-right' />}
    </>
  )
}
