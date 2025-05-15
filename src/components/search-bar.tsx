'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Search, DollarSign, Briefcase } from 'lucide-react';

// Define a type for all search parameters
export interface JobSearchCriteria {
  searchTerm: string;
  minSalary: string;
  maxSalary: string;
  modality: string;
}

interface SearchBarProps {
  onSearch?: (criteria: JobSearchCriteria) => void;
}

// Mock modalities - in a real app, this might come from an API or constants file
const workModalities = [
  { id: 'all', name: 'Todas las Modalidades' },
  { id: 'Presencial', name: 'Presencial' },
  { id: 'Remoto', name: 'Remoto' },
  { id: 'Híbrido', name: 'Híbrido' },
];

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [modality, setModality] = useState(workModalities[0].id); // Default to 'all'

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleMinSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinSalary(event.target.value.replace(/\D/g, '')); // Allow only digits
  };

  const handleMaxSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxSalary(event.target.value.replace(/\D/g, '')); // Allow only digits
  };

  const handleModalityChange = (value: string) => {
    setModality(value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const criteria: JobSearchCriteria = {
      searchTerm,
      minSalary,
      maxSalary,
      modality,
    };
    console.log('Search criteria submitted:', criteria);
    if (onSearch) {
      onSearch(criteria);
    }
  };

  return (
    <form 
      onSubmit={handleSearchSubmit} 
      className='w-full max-w-4xl p-6 bg-white shadow-md rounded-lg border border-gray-200'
      role="search"
      aria-labelledby="search-bar-heading"
    >
      <h2 id="search-bar-heading" className="sr-only">Controles de Búsqueda de Empleo</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {/* Search Term Input */}
        <div className="lg:col-span-2 flex flex-col space-y-1.5">
          <Label htmlFor="searchTerm" className="font-semibold text-gray-700">Buscar por Puesto o Palabra Clave</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="searchTerm"
              type='search'
              placeholder='Ej: Ingeniero de Software, React, Marketing...'
              value={searchTerm}
              onChange={handleInputChange}
              className='pl-10'
              aria-label='Término de búsqueda'
            />
          </div>
        </div>

        {/* Min Salary Input */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="minSalary" className="font-semibold text-gray-700">Salario Mínimo</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="minSalary"
              type='text' // Use text to allow formatting, but validate as number
              placeholder='Ej: 500'
              value={minSalary}
              onChange={handleMinSalaryChange}
              className='pl-10'
              aria-label='Salario mínimo'
            />
          </div>
        </div>

        {/* Max Salary Input */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="maxSalary" className="font-semibold text-gray-700">Salario Máximo</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="maxSalary"
              type='text'
              placeholder='Ej: 1500'
              value={maxSalary}
              onChange={handleMaxSalaryChange}
              className='pl-10'
              aria-label='Salario máximo'
            />
          </div>
        </div>

        {/* Modality Select */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="modality" className="font-semibold text-gray-700">Modalidad</Label>
          <div className="relative">
             <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
            <Select value={modality} onValueChange={handleModalityChange}>
              <SelectTrigger id="modality" className="pl-10" aria-label="Seleccionar modalidad de trabajo">
                <SelectValue placeholder="Seleccionar modalidad" />
              </SelectTrigger>
              <SelectContent>
                {workModalities.map((mod) => (
                  <SelectItem key={mod.id} value={mod.id}>
                    {mod.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search Button */}
        <div className="lg:col-start-4 flex flex-col justify-end">
             {/* This empty div is used to align the button correctly when on larger screens and other filters take full width */}
            <Button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white' aria-label='Aplicar filtros y buscar'>
              <Search className='h-5 w-5 mr-2' />
              Buscar Ofertas
            </Button>
        </div>
      </div>
    </form>
  );
}; 