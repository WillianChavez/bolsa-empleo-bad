import * as z from 'zod'

export const jobOfferFormSchema = z.object({
  nombre_puesto: z
    .string({
      required_error: 'El nombre del puesto es requerido.',
    })
    .min(3, {
      message: 'El nombre del puesto debe tener al menos 3 caracteres.',
    })
    .max(100, {
      message: 'El nombre del puesto no puede exceder los 100 caracteres.',
    }),
  nombre_empresa: z
    .string({
      required_error: 'El nombre de la empresa es requerido.',
    })
    .min(2, {
      message: 'El nombre de la empresa debe tener al menos 2 caracteres.',
    })
    .max(100, {
      message: 'El nombre de la empresa no puede exceder los 100 caracteres.',
    }),
  descripcion_corta: z
    .string({
      required_error: 'La descripción corta es requerida.',
    })
    .min(10, {
      message: 'La descripción corta debe tener al menos 10 caracteres.',
    })
    .max(300, {
      message: 'La descripción corta no puede exceder los 300 caracteres.',
    }),
  descripcion_larga: z
    .string({
      required_error: 'La descripción completa es requerida.',
    })
    .min(50, {
      message: 'La descripción completa debe tener al menos 50 caracteres.',
    }),
  requisitos: z
    .string({
      required_error: 'Los requisitos son necesarios.',
    })
    .min(10, {
      message: 'Por favor, detalla los requisitos (mín. 10 caracteres).',
    }),
  conocimientos_requeridos: z
    .string({
      required_error: 'Los conocimientos son necesarios.',
    })
    .min(10, {
      message: 'Por favor, detalla los conocimientos (mín. 10 caracteres).',
    }),
  habilidades_requeridas: z
    .string({
      required_error: 'Las habilidades son necesarias.',
    })
    .min(10, {
      message: 'Por favor, detalla las habilidades (mín. 10 caracteres).',
    }),
  experiencia_requerida: z
    .string({
      required_error: 'La experiencia es necesaria.',
    })
    .min(5, {
      message: 'Por favor, detalla la experiencia (mín. 5 caracteres).',
    }),
  perfil_academico: z
    .string({
      required_error: 'El perfil académico es necesario.',
    })
    .min(10, {
      message: 'Por favor, detalla el perfil académico (mín. 10 caracteres).',
    }),
  ubicacion: z
    .string({
      required_error: 'La ubicación es requerida.',
    })
    .min(3, { message: 'La ubicación debe tener al menos 3 caracteres.' }),
  rango_salarial: z
    .string()
    .max(50, {
      message: 'El rango salarial no debe exceder los 50 caracteres.',
    })
    .optional()
    .or(z.literal('')), // Allow empty string
  // For id_modalidad_trabajo, assuming the <select> value will be the string ID
  id_modalidad_trabajo: z.string({
    required_error: 'Debe seleccionar una modalidad de trabajo.',
  }),
  fecha_limite_aplicacion: z.date({
    required_error: 'La fecha límite de aplicación es requerida.',
    invalid_type_error: 'Fecha inválida.',
  }),
  estado_oferta: z.enum(['Borrador', 'Activa', 'Pausada'], {
    required_error: 'Debe seleccionar un estado para la oferta.',
  }),
})

export type JobOfferFormValues = z.infer<typeof jobOfferFormSchema>
