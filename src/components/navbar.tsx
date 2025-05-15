'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, UserPlus, Building2 } from 'lucide-react'; // UserPlus for general register, Building2 for company
// import { useRouter } from 'next/navigation'; // Keep if more complex logic is needed before navigation

export const Navbar = () => {
  // const router = useRouter(); // Keep if more complex logic is needed

  // If you had more complex logic, you might use router.push here.
  // For simple navigation, <Button asChild> with <Link> is cleaner.
  // const handleApplicantLogin = () => {
  //   router.push('/login?role=applicant');
  // };

  // const handleCompanyLogin = () => {
  //   router.push('/login?role=company');
  // };

  // TODO: Define actual navigation paths for registration
  const applicantRegisterPath = '/register/applicant';
  const companyRegisterPath = '/register/company';

  return (
    <nav className='bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50'> {/* Made navbar sticky and white */}
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <Link 
              href='/' 
              className='text-2xl font-bold text-blue-700 hover:text-blue-800 transition-colors'
            >
              Bolsa de Empleo UES
            </Link>
          </div>
          <div className='flex items-center space-x-3'>
            <Button variant='outline' asChild>
              <Link href='/login' aria-label='Iniciar sesión'>
                Iniciar Sesión
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='default' className='bg-blue-600 hover:bg-blue-700 text-white'>
                  Registrarse
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Crear una cuenta como</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={applicantRegisterPath} className="cursor-pointer">
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Postulante</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={companyRegisterPath} className="cursor-pointer">
                    <Building2 className="mr-2 h-4 w-4" />
                    <span>Empresa / RH</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}; 