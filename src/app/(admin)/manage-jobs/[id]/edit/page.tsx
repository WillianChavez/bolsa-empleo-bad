"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { JobOfferForm } from "../../_components/job-offer-form"; // Adjusted path
import type { JobOfferFormValues } from "@/lib/validators/job-offer-validator";
import { fetchJobOfferById } from "@/lib/mock-data"; // Changed from fetchJobOffers
import type { JobOfferViewModel } from "@/types";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditJobOfferPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id ? parseInt(params.id as string, 10) : null;

  const [jobOffer, setJobOffer] = useState<JobOfferViewModel | null | undefined>(
    undefined // undefined for loading, null for not found
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (jobId === null) {
      setJobOffer(null);
      setIsLoadingData(false);
      return;
    }

    const loadJobOffer = async () => {
      setIsLoadingData(true);
      try {
        const foundOffer = await fetchJobOfferById(jobId); // fetchJobOfferById already uses id_puesto
        if (foundOffer) {
          setJobOffer(foundOffer);
        } else {
          setJobOffer(null);
          toast.error("Oferta no encontrada", {
            description: `No se pudo encontrar la oferta con ID: ${jobId}.`,
          });
        }
      } catch (error) {
        console.error("Failed to fetch job offer:", error);
        setJobOffer(null);
        toast.error("Error al cargar la oferta", {
          description: "No se pudieron cargar los datos de la oferta para editar.",
        });
      }
      setIsLoadingData(false);
    };

    loadJobOffer();
  }, [jobId]);

  const handleUpdateJobOffer = async (values: JobOfferFormValues) => {
    setIsSubmitting(true);
    console.log(`Updating job offer ID: ${jobId} with values:`, values);

    // TODO: Implement actual API call to update the job offer
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const success = Math.random() > 0.1; // Simulate 90% success rate
    setIsSubmitting(false);

    if (success) {
      toast.success("¡Oferta de trabajo actualizada!", {
        description: `La oferta "${values.nombre_puesto}" ha sido guardada.`,
      });
      router.push("/manage-jobs");
    } else {
      toast.error("Error al actualizar la oferta", {
        description: "Hubo un problema al guardar los cambios. Por favor, inténtalo de nuevo.",
      });
    }
  };

  if (isLoadingData) {
    return (
      <div className="space-y-6">
         <Button variant="outline" asChild size="sm" className="mb-4 opacity-50" disabled>
            <Link href="/manage-jobs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Gestión de Ofertas
            </Link>
        </Button>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-1" />
          </CardHeader>
          <CardContent className="space-y-8 pt-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
            <Skeleton className="h-10 w-32 mt-4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!jobOffer) {
    // This case is mostly handled by toast and redirect if ID was invalid, but as a fallback:
    return (
      <div className="space-y-6">
         <Button variant="outline" asChild size="sm" className="mb-4">
            <Link href="/manage-jobs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Gestión de Ofertas
            </Link>
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Oferta no encontrada</h1>
        <p className="text-muted-foreground">
          La oferta de trabajo que intentas editar no existe o no pudo ser cargada.
        </p>
      </div>
    );
  }

  // Prepare initialData for the form by mapping JobOfferViewModel to JobOfferFormValues
  const initialFormValues: Partial<JobOfferFormValues> = {
    nombre_puesto: jobOffer.nombre_puesto,
    descripcion_corta: jobOffer.descripcion_corta,
    descripcion_larga: jobOffer.descripcion_larga || "",
    requisitos: jobOffer.requisitos || "",
    conocimientos_requeridos: jobOffer.conocimientos_requeridos || "",
    habilidades_requeridas: jobOffer.habilidades_requeridas || "",
    experiencia_requerida: jobOffer.experiencia_requerida || "",
    perfil_academico: jobOffer.perfil_academico || "",
    ubicacion: jobOffer.ubicacion || "",
    nombre_empresa: jobOffer.empresa.nombre_empresa,
    id_modalidad_trabajo: String(jobOffer.modalidad_trabajo.id_modalidad),
    rango_salarial: jobOffer.rango_salarial === null || jobOffer.rango_salarial === undefined ? "" : jobOffer.rango_salarial,
    fecha_limite_aplicacion: jobOffer.fecha_limite_aplicacion ? new Date(jobOffer.fecha_limite_aplicacion) : undefined,
    estado_oferta: jobOffer.estado_oferta || "Borrador",
  };

  return (
    <div className="space-y-6">
      <div>
        <Button variant="outline" asChild size="sm" className="mb-4">
            <Link href="/admin/manage-jobs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Gestión de Ofertas
            </Link>
        </Button>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Editar Oferta de Trabajo: <span className="text-blue-600">{jobOffer.nombre_puesto}</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Modifica los detalles de la oferta laboral.
        </p>
      </div>
      <JobOfferForm
        onSubmit={handleUpdateJobOffer}
        initialData={initialFormValues} // Pass the prepared initial data
        isLoading={isSubmitting}
        submitButtonText={isSubmitting ? "Guardando Cambios..." : "Actualizar Oferta"}
      />
    </div>
  );
} 