# Bolsa de Empleo - Proyecto de Bases de Datos (UES)

Este proyecto es una plataforma de bolsa de trabajo desarrollada como parte de la materia de Bases de Datos de la Universidad de El Salvador. La plataforma tiene como objetivo conectar a postulantes en búsqueda de oportunidades laborales con personal de Recursos Humanos (RH) y empresas que deseen publicar ofertas de trabajo.

## Tecnologías Principales

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [Shadcn UI](https://ui.shadcn.com/)
- **Notificaciones:** [Sonner](https://sonner.emilkowal.ski/) (para toasts)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Formateo de Código:** [Prettier](https://prettier.io/)
- **Hooks de Git:** [Husky](https://typicode.github.io/husky/)

## Funcionalidades Implementadas

### Generales

- **Navegación Principal:**
  - Logo y enlace a la página de inicio.
  - Botón "Iniciar Sesión" que dirige a `/login`.
  - Menú desplegable "Registrarse" con opciones para "Postulante" (`/register/applicant`) y "Empresa / RH" (`/register/company`).
  - Navbar fija en la parte superior con fondo blanco y sombra.
- **Notificaciones Toast:** Integración de `sonner` para feedback visual (ej. al aplicar a un trabajo).

### Página de Inicio (Ofertas de Empleo - `/`)

- **Listado de Ofertas de Empleo:**
  - Muestra tarjetas (`JobOfferCard`) con información resumida de cada oferta (nombre del puesto, empresa, modalidad, rango salarial, ubicación, descripción corta).
  - Estado de carga con `Skeleton` components.
  - Manejo de errores si la carga de ofertas falla.
  - Mensaje amigable si no hay ofertas o si los filtros no arrojan resultados.
- **Barra de Búsqueda Avanzada:**
  - **Término de búsqueda:** Input para buscar por palabras clave (puesto, habilidad, empresa). La búsqueda es case-insensitive y se enfoca en el título del puesto.
  - **Rango Salarial:** Inputs para salario mínimo y máximo.
  - **Modalidad de Trabajo:** Selector (Presencial, Remoto, Híbrido, Todas).
  - La búsqueda actualiza dinámicamente el listado de ofertas (filtrado del lado del cliente sobre datos mock).
- **Tarjeta de Oferta de Empleo (`JobOfferCard`):**
  - Muestra los detalles clave de una oferta.
  - Botón "Ver Detalles" que navega a la página de detalle de la oferta.
  - Toda la tarjeta es clickeable y navega a la página de detalle.
  - Diseño accesible.

### Página de Detalle de Oferta (`/jobs/[id]`)

- Muestra información completa de una oferta de trabajo específica.
- Carga los datos de la oferta (actualmente de `mock-data`).
- Estado de carga y manejo de errores.
- Botón "Aplicar Ahora":
  - Muestra una notificación `toast` de éxito al hacer clic (simulando la aplicación).
  - Se deshabilita después de hacer clic para prevenir múltiples aplicaciones.

### Autenticación (Simulada y Formularios UI)

- **Página de Inicio de Sesión (`/login`):**
  - Presenta el `LoginForm` para que los usuarios ingresen.
- **Formulario de Inicio de Sesión (`LoginForm`):**
  - Campos para email y contraseña.
  - Funcionalidad para mostrar/ocultar contraseña.
  - Manejo de estado de carga y visualización de errores.
  - Función `handleLogin` simulada.
- **Páginas de Registro:**
  - **Registro de Postulante (`/register/applicant`):** Muestra `ApplicantRegisterForm`.
  - **Registro de Empresa / RH (`/register/company`):** Muestra `CompanyRegisterForm`.
- **Formulario de Registro de Postulante (`ApplicantRegisterForm`):**
  - Campos para nombres, apellidos, email, contraseña y confirmación de contraseña.
  - Validaciones básicas del lado del cliente.
  - Funcionalidad para mostrar/ocultar contraseña.
  - Manejo de estado de carga y errores.
  - Función `handleApplicantRegister` simulada.
- **Formulario de Registro de Empresa / RH (`CompanyRegisterForm`):**
  - Campos para nombre de la empresa, email, contraseña, NIT, y opcionalmente dirección y teléfono.
  - Validaciones del lado del cliente (incluyendo formato básico de NIT).
  - Funcionalidad para mostrar/ocultar contraseña.
  - Manejo de estado de carga y errores con notificaciones `toast`.
  - Función `handleCompanyRegister` simulada.

### Estructura y Tipos

- **Tipos Definidos:** Interfaces para `Empresa`, `ModalidadTrabajo`, `PuestoTrabajo`, `JobOfferViewModel` en `src/types/index.ts`.
- **Datos Mock:** Función `fetchJobOffers` en `src/lib/mock-data.ts` para simular la obtención de datos de ofertas.

## Estructura del Proyecto

El proyecto sigue la estructura recomendada para Next.js con el App Router:

```
/
├── public/                     # Assets estáticos
├── src/
│   ├── app/                    # Rutas de la aplicación (páginas y layouts)
│   │   ├── (default_layout)/   # Ejemplo: layout.tsx, page.tsx (homepage)
│   │   ├── jobs/
│   │   │   └── [id]/page.tsx   # Página de detalle de oferta
│   │   ├── login/page.tsx      # Página de inicio de sesión
│   │   ├── register/
│   │   │   ├── applicant/page.tsx # Página de registro de postulante
│   │   │   └── company/page.tsx   # Página de registro de empresa
│   │   └── layout.tsx          # Layout principal de la aplicación
│   ├── components/             # Componentes reutilizables de React
│   │   ├── auth/               # Componentes relacionados con autenticación (formularios)
│   │   ├── ui/                 # Componentes de Shadcn UI (auto-generados)
│   │   ├── job-offer-card.tsx
│   │   ├── job-offer-list.tsx
│   │   ├── navbar.tsx
│   │   └── search-bar.tsx
│   ├── lib/                    # Funciones de utilidad, datos mock
│   │   └── mock-data.ts
│   ├── types/                  # Definiciones de TypeScript
│   │   └── index.ts
├── .eslintrc.json              # Configuración de ESLint
├── .gitignore
├── .prettierrc.json            # Configuración de Prettier
├── .prettierignore
├── next.config.mjs             # Configuración de Next.js
├── package.json
├── postcss.config.js           # Configuración de PostCSS (para Tailwind)
├── tailwind.config.ts          # Configuración de Tailwind CSS
└── tsconfig.json               # Configuración de TypeScript
```

## Variables de Entorno

Actualmente, el proyecto no requiere variables de entorno (`.env`) ya que los datos son simulados. Si se integrara una base de datos real, se añadiría un archivo `.env.example`.

## Scripts Disponibles

En el archivo `package.json`, encontrarás los siguientes scripts:

- `npm run dev`: Inicia el servidor de desarrollo en `http://localhost:3000`.
- `npm run build`: Compila la aplicación para producción.
- `npm run start`: Inicia un servidor de producción (después de `build`).
- `npm run lint`: Ejecuta ESLint para analizar el código.
- `npm run format`: Formatea el código usando Prettier.
- `npm run check-format`: Verifica si el código está formateado correctamente.

## Getting Started

1.  **Clonar el repositorio:**

    ```bash
    git clone <url-del-repositorio>
    cd <nombre-del-directorio>
    ```

2.  **Instalar dependencias:**
    Asegúrate de tener Node.js (v18 o superior recomendado) y npm instalados.

    ```bash
    npm install
    ```

    Si encuentras problemas con dependencias de Shadcn UI relacionadas con React 19, puede ser necesario usar `--force` o ajustar las versiones según la documentación de Shadcn UI para React 19.

3.  **Ejecutar el servidor de desarrollo:**

    ```bash
    npm run dev
    ```

    Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Consideraciones y Próximos Pasos (Ejemplos)

- **Backend Real:** Integrar una base de datos real (SQLite, PostgreSQL, etc.) y desarrollar APIs para la gestión de usuarios, empresas y ofertas de empleo.
- **Autenticación Real:** Implementar un sistema de autenticación completo (ej. NextAuth.js).
- **Persistencia de Datos:** Conectar los formularios y acciones a la API del backend.
- **Mejoras en Filtros:** Optimizar el filtrado (ej. server-side filtering) si el volumen de datos crece.
- **Validación Avanzada:** Implementar validación más robusta con librerías como Zod.
- **Testing:** Añadir pruebas unitarias y de integración.

Este README proporciona una visión general del estado actual del proyecto.
