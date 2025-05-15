'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import type { JobOfferViewModel } from '@/types'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Eye, Edit3, Trash2 } from 'lucide-react'

interface JobOffersDataTableProps {
  data: JobOfferViewModel[]
}

// Mock status for demonstration
const getMockStatus = (jobId: number) => {
  const statuses = [
    { label: 'Activa', variant: 'default' as const }, // Greenish in default shadcn theme
    { label: 'Pausada', variant: 'secondary' as const }, // Grayish
    { label: 'Cerrada', variant: 'outline' as const }, // Light gray with border
    { label: 'Borrador', variant: 'destructive' as const }, // Reddish (using destructive for variety)
  ]
  return statuses[jobId % statuses.length]
}

export const JobOffersDataTable: React.FC<JobOffersDataTableProps> = ({
  data,
}) => {
  const router = useRouter()

  if (!data || data.length === 0) {
    return (
      <div className='rounded-md border p-10 text-center'>
        <p className='text-muted-foreground'>
          No hay ofertas de trabajo para mostrar.
        </p>
      </div>
    )
  }

  const handleEdit = (jobOfferId: number) => {
    router.push(`/manage-jobs/${jobOfferId}/edit`)
  }

  // Placeholder for other actions
  const handleViewDetails = (jobOfferId: number) => {
    console.log('View details for:', jobOfferId)
    // router.push(`/manage-jobs/${jobOfferId}`); // Future implementation
  }

  const handleDelete = (jobOfferId: number) => {
    console.log('Delete job:', jobOfferId)
    // Add confirmation logic here before actual deletion
  }

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Título del Puesto</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead>Modalidad</TableHead>
            <TableHead className='hidden md:table-cell'>Salario</TableHead>
            <TableHead className='hidden sm:table-cell'>Estado</TableHead>
            <TableHead className='text-right'>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((offer) => {
            const status = getMockStatus(offer.id_puesto)
            return (
              <TableRow key={offer.id_puesto}>
                <TableCell className='font-medium'>{offer.id_puesto}</TableCell>
                <TableCell>
                  <div className='font-medium'>{offer.nombre_puesto}</div>
                  <div className='text-muted-foreground text-xs md:hidden'>
                    {offer.empresa.nombre_empresa}
                  </div>
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  {offer.empresa.nombre_empresa}
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  {offer.modalidad_trabajo.nombre_modalidad}
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  {offer.rango_salarial || 'N/A'}
                </TableCell>
                <TableCell className='hidden sm:table-cell'>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </TableCell>
                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' className='h-8 w-8 p-0'>
                        <span className='sr-only'>Abrir menú</span>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => handleViewDetails(offer.id_puesto)}
                      >
                        <Eye className='mr-2 h-4 w-4' />
                        Ver Detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleEdit(offer.id_puesto)}
                      >
                        <Edit3 className='mr-2 h-4 w-4' />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className='text-red-600 focus:bg-red-50 focus:text-red-600'
                        onClick={() => handleDelete(offer.id_puesto)}
                      >
                        <Trash2 className='mr-2 h-4 w-4' />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
