'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils' // Assuming you have a cn utility for classnames
import { Home, Briefcase, Settings, LogOut } from 'lucide-react' // Added LogOut icon
import { Button } from '@/components/ui/button' // Added Button import

const navLinks = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: Home,
  },
  {
    href: '/manage-jobs',
    label: 'Ofertas de Trabajo',
    icon: Briefcase,
  },
  // Add more admin links here as needed
  {
    href: '/settings',
    label: 'Configuración',
    icon: Settings,
  },
]

export const Sidebar = () => {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // TODO: Implement actual logout logic (e.g., clearing session, API call)
    console.log('Logout action triggered, redirecting to / ')
    router.push('/') // Redirect to root
  }

  return (
    <aside className='bg-background flex h-full w-64 flex-col border-r p-4'>
      <div className='mb-8'>
        <Link href='/' className='flex items-center space-x-2'>
          {/* You can use an SVG logo or an Image component here */}
          <Briefcase className='text-primary h-8 w-8' />
          <span className='text-primary text-xl font-bold'>
            Bolsa de Empleo
          </span>
        </Link>
      </div>
      <nav className='flex flex-col space-y-2'>
        {navLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (pathname.startsWith(link.href) && link.href !== '/dashboard') // Handle sub-paths, but dashboard is exact

          return (
            <Link
              href={link.href}
              key={link.label}
              className={cn(
                'hover:bg-accent hover:text-accent-foreground flex items-center space-x-3 rounded-md p-2 text-sm font-medium',
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <link.icon className='h-5 w-5' />
              <span>{link.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className='border-border mt-auto space-y-2 border-t pt-4'>
        <Button
          variant='outline'
          className='text-muted-foreground hover:text-accent-foreground hover:bg-accent w-full justify-start'
          onClick={handleLogout}
          aria-label='Cerrar sesión'
        >
          <LogOut className='mr-3 h-5 w-5' />
          <span>Cerrar Sesión</span>
        </Button>
        <p className='text-muted-foreground pt-2 text-center text-xs'>
          &copy; {new Date().getFullYear()} UES
        </p>
      </div>
    </aside>
  )
}
