import type { JobOfferViewModel, Empresa, ModalidadTrabajo } from '@/types'

const mockEmpresas: Empresa[] = [
  { id_empresa: 1, nombre_empresa: 'Tech Solutions Inc.' },
  { id_empresa: 2, nombre_empresa: 'Innovatech Global' },
  { id_empresa: 3, nombre_empresa: 'Future Works Co.' },
]

// Renamed and exporting this for the form select
export const MODALIDADES_TRABAJO: ModalidadTrabajo[] = [
  { id_modalidad: 1, nombre_modalidad: 'Remoto' },
  { id_modalidad: 2, nombre_modalidad: 'Híbrido' },
  { id_modalidad: 3, nombre_modalidad: 'Presencial' },
]

const mockJobOffers: JobOfferViewModel[] = [
  {
    id_puesto: 101,
    nombre_puesto: 'Desarrollador Full-Stack Senior',
    empresa: mockEmpresas[0],
    descripcion_corta:
      'Únete a nuestro equipo para desarrollar soluciones web innovadoras utilizando las últimas tecnologías. Experiencia en React, Node.js y AWS requerida.',
    descripcion_larga: 'Descripción larga detallada para el puesto de Desarrollador Full-Stack Senior...',
    requisitos: 'Requisito 1 para Full-Stack\\nRequisito 2 para Full-Stack',
    conocimientos_requeridos: 'React, Node.js, TypeScript, AWS, Docker',
    habilidades_requeridas: 'Resolución de problemas, Comunicación, Trabajo en equipo',
    experiencia_requerida: '5+ años en desarrollo full-stack',
    perfil_academico: 'Ingeniería en Sistemas, Ciencias de la Computación o afín.',
    ubicacion: 'San Salvador, El Salvador',
    rango_salarial: '$5000 - $7000',
    modalidad_trabajo: MODALIDADES_TRABAJO[1],
    fecha_publicacion: '2024-07-01',
    fecha_limite_aplicacion: '2024-08-15',
    estado_oferta: "Activa",
  },
  {
    id_puesto: 102,
    nombre_puesto: 'Ingeniero de Software (Frontend)',
    empresa: mockEmpresas[1],
    descripcion_corta:
      'Buscamos un talentoso ingeniero frontend para construir interfaces de usuario intuitivas y responsivas. Dominio de Next.js y TypeScript es esencial.',
    descripcion_larga: 'Estamos buscando un Ingeniero de Software Frontend apasionado y experimentado para unirse a nuestro creciente equipo. El candidato ideal tendrá una sólida experiencia en el desarrollo de interfaces de usuario modernas y receptivas utilizando Next.js y TypeScript. Trabajará en estrecha colaboración con nuestros diseñadores de UX/UI y desarrolladores de backend para ofrecer productos de software de alta calidad.',
    requisitos: '- Experiencia comprobada como Ingeniero Frontend o rol similar.\\n- Dominio de HTML, CSS, JavaScript (ES6+).\\n- Fuerte experiencia con React y Next.js.\\n- Experiencia con TypeScript.\\n- Familiaridad con herramientas de versionado de código como Git.',
    conocimientos_requeridos: 'Next.js, TypeScript, React, Redux/Zustand, TailwindCSS, GraphQL',
    habilidades_requeridas: 'Atención al detalle, Pensamiento analítico, Creatividad',
    experiencia_requerida: '3+ años en desarrollo frontend',
    perfil_academico: 'Licenciatura en Informática o campo relacionado. Se valorarán certificaciones.',
    ubicacion: 'Santa Tecla, El Salvador',
    rango_salarial: '$4000 - $5500',
    modalidad_trabajo: MODALIDADES_TRABAJO[0],
    fecha_publicacion: '2024-07-05',
    fecha_limite_aplicacion: '2024-09-01',
    estado_oferta: "Activa",
  },
  {
    id_puesto: 103,
    nombre_puesto: 'Analista de Datos Junior',
    empresa: mockEmpresas[0],
    descripcion_corta:
      'Oportunidad para un analista de datos recién graduado o con poca experiencia para trabajar con grandes conjuntos de datos y generar insights valiosos.',
    descripcion_larga: 'Esta es una excelente oportunidad para un individuo motivado que busca iniciar su carrera en el análisis de datos. El Analista de Datos Junior será responsable de recopilar, procesar y analizar datos para ayudar a la toma de decisiones estratégicas. El candidato ideal debe tener una base sólida en estadística y familiaridad con herramientas de análisis de datos.',
    requisitos: '- Recién graduado o hasta 1 año de experiencia en análisis de datos.\\n- Conocimiento de SQL.\\n- Familiaridad con Python o R para análisis de datos.\\n- Capacidad para comunicar hallazgos de manera clara.',
    conocimientos_requeridos: 'SQL, Excel, Python/R (básico), PowerBI/Tableau (deseable)',
    habilidades_requeridas: 'Curiosidad intelectual, Habilidades analíticas, Buena comunicación',
    experiencia_requerida: '0-1 año',
    perfil_academico: 'Licenciatura en Estadística, Matemáticas, Economía, Informática o campo cuantitativo relacionado.',
    ubicacion: 'Antiguo Cuscatlán, El Salvador',
    rango_salarial: '$1500 - $2500',
    modalidad_trabajo: MODALIDADES_TRABAJO[2],
    fecha_publicacion: '2024-07-10',
    fecha_limite_aplicacion: '2024-08-20',
    estado_oferta: "Borrador",
  },
  {
    id_puesto: 104,
    nombre_puesto: 'Diseñador UX/UI Pleno',
    empresa: mockEmpresas[2],
    descripcion_corta:
      'Crea experiencias de usuario atractivas y funcionales para nuestras aplicaciones móviles y web. Portfolio demostrable es un must.',
    descripcion_larga: 'Buscamos un Diseñador UX/UI talentoso y creativo para unirse a nuestro equipo. Será responsable de diseñar interfaces intuitivas y visualmente atractivas para nuestras plataformas digitales. El candidato ideal debe tener una sólida comprensión de los principios de diseño centrado en el usuario y un portafolio que demuestre su experiencia en diseño UX/UI.',
    requisitos: '- Experiencia demostrable como Diseñador UX/UI o rol similar.\\n- Portafolio sólido que muestre proyectos de diseño UX/UI.\\n- Dominio de herramientas de diseño como Figma, Sketch o Adobe XD.\\n- Conocimiento de las mejores prácticas de UX y tendencias de diseño actuales.',
    conocimientos_requeridos: 'Figma, Adobe XD, User Research, Wireframing, Prototyping, Design Systems',
    habilidades_requeridas: 'Empatía, Creatividad, Comunicación visual, Colaboración',
    experiencia_requerida: '2-4 años en diseño UX/UI',
    perfil_academico: 'Licenciatura en Diseño Gráfico, Diseño de Interacción, Psicología o campo relacionado. Cursos o certificaciones en UX/UI son una ventaja.',
    ubicacion: 'Remoto (Global)',
    rango_salarial: '$3000 - $4500',
    modalidad_trabajo: MODALIDADES_TRABAJO[0],
    fecha_publicacion: '2024-07-15',
    fecha_limite_aplicacion: '2024-09-10',
    estado_oferta: "Activa",
  },
]

// Simulate an API call
export const fetchJobOffers = async (): Promise<JobOfferViewModel[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockJobOffers)
    }, 500) // Simulate network delay
  })
}

export const fetchJobOfferById = async (id: number): Promise<JobOfferViewModel | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const offer = mockJobOffers.find(job => job.id_puesto === id);
      resolve(offer);
    }, 300);
  });
};
