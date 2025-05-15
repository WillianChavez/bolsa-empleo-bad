'use client'

import { Button } from '@/components/ui/button'
// import { PlusCircle } from "lucide-react"; // Temporarily commented out
import React from 'react'
import { useRouter } from 'next/navigation'
import { fetchJobOffers } from '@/lib/mock-data'
import type { JobOfferViewModel } from '@/types'
import { JobOffersDataTable } from './_components/job-offers-data-table'
import { Skeleton } from '@/components/ui/skeleton' // For loading state

export default function ManageJobOffersPage() {
  const router = useRouter()
  const [jobOffers, setJobOffers] = React.useState<JobOfferViewModel[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const loadJobs = async () => {
      try {
        setIsLoading(true)
        // Simulate a small delay for loading
        await new Promise((resolve) => setTimeout(resolve, 500))
        const offers = await fetchJobOffers()
        setJobOffers(offers)
        setError(null)
      } catch (err) {
        setError(
          'Error al cargar las ofertas de trabajo. Intenta de nuevo más tarde.'
        )
        console.error(err)
        setJobOffers([]) // Clear offers on error
      } finally {
        setIsLoading(false)
      }
    }
    loadJobs()
  }, [])

  const handleNavigateToNewOffer = () => {
    router.push('/manage-jobs/new')
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
        <div>
          <h1 className='text-2xl font-semibold tracking-tight md:text-3xl'>
            Gestionar Ofertas de Trabajo
          </h1>
          <p className='text-muted-foreground text-sm'>
            Aquí puedes ver, crear, editar y eliminar ofertas de trabajo.
          </p>
        </div>
        <Button onClick={handleNavigateToNewOffer}>
          {/* <PlusCircle className="mr-2 h-4 w-4" /> */}
          {/* Temporarily commented out */}
          Crear Nueva Oferta
        </Button>
      </div>

      {isLoading && (
        <div className='rounded-md border'>
          {/* Skeleton loader for table */}
          <div className='space-y-2 p-4'>
            <Skeleton className='h-8 w-full' />
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className='h-10 w-full' />
            ))}
          </div>
        </div>
      )}
      {error && (
        <div className='bg-destructive/10 text-destructive rounded-md border p-4 text-center'>
          <p>{error}</p>
        </div>
      )}
      {!isLoading && !error && <JobOffersDataTable data={jobOffers} />}
    </div>
  )
}
