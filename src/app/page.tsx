'use client'; // Make HomePage a Client Component

import { JobOfferList } from '@/components/job-offer-list';
import { SearchBar, type JobSearchCriteria } from '@/components/search-bar'; // Import JobSearchCriteria type
import { useState } from 'react';

export default function HomePage() {
  // State to hold the current search criteria
  const [searchCriteria, setSearchCriteria] = useState<JobSearchCriteria | null>(null);

  const handleSearch = (criteria: JobSearchCriteria) => {
    console.log("Search submitted from HomePage with criteria:", criteria);
    setSearchCriteria(criteria);
    // TODO: Implement logic to filter job offers based on all criteria.
    // This will likely involve passing `searchCriteria` to `JobOfferList`
    // or re-fetching data based on these criteria.
  };

  return (
    <>
      <header className='mb-8 text-center'>
        <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl'>
          Ofertas de Trabajo
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Encuentra tu próxima oportunidad profesional. Filtra por palabra clave, salario y modalidad.
        </p>
      </header>

      {/* Search Bar Section */}
      <div className='mb-10 flex justify-center px-4'>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Display current search criteria (for debugging/demonstration) */}
      {searchCriteria && (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Filtros Activos:</h3>
          <p className="text-sm text-gray-700">
            Término: {searchCriteria.searchTerm || 'N/A'} | 
            Salario Mín: {searchCriteria.minSalary || 'N/A'} | 
            Salario Máx: {searchCriteria.maxSalary || 'N/A'} | 
            Modalidad: {searchCriteria.modality || 'N/A'}
          </p>
        </div>
      )}

      <section className="px-4">
        <JobOfferList searchCriteria={searchCriteria} /> 
        {/* TODO: Pass searchCriteria to JobOfferList and implement filtering there */}
      </section>
    </>
  );
}
