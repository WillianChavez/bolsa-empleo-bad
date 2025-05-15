import React from 'react'
import { Sidebar } from '@/components/admin/sidebar'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className='bg-muted/40 flex h-screen'>
      <Sidebar />
      <main className='flex-1 p-4 sm:p-6 md:p-8 lg:p-10'>{children}</main>
    </div>
  )
}
