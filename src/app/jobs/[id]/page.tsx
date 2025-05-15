'use client' // Will likely need client-side hooks for fetching or router params

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { JobOfferViewModel } from '@/types' // Assuming full view model is okay for details
import { fetchJobOffers } from '@/lib/mock-data' // We'll use this to find the specific job

// Shadcn UI components for layout (can add more as needed)
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  ArrowLeft,
  Briefcase,
  Building,
  DollarSign,
  MapPin,
  CheckCircle,
  Info,
  Sparkles,
} from 'lucide-react'
import { toast } from 'sonner' // Import toast from sonner

export default function JobDetailPage() {
  const params = useParams()
  const jobId = params.id ? parseInt(params.id as string, 10) : null
  const [jobOffer, setJobOffer] = useState<
    JobOfferViewModel | null | undefined
  >(undefined) // undefined for loading, null for not found
  const [isLoading, setIsLoading] = useState(true)
  const [isApplied, setIsApplied] = useState(false) // State to track if applied

  useEffect(() => {
    if (jobId === null) {
      setJobOffer(null) // Invalid ID
      setIsLoading(false)
      return
    }

    const loadJobOfferDetails = async () => {
      setIsLoading(true)
      // In a real app, fetch a single job by ID: await fetch(`/api/jobs/${jobId}`)
      const allOffers = await fetchJobOffers() // Using mock data
      const foundOffer = allOffers.find((offer) => offer.id_puesto === jobId)
      setJobOffer(foundOffer || null) // Set to null if not found
      setIsLoading(false)
      setIsApplied(false) // Reset applied state when loading new offer
    }

    loadJobOfferDetails()
  }, [jobId])

  const handleApply = () => {
    // TODO: Implement actual application logic (e.g., API call)
    console.log('Applied to job:', jobOffer?.nombre_puesto)
    setIsApplied(true)
    toast.success(
      `¡Felicidades! Has aplicado exitosamente a ${jobOffer?.nombre_puesto}`,
      {
        description:
          'Recibirás una notificación si la empresa avanza con tu postulación. ¡Mucha suerte!',
        icon: <Sparkles className='h-5 w-5 text-yellow-400' />,
        duration: 5000, // Keep toast visible for 5 seconds
      }
    )
  }

  if (isLoading || jobOffer === undefined) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <Card>
          <CardHeader>
            <div className='h-8 w-3/4 animate-pulse rounded bg-gray-200'></div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='h-4 w-full animate-pulse rounded bg-gray-200'></div>
            <div className='h-4 w-5/6 animate-pulse rounded bg-gray-200'></div>
            <div className='h-4 w-3/4 animate-pulse rounded bg-gray-200'></div>
            <div className='mt-6 h-10 w-1/4 animate-pulse rounded bg-gray-200'></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!jobOffer) {
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <Info size={48} className='mx-auto mb-4 text-red-500' />
        <h1 className='mb-2 text-2xl font-semibold'>Oferta no encontrada</h1>
        <p className='mb-6 text-gray-600'>
          Lo sentimos, la oferta de trabajo que buscas no existe o ha sido
          eliminada.
        </p>
        <Button asChild>
          <Link href='/'>Volver a las ofertas</Link>
        </Button>
      </div>
    )
  }

  // Helper to split text into a list of items (e.g., for requirements, skills)
  const renderListItems = (text: string | null | undefined, title: string) => {
    if (!text) return null
    const items = text
      .split(/\n|\• |\- |\* /)
      .map((item) => item.trim())
      .filter((item) => item)
    if (items.length === 0) return null
    return (
      <div className='mb-4'>
        <h3 className='text-md mb-2 font-semibold text-gray-700'>{title}:</h3>
        <ul className='list-inside list-disc space-y-1 pl-1 text-gray-600'>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className='container mx-auto max-w-4xl px-4 py-8'>
      <Button variant='outline' asChild className='mb-6'>
        <Link href='/'>
          <ArrowLeft className='mr-2 h-4 w-4' /> Volver a las ofertas
        </Link>
      </Button>

      <Card className='overflow-hidden shadow-lg'>
        <CardHeader className='border-b bg-gray-50 p-6'>
          <div className='flex flex-col items-start justify-between sm:flex-row'>
            <div>
              <CardTitle className='mb-1 text-3xl font-bold text-blue-700'>
                {jobOffer.nombre_puesto}
              </CardTitle>
              <CardDescription className='flex items-center text-lg text-gray-600'>
                <Building className='mr-2 h-5 w-5 text-gray-500' />{' '}
                {jobOffer.empresa.nombre_empresa}
              </CardDescription>
            </div>
            {/* Placeholder for company logo */}
            {/* <img src="/placeholder-logo.svg" alt="Company Logo" className="w-20 h-20 rounded-md object-contain mt-4 sm:mt-0" /> */}
          </div>
          <div className='mt-4 flex flex-wrap gap-2'>
            <Badge variant='secondary' className='px-3 py-1 text-sm'>
              <MapPin className='mr-1.5 h-4 w-4' /> {jobOffer.ubicacion}
            </Badge>
            <Badge variant='secondary' className='px-3 py-1 text-sm'>
              <Briefcase className='mr-1.5 h-4 w-4' />{' '}
              {jobOffer.modalidad.nombre_modalidad}
            </Badge>
            {jobOffer.rango_salarial && (
              <Badge variant='secondary' className='px-3 py-1 text-sm'>
                <DollarSign className='mr-1.5 h-4 w-4' />{' '}
                {jobOffer.rango_salarial}
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className='space-y-6 p-6'>
          <div>
            <h2 className='mb-3 text-xl font-semibold text-gray-800'>
              Descripción del Puesto
            </h2>
            <p className='leading-relaxed whitespace-pre-line text-gray-700'>
              {jobOffer.descripcion_corta}{' '}
              {/* TODO: Use full description from a more detailed job type if available */}
            </p>
          </div>

          {/* Detailed sections - assuming fields like 'descripcion', 'requisitos' etc. are on JobOfferViewModel or a more detailed type */}
          {/* For now, using fields from PuestoTrabajo which JobOfferViewModel might extend or get data from */}
          {/* This part needs adjustment based on the actual full data model for a single job post */}

          {/* Example: renderListItems(jobOffer.descripcion_completa, "Descripción Detallada") */}
          {renderListItems(
            (jobOffer as any).descripcion || jobOffer.descripcion_corta,
            'Descripción Completa'
          )}
          {renderListItems((jobOffer as any).requisitos, 'Requisitos')}
          {renderListItems(
            (jobOffer as any).conocimientos_requeridos,
            'Conocimientos Requeridos'
          )}
          {renderListItems(
            (jobOffer as any).perfil_academico,
            'Perfil Académico'
          )}
          {renderListItems(
            (jobOffer as any).habilidades_requeridas,
            'Habilidades Requeridas'
          )}
          {renderListItems(
            (jobOffer as any).experiencia_requerida,
            'Experiencia Requerida'
          )}

          <div className='mt-6 border-t pt-4'>
            <Button
              size='lg'
              className='w-full bg-blue-600 text-lg text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto'
              onClick={handleApply}
              disabled={isApplied} // Disable button after applying
            >
              {isApplied ? (
                <>
                  <CheckCircle className='mr-2 h-5 w-5' /> Aplicado Exitosamente
                </>
              ) : (
                <>
                  <CheckCircle className='mr-2 h-5 w-5' /> Aplicar Ahora
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
