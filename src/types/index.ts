export interface Empresa {
  id_empresa: number
  nombre_empresa: string
  // Add other company fields if needed for the listing, e.g., logo_url
}

export interface ModalidadTrabajo {
  id_modalidad: number
  nombre_modalidad: string
}

// This represents the raw data for a PuestoTrabajo, similar to your DB schema
export interface PuestoTrabajo {
  id_puesto: number
  id_empresa: number
  nombre_puesto: string
  descripcion: string
  requisitos: string
  conocimientos_requeridos: string
  perfil_academico: string
  habilidades_requeridas: string
  experiencia_requerida: string
  rango_salarial: string | null
  ubicacion: string
  id_modalidad: number
}

// This is a view model, tailored for displaying job offers in the UI
export interface JobOfferViewModel {
  id_puesto: number
  nombre_puesto: string
  empresa: Empresa
  descripcion_corta: string
  modalidad_trabajo: ModalidadTrabajo
  rango_salarial?: string
  fecha_publicacion: string
  fecha_limite_aplicacion: string

  // Fields for JobOfferForm
  descripcion_larga?: string
  requisitos?: string
  conocimientos_requeridos?: string
  habilidades_requeridas?: string
  experiencia_requerida?: string
  perfil_academico?: string
  ubicacion?: string
  estado_oferta?: 'Borrador' | 'Activa' | 'Pausada'
}
