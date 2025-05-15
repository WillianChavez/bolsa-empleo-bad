'use client' // Keep as client component if LoginForm itself needs client context or hooks passed from here, though LoginForm is already client.

import { LoginForm } from '@/components/auth/login-form'
// import { useSearchParams } from 'next/navigation'; // Optional: To get role from query param

export default function LoginPage() {
  // const searchParams = useSearchParams(); // Optional
  // const role = searchParams.get('role'); // Optional: e.g., 'applicant' or 'company'

  // You could use the 'role' to slightly customize the page title or description if needed
  // let pageTitle = "Iniciar Sesión";
  // if (role === 'applicant') pageTitle = "Iniciar Sesión como Postulante";
  // if (role === 'company') pageTitle = "Iniciar Sesión como Empresa/RH";

  return (
    <div className='flex min-h-[calc(100vh-var(--header-height,8rem))] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
      {/* Adjust min-h if your header height is different or fixed */}
      <div className='w-full max-w-md space-y-8'>
        {/* Example of using role for dynamic text, if implemented */}
        {/* <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{pageTitle}</h2> */}
        <LoginForm />
      </div>
    </div>
  )
}
