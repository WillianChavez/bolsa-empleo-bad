'use client';

import { useEffect, useState, useMemo } from 'react';
import type { JobOfferViewModel } from '@/types';
import { fetchJobOffers } from '@/lib/mock-data';
import { JobOfferCard } from '@/components/job-offer-card';
import { Skeleton } from "@/components/ui/skeleton";
import type { JobSearchCriteria } from '@/components/search-bar'; // Import the type

interface JobOfferListProps {
  searchCriteria?: JobSearchCriteria | null; // Optional prop
}

// Helper function to parse salary ranges like "$500 - $700" or "$1000"
const parseSalaryRange = (rangeStr: string | null): { min: number; max: number } | null => {
  if (!rangeStr) return null;
  const numbers = rangeStr.match(/\d+(\.\d+)?/g);
  if (!numbers) return null;

  const parsedNumbers = numbers.map(num => parseFloat(num.replace(/,/g, '')));
  if (parsedNumbers.length === 1) return { min: parsedNumbers[0], max: parsedNumbers[0] };
  if (parsedNumbers.length >= 2) return { min: Math.min(...parsedNumbers), max: Math.max(...parsedNumbers) };
  return null;
};

export const JobOfferList: React.FC<JobOfferListProps> = ({ searchCriteria }) => {
  const [allJobOffers, setAllJobOffers] = useState<JobOfferViewModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJobOffers = async () => {
      try {
        setIsLoading(true);
        const data = await fetchJobOffers();
        setAllJobOffers(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred while fetching job offers.');
        }
        setAllJobOffers([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobOffers();
  }, []);

  const filteredJobOffers = useMemo(() => {
    if (!searchCriteria) {
      return allJobOffers;
    }

    let offers = [...allJobOffers];

    // Filter by search term (in job title)
    if (searchCriteria.searchTerm) {
      offers = offers.filter(job => 
        job.nombre_puesto.toLowerCase().includes(searchCriteria.searchTerm.toLowerCase())
      );
    }

    // Filter by modality
    if (searchCriteria.modality && searchCriteria.modality !== 'all') {
      offers = offers.filter(job => 
        job.modalidad.nombre_modalidad === searchCriteria.modality
      );
    }

    // Filter by salary range
    const searchMinSalary = searchCriteria.minSalary ? parseFloat(searchCriteria.minSalary) : null;
    const searchMaxSalary = searchCriteria.maxSalary ? parseFloat(searchCriteria.maxSalary) : null;

    if (searchMinSalary !== null || searchMaxSalary !== null) {
      offers = offers.filter(job => {
        const jobSalaryRange = parseSalaryRange(job.rango_salarial);
        if (!jobSalaryRange) return false; // Exclude if job salary is not parseable and filter is active

        let matchesMin = true;
        if (searchMinSalary !== null) {
          matchesMin = jobSalaryRange.max >= searchMinSalary; // Job's max must be at least searchMin
        }

        let matchesMax = true;
        if (searchMaxSalary !== null) {
          matchesMax = jobSalaryRange.min <= searchMaxSalary; // Job's min must be at most searchMax
        }
        
        // More precise check: job range must overlap with search range
        if (searchMinSalary !== null && searchMaxSalary !== null) {
            // Job: [jobMin, jobMax], Search: [searchMin, searchMax]
            // Overlap if: jobMin <= searchMax AND jobMax >= searchMin
            return jobSalaryRange.min <= searchMaxSalary && jobSalaryRange.max >= searchMinSalary;
        }
        if (searchMinSalary !== null) return matchesMin;
        if (searchMaxSalary !== null) return matchesMax;

        return true;
      });
    }

    return offers;
  }, [allJobOffers, searchCriteria]);

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6'>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div role="alert" className='text-center text-red-600 bg-red-50 border border-red-200 p-4 rounded-md my-10'>Error: {error}</div>;
  }

  if (filteredJobOffers.length === 0) {
    return <div className='text-center text-gray-500 py-10'>No se encontraron ofertas de trabajo que coincidan con sus criterios de búsqueda.</div>;
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6'>
      {filteredJobOffers.map((job) => (
        <JobOfferCard key={job.id_puesto} jobOffer={job} />
      ))}
    </div>
  );
}; 