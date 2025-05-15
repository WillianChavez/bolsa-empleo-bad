'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, UserPlus } from 'lucide-react'
import Link from 'next/link'

// Placeholder for actual registration logic
const handleApplicantRegister = async (formData: any) => {
  console.log('Attempting applicant registration with:', formData)
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Basic validation example (in a real app, this would be more robust and backend-driven)
      if (
        !formData.email ||
        !formData.password ||
        !formData.firstName ||
        !formData.lastName
      ) {
        reject({
          success: false,
          message: 'Por favor completa todos los campos obligatorios.',
        })
        return
      }
      if (formData.password !== formData.confirmPassword) {
        reject({ success: false, message: 'Las contraseñas no coinciden.' })
        return
      }
      resolve({
        success: true,
        message: '¡Registro de postulante exitoso!',
        user: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
        },
      })
    }, 1000)
  })
}

export const ApplicantRegisterForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      setIsLoading(false)
      return
    }

    try {
      const formData = { firstName, lastName, email, password, confirmPassword }
      const response = await handleApplicantRegister(formData)
      console.log('Applicant registration response:', response)
      // TODO: Handle successful registration (e.g., redirect to login or dashboard, show success message)
      alert(
        '¡Registro de postulante exitoso! (Simulado) Por favor, inicia sesión.'
      ) // Placeholder
      // Consider redirecting: router.push('/login');
    } catch (err: any) {
      setError(
        err.message || 'Ocurrió un error inesperado durante el registro.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const toggleShowPassword = () => setShowPassword(!showPassword)
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword)

  return (
    <Card className='w-full max-w-lg'>
      <CardHeader className='text-center'>
        <UserPlus className='mx-auto h-12 w-12 text-blue-600' />
        <CardTitle className='mt-4 text-2xl font-bold tracking-tight'>
          Registrarse como Postulante
        </CardTitle>
        <CardDescription>
          Crea tu cuenta para encontrar tu próximo empleo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='firstName'>Nombres</Label>
              <Input
                id='firstName'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                disabled={isLoading}
                autoComplete='given-name'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='lastName'>Apellidos</Label>
              <Input
                id='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                disabled={isLoading}
                autoComplete='family-name'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='emailReg'>Correo Electrónico</Label>
            <Input
              id='emailReg'
              type='email'
              placeholder='tu@correo.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              autoComplete='email'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='passwordReg'>Contraseña</Label>
            <div className='relative'>
              <Input
                id='passwordReg'
                type={showPassword ? 'text' : 'password'}
                placeholder='••••••••'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                autoComplete='new-password'
              />
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                onClick={toggleShowPassword}
                aria-label={
                  showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                }
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className='h-4 w-4' />
                ) : (
                  <Eye className='h-4 w-4' />
                )}
              </Button>
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='confirmPasswordReg'>Confirmar Contraseña</Label>
            <div className='relative'>
              <Input
                id='confirmPasswordReg'
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='••••••••'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
                autoComplete='new-password'
              />
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                onClick={toggleShowConfirmPassword}
                aria-label={
                  showConfirmPassword
                    ? 'Ocultar contraseña'
                    : 'Mostrar contraseña'
                }
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOff className='h-4 w-4' />
                ) : (
                  <Eye className='h-4 w-4' />
                )}
              </Button>
            </div>
          </div>

          {error && (
            <p className='text-center text-sm text-red-600' role='alert'>
              {error}
            </p>
          )}

          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? (
              <>
                <svg
                  className='mr-3 -ml-1 h-5 w-5 animate-spin text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  ></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
                Registrando...
              </>
            ) : (
              <>
                <UserPlus className='mr-2 h-5 w-5' /> Registrarme
              </>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className='flex flex-col items-center space-y-2 pt-4 text-sm'>
        <p className='text-gray-600'>
          ¿Ya tienes una cuenta?{' '}
          <Link
            href='/login'
            className='font-medium text-blue-600 hover:underline'
          >
            Inicia Sesión
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
