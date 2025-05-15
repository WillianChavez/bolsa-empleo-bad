'use client';

import { useState } from 'react';
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
import { Eye, EyeOff, LogIn } from 'lucide-react';

// Placeholder for actual authentication logic
const handleLogin = async (email?: string, password?: string) => {
  console.log('Attempting login with:', { email, password });
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@example.com" && password === "password") {
        resolve({ success: true, message: "Login successful!", user: { name: "Test User", email } });
      } else {
        reject({ success: false, message: "Correo electrónico o contraseña incorrectos." });
      }
    }, 1000);
  });
};

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      // In a real app, replace with your actual authentication call
      const response = await handleLogin(email, password);
      console.log('Login response:', response);
      // TODO: Handle successful login (e.g., redirect, update auth context)
      alert('¡Inicio de sesión exitoso! (Simulado)'); // Placeholder
    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">Iniciar Sesión</CardTitle>
        <CardDescription>
          Ingresa tu correo electrónico y contraseña para acceder.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              autoComplete="email"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                {/* Optional: Link to forgot password page */}
                {/* <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">¿Olvidaste tu contraseña?</Link> */}
            </div>
            <div className="relative">
                <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="current-password"
                />
                <Button 
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 hover:text-gray-700"
                    onClick={toggleShowPassword}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    disabled={isLoading}
                >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Ingresando...
              </>
            ) : (
              <><LogIn className="mr-2 h-5 w-5" /> Ingresar</>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2 pt-4 text-sm">
        {/* Optional: Link to registration page */}
        {/* <p className="text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link href="/register" className="font-medium text-blue-600 hover:underline">
            Regístrate
          </Link>
        </p> */}
      </CardFooter>
    </Card>
  );
}; 