'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  jobOfferFormSchema,
  type JobOfferFormValues,
} from '@/lib/validators/job-offer-validator'
import { MODALIDADES_TRABAJO } from '@/lib/mock-data' // For select options
import type { ModalidadTrabajo } from '@/types' // Corrected: Import type ModalidadTrabajo directly from @/types

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale' // Spanish locale for date-fns

interface JobOfferFormProps {
  onSubmit: (values: JobOfferFormValues) => Promise<void>
  initialData?: Partial<JobOfferFormValues>
  isLoading?: boolean
  submitButtonText?: string
}

export const JobOfferForm: React.FC<JobOfferFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false,
  submitButtonText = 'Guardar Oferta',
}) => {
  const form = useForm<JobOfferFormValues>({
    resolver: zodResolver(jobOfferFormSchema),
    defaultValues: {
      nombre_puesto: initialData?.nombre_puesto || '',
      nombre_empresa: initialData?.nombre_empresa || '',
      descripcion_corta: initialData?.descripcion_corta || '',
      descripcion_larga: initialData?.descripcion_larga || '',
      requisitos: initialData?.requisitos || '',
      conocimientos_requeridos: initialData?.conocimientos_requeridos || '',
      habilidades_requeridas: initialData?.habilidades_requeridas || '',
      experiencia_requerida: initialData?.experiencia_requerida || '',
      perfil_academico: initialData?.perfil_academico || '',
      ubicacion: initialData?.ubicacion || '',
      rango_salarial: initialData?.rango_salarial || '',
      id_modalidad_trabajo: initialData?.id_modalidad_trabajo || undefined,
      fecha_limite_aplicacion: initialData?.fecha_limite_aplicacion
        ? new Date(initialData.fecha_limite_aplicacion)
        : undefined,
      estado_oferta: initialData?.estado_oferta || 'Borrador',
    },
  })

  const estadosOferta: JobOfferFormValues['estado_oferta'][] = [
    'Borrador',
    'Activa',
    'Pausada',
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='nombre_puesto'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Puesto</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Ej: Desarrollador Full-Stack'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='nombre_empresa'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de la Empresa</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Ej: Tech Solutions S.A. de C.V.'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='descripcion_corta'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción Corta (Resumen)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Un breve resumen de la oferta (máx. 300 caracteres)'
                  className='resize-y'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='descripcion_larga'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción Completa del Puesto</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Detalles completos sobre las responsabilidades, el equipo, la cultura, etc.'
                  className='h-32 resize-y'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='requisitos'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requisitos del Puesto</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Listar los requisitos indispensables (ej. lenguajes, frameworks, experiencia específica). Uno por línea preferiblemente.'
                  className='h-28 resize-y'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='conocimientos_requeridos'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conocimientos Requeridos</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Ej: REST APIs, Git, Docker. Uno por línea.'
                    {...field}
                    className='h-24 resize-y'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='habilidades_requeridas'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Habilidades Requeridas</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Ej: Resolución de problemas, Comunicación efectiva, Trabajo en equipo. Una por línea.'
                    {...field}
                    className='h-24 resize-y'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='experiencia_requerida'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experiencia Requerida</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Ej: 3+ años en desarrollo web, Experiencia liderando proyectos. Una por línea.'
                    {...field}
                    className='h-24 resize-y'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='perfil_academico'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Perfil Académico</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Ej: Ing. en Ciencias de la Computación (o similar), Certificaciones relevantes. Uno por línea.'
                    {...field}
                    className='h-24 resize-y'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <FormField
            control={form.control}
            name='ubicacion'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ubicación</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Ej: San Salvador, Remoto (El Salvador)'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='rango_salarial'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rango Salarial (Opcional)</FormLabel>
                <FormControl>
                  <Input placeholder='Ej: $1000 - $1500' {...field} />
                </FormControl>
                <FormDescription>
                  Indicar si es negociable o confidencial.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='id_modalidad_trabajo'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modalidad de Trabajo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Seleccionar modalidad...' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {MODALIDADES_TRABAJO.map((modalidad: ModalidadTrabajo) => (
                      <SelectItem
                        key={modalidad.id_modalidad}
                        value={String(modalidad.id_modalidad)}
                      >
                        {modalidad.nombre_modalidad}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='fecha_limite_aplicacion'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Fecha Límite de Aplicación</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP', { locale: es })
                        ) : (
                          <span>Seleccionar fecha</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      } // Disable past dates
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='estado_oferta'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado de la Oferta (Admin)</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Seleccionar estado...' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {estadosOferta.map((estado) => (
                      <SelectItem key={estado} value={estado}>
                        {estado}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Control interno del estado de la publicación.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type='submit' disabled={isLoading} className='w-full sm:w-auto'>
          {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {submitButtonText}
        </Button>
      </form>
    </Form>
  )
}
