import type { JobOfferViewModel, Empresa, ModalidadTrabajo } from '@/types';

const mockEmpresas: Empresa[] = [
  { id_empresa: 1, nombre_empresa: 'Tech Solutions Inc.' },
  { id_empresa: 2, nombre_empresa: 'Innovatech Global' },
  { id_empresa: 3, nombre_empresa: 'Future Works Co.' },
];

const mockModalidades: ModalidadTrabajo[] = [
  { id_modalidad: 1, nombre_modalidad: 'Remoto' },
  { id_modalidad: 2, nombre_modalidad: 'Híbrido' },
  { id_modalidad: 3, nombre_modalidad: 'Presencial' },
];

const mockJobOffers: JobOfferViewModel[] = [
  {
    id_puesto: 101,
    nombre_puesto: 'Desarrollador Full-Stack Senior',
    descripcion_corta: 'Únete a nuestro equipo para desarrollar soluciones web innovadoras utilizando las últimas tecnologías. Experiencia en React, Node.js y AWS requerida.',
    rango_salarial: '$5000 - $7000',
    ubicacion: 'San Salvador, El Salvador',
    empresa: mockEmpresas[0],
    modalidad: mockModalidades[1], // Híbrido
  },
  {
    id_puesto: 102,
    nombre_puesto: 'Ingeniero de Software (Frontend)',
    descripcion_corta: 'Buscamos un talentoso ingeniero frontend para construir interfaces de usuario intuitivas y responsivas. Dominio de Next.js y TypeScript es esencial.',
    rango_salarial: '$4000 - $5500',
    ubicacion: 'Santa Tecla, El Salvador',
    empresa: mockEmpresas[1],
    modalidad: mockModalidades[0], // Remoto
  },
  {
    id_puesto: 103,
    nombre_puesto: 'Analista de Datos Junior',
    descripcion_corta: 'Oportunidad para un analista de datos recién graduado o con poca experiencia para trabajar con grandes conjuntos de datos y generar insights valiosos.',
    rango_salarial: '$1500 - $2500',
    ubicacion: 'Antiguo Cuscatlán, El Salvador',
    empresa: mockEmpresas[0],
    modalidad: mockModalidades[2], // Presencial
  },
  {
    id_puesto: 104,
    nombre_puesto: 'Diseñador UX/UI Pleno',
    descripcion_corta: 'Crea experiencias de usuario atractivas y funcionales para nuestras aplicaciones móviles y web. Portfolio demostrable es un must.',
    rango_salarial: '$3000 - $4500',
    ubicacion: 'Remoto (Global)',
    empresa: mockEmpresas[2],
    modalidad: mockModalidades[0], // Remoto
  },
];

// Simulate an API call
export const fetchJobOffers = async (): Promise<JobOfferViewModel[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockJobOffers);
    }, 500); // Simulate network delay
  });
}; 