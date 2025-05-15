'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { JobOfferForm } from '../_components/job-offer-form'
import type { JobOfferFormValues } from '@/lib/validators/job-offer-validator'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NewJobOfferPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleCreateJobOffer = async (values: JobOfferFormValues) => {
    setIsSubmitting(true)
    console.log('Creating new job offer with values:', values)

    // TODO: Implement actual API call to save the job offer
    // For now, simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock a response
    const success = Math.random() > 0.1 // Simulate 90% success rate

    setIsSubmitting(false)

    if (success) {
      toast.success('¡Oferta de trabajo creada exitosamente!', {
        description: `La oferta "${values.nombre_puesto}" ha sido guardada.`,
      })
      router.push('/manage-jobs') // Redirect to the job list page
    } else {
      toast.error('Error al crear la oferta de trabajo', {
        description:
          'Hubo un problema al intentar guardar la oferta. Por favor, inténtalo de nuevo.',
      })
    }
  }

  return (
    <div className='space-y-6'>
      <div>
        <Button variant='outline' asChild size='sm' className='mb-4'>
          <Link href='/manage-jobs'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Volver a Gestión de Ofertas
          </Link>
        </Button>
        <h1 className='text-2xl font-semibold tracking-tight md:text-3xl'>
          Crear Nueva Oferta de Trabajo
        </h1>
        <p className='text-muted-foreground text-sm'>
          Completa el formulario para publicar una nueva oportunidad laboral.
        </p>
      </div>
      <JobOfferForm
        onSubmit={handleCreateJobOffer}
        isLoading={isSubmitting}
        submitButtonText={isSubmitting ? 'Guardando...' : 'Crear Oferta'}
      />
    </div>
  )
}
