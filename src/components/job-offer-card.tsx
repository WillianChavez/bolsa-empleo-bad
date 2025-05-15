'use client' // Add 'use client' because we'll use useRouter

import type { JobOfferViewModel } from '@/types'
import { useRouter } from 'next/navigation' // Import useRouter
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card' // Assuming Card components are in src/components/ui/
import { Button } from '@/components/ui/button' // Assuming Button is in src/components/ui/
import { Briefcase, MapPin, DollarSign, Building, Eye } from 'lucide-react'

interface JobOfferCardProps {
  jobOffer: JobOfferViewModel
}

export const JobOfferCard: React.FC<JobOfferCardProps> = ({ jobOffer }) => {
  const router = useRouter() // Initialize useRouter

  const handleViewDetails = () => {
    router.push(`/jobs/${jobOffer.id_puesto}`) // Navigate to the job details page
  }

  return (
    <Card
      className='group w-full max-w-md cursor-pointer transition-shadow duration-300 hover:shadow-lg'
      onClick={handleViewDetails}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleViewDetails()
      }}
      tabIndex={0} // Make card focusable
      role='article'
      aria-labelledby={`job-title-${jobOffer.id_puesto}`}
    >
      <CardHeader className='pb-4'>
        <div className='flex items-start justify-between'>
          <div>
            <CardTitle
              id={`job-title-${jobOffer.id_puesto}`}
              className='text-xl font-semibold text-blue-700 transition-colors group-hover:text-blue-800'
            >
              {jobOffer.nombre_puesto}
            </CardTitle>
            <CardDescription className='flex items-center pt-1 text-sm text-gray-600'>
              <Building className='mr-2 h-4 w-4 text-gray-500' />
              {jobOffer.empresa.nombre_empresa}
            </CardDescription>
          </div>
          {/* Placeholder for a company logo or a bookmark icon */}
          {/* <img src={jobOffer.empresa.logo_url || '/placeholder-logo.svg'} alt={jobOffer.empresa.nombre_empresa} className="w-12 h-12 rounded-md object-contain" /> */}
        </div>
      </CardHeader>
      <CardContent className='space-y-2 pb-4 text-sm text-gray-700'>
        <p className='line-clamp-3 leading-relaxed text-gray-600'>
          {jobOffer.descripcion_corta}
        </p>
        <div className='flex items-center pt-2 text-gray-600'>
          <Briefcase className='mr-2 h-4 w-4 text-blue-600' />
          <span>{jobOffer.modalidad.nombre_modalidad}</span>
        </div>
        <div className='flex items-center text-gray-600'>
          <MapPin className='mr-2 h-4 w-4 text-red-600' />
          <span>{jobOffer.ubicacion}</span>
        </div>
        {jobOffer.rango_salarial && (
          <div className='flex items-center text-gray-600'>
            <DollarSign className='mr-2 h-4 w-4 text-green-600' />
            <span>{jobOffer.rango_salarial}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className='flex justify-end border-t border-gray-100 pt-3 pb-4'>
        <Button
          variant='outline'
          onClick={(e) => {
            // Prevent card's onClick from firing if button itself is clicked,
            // though it achieves the same navigation.
            e.stopPropagation()
            handleViewDetails()
          }}
          aria-label={`Ver detalles de ${jobOffer.nombre_puesto}`}
          className='text-sm'
        >
          <Eye className='mr-2 h-4 w-4' /> Ver Detalles
        </Button>
      </CardFooter>
    </Card>
  )
}
