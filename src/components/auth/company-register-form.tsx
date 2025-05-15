"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner"; // Assuming sonner is used for notifications

interface CompanyRegisterFormProps {
  // Add any props if needed in the future, e.g., onRegisterSuccess callback
}

const CompanyRegisterForm: React.FC<CompanyRegisterFormProps> = () => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nit, setNit] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const validateForm = (): boolean => {
    setError(null);
    setPasswordError(null);

    if (!companyName.trim() || !email.trim() || !password.trim() || !nit.trim()) {
      setError(
        "Por favor, complete todos los campos obligatorios: Nombre de la empresa, Email, Contraseña y NIT."
      );
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Por favor, ingrese un correo electrónico válido.");
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden.");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }
    // Basic NIT validation (14 digits, optionally with hyphens)
    // This is a simple regex and might need adjustment for specific El Salvador formats.
    const nitPattern = /^[0-9]{4}-?[0-9]{6}-?[0-9]{3}-?[0-9]{1}$|^[0-9]{14}$/;
    if (!nitPattern.test(nit)) {
      setError(
        "Por favor, ingrese un NIT válido (ej: 0000-000000-000-0 o 00000000000000)."
      );
      return false;
    }

    return true;
  };

  const handleCompanyRegister = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setPasswordError(null);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Company Registration Data:", {
        companyName,
        email,
        // password, // Never log passwords in a real app
        nit,
        companyAddress,
        companyPhone,
      });
      toast.success("¡Registro de empresa exitoso!", {
        description: "Su cuenta ha sido creada. Ahora puede iniciar sesión.",
      });
      // Reset form fields after successful registration
      setCompanyName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setNit("");
      setCompanyAddress("");
      setCompanyPhone("");
      // Potentially redirect to login or a company dashboard
      // import { useRouter } from 'next/navigation';
      // const router = useRouter();
      // router.push('/login?role=company');
    } catch (err) {
      setError(
        "Error en el registro. Por favor, verifique sus datos e intente de nuevo."
      );
      toast.error(
        "Error en el registro. Por favor, verifique sus datos e intente de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Registrar Empresa / Recursos Humanos
        </CardTitle>
        <CardDescription>
          Cree una cuenta para su empresa y comience a publicar ofertas de
          empleo. Los campos marcados con <span className="text-red-500">*</span> son obligatorios.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleCompanyRegister}>
        <CardContent className="space-y-4">
          {error && (
            <p role="alert" className="text-red-500 text-sm font-medium p-3 bg-red-100 border border-red-300 rounded-md">
              {error}
            </p>
          )}

          <div className="space-y-2">
            <Label htmlFor="companyName">
              Nombre de la Empresa <span className="text-red-500">*</span>
            </Label>
            <Input
              id="companyName"
              type="text"
              placeholder="Ej: Innovatech Solutions S.A. de C.V."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              disabled={isLoading}
              aria-required="true"
              aria-describedby={error && error.includes("Nombre de la empresa") ? "companyName-error" : undefined}
            />
            {error && error.includes("Nombre de la empresa") && <p id="companyName-error" className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email de Contacto <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="correo@empresa.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              aria-required="true"
              aria-describedby={error && error.includes("correo electrónico válido") ? "email-error" : undefined}
            />
            {error && error.includes("correo electrónico válido") && <p id="email-error" className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nit">
              NIT (Número de Identificación Tributaria){" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="nit"
              type="text"
              placeholder="0000-000000-000-0"
              value={nit}
              onChange={(e) => setNit(e.target.value)}
              disabled={isLoading}
              aria-required="true"
              aria-describedby={error && error.includes("NIT válido") ? "nit-error" : undefined}
            />
            {error && error.includes("NIT válido") && <p id="nit-error" className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              Contraseña <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError(null);
                  if (error && (error.includes("Contraseña") || error.includes("contraseñas no coinciden"))) setError(null);
                }}
                disabled={isLoading}
                aria-required="true"
                className={passwordError || (error && error.includes("Contraseña")) ? "border-red-500" : ""}
                aria-describedby={passwordError ? "password-error-message" : (error && error.includes("Contraseña") ? "form-error-message" : undefined)}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-1/2 -translate-y-1/2 h-auto px-3 py-2 hover:bg-transparent"
                onClick={toggleShowPassword}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                tabIndex={-1} 
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
             {/* Individual password field error handled by passwordError */}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              Confirmar Contraseña <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repita su contraseña"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (passwordError) setPasswordError(null);
                   if (error && error.includes("contraseñas no coinciden")) setError(null);
                }}
                disabled={isLoading}
                aria-required="true"
                className={passwordError ? "border-red-500" : ""}
                aria-describedby={passwordError ? "password-error-message" : undefined}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-1/2 -translate-y-1/2 h-auto px-3 py-2 hover:bg-transparent"
                onClick={toggleShowConfirmPassword}
                aria-label={
                  showConfirmPassword
                    ? "Ocultar confirmación de contraseña"
                    : "Mostrar confirmación de contraseña"
                }
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {passwordError && (
              <p id="password-error-message" role="alert" className="text-red-500 text-sm">{passwordError}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyAddress">
              Dirección de la Empresa (Opcional)
            </Label>
            <Input
              id="companyAddress"
              type="text"
              placeholder="Ej: Calle La Mascota, San Salvador"
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyPhone">
              Teléfono de Contacto (Opcional)
            </Label>
            <Input
              id="companyPhone"
              type="tel"
              placeholder="Ej: +503 2222-2222"
              value={companyPhone}
              onChange={(e) => setCompanyPhone(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading} aria-live="polite">
            {isLoading ? "Registrando..." : "Crear Cuenta de Empresa"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CompanyRegisterForm; 