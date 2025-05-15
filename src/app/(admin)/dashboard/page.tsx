import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function AdminDashboardPage() {
  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
          <CardDescription>
            Bienvenido al panel de administración de la Bolsa de Empleo UES.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Desde aquí podrás gestionar las ofertas de trabajo, visualizar
            estadísticas (próximamente), y administrar otros aspectos de la
            plataforma.
          </p>
          <p className='mt-4'>
            Utiliza la barra de navegación lateral para acceder a las diferentes
            secciones.
          </p>
        </CardContent>
      </Card>

      {/* Placeholder for future widgets or stats */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <CardHeader>
            <CardTitle>Ofertas Activas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>0</p> {/* Placeholder value */}
            <p className='text-muted-foreground text-xs'>
              Total de ofertas de trabajo publicadas.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Nuevos Postulantes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>0</p> {/* Placeholder value */}
            <p className='text-muted-foreground text-xs'>
              Registrados en la última semana.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Empresas Registradas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>0</p> {/* Placeholder value */}
            <p className='text-muted-foreground text-xs'>
              Total de empresas en la plataforma.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
