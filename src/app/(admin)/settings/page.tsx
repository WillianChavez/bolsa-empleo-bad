import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { User, Building } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-2xl font-semibold tracking-tight md:text-3xl'>
          Configuración
        </h1>
        <p className='text-muted-foreground text-sm'>
          Gestiona la configuración de tu perfil y la información de tu empresa.
        </p>
      </div>
      <Separator />

      {/* User Profile Settings */}
      <Card>
        <CardHeader>
          <div className='flex items-center'>
            <User className='text-muted-foreground mr-2 h-6 w-6' />
            <CardTitle>Perfil de Usuario</CardTitle>
          </div>
          <CardDescription>Actualiza tu información personal.</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <div className='space-y-1'>
              <Label htmlFor='firstName'>Nombres</Label>
              <Input
                id='firstName'
                defaultValue='Admin'
                placeholder='Ej: Juan'
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='lastName'>Apellidos</Label>
              <Input
                id='lastName'
                defaultValue='User'
                placeholder='Ej: Pérez'
              />
            </div>
          </div>
          <div className='space-y-1'>
            <Label htmlFor='email'>Correo Electrónico</Label>
            <Input
              id='email'
              type='email'
              defaultValue='admin@example.com'
              placeholder='tu@correo.com'
            />
          </div>
          <Button>Guardar Cambios de Perfil</Button>
        </CardContent>
      </Card>

      {/* Company Information Settings */}
      <Card>
        <CardHeader>
          <div className='flex items-center'>
            <Building className='text-muted-foreground mr-2 h-6 w-6' />
            <CardTitle>Información de la Empresa</CardTitle>
          </div>
          <CardDescription>
            Actualiza los detalles de tu empresa.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-1'>
            <Label htmlFor='companyName'>Nombre de la Empresa</Label>
            <Input
              id='companyName'
              defaultValue='Mi Empresa S.A. de C.V.'
              placeholder='Nombre comercial de la empresa'
            />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='companyDescription'>
              Descripción de la Empresa
            </Label>
            <Textarea
              id='companyDescription'
              defaultValue='Una breve descripción sobre lo que hace tu empresa, su misión y visión.'
              placeholder='Describe tu empresa...'
              className='min-h-[100px] resize-y'
            />
          </div>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <div className='space-y-1'>
              <Label htmlFor='companyLocation'>Ubicación</Label>
              <Input
                id='companyLocation'
                defaultValue='San Salvador, El Salvador'
                placeholder='Ciudad, País'
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='companyWebsite'>Sitio Web (Opcional)</Label>
              <Input
                id='companyWebsite'
                type='url'
                defaultValue='https://miempresa.com'
                placeholder='https://www.ejemplo.com'
              />
            </div>
          </div>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <div className='space-y-1'>
              <Label htmlFor='companyPhone'>Teléfono de la Empresa</Label>
              <Input
                id='companyPhone'
                type='tel'
                defaultValue='+503 2222-3333'
                placeholder='+503 XXXX-XXXX'
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='companyContactPerson'>
                Persona de Contacto (RH)
              </Label>
              <Input
                id='companyContactPerson'
                defaultValue='Ana Recursos'
                placeholder='Nombre del contacto principal'
              />
            </div>
          </div>
          <Button>Guardar Información de Empresa</Button>
        </CardContent>
      </Card>
    </div>
  )
}
