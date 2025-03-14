"use client";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { loginSchema } from "./validationSchema";
import { toast } from "react-toastify";
import Link from 'next/link';

const FormLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Estado para gestionar "Cargando..."
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoginError(null);
    setIsLoading(true); // Iniciar "Cargando..."

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    setIsLoading(false); // Terminar "Cargando..."

    if (result.error) {
      toast.error("Credenciales inválidas");
      toast.warning("Usuario no autorizado");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Correo Electrónico
        </label>
        <div className="mt-2">
          <input
            id="email"
            type="email"
            {...register("email")}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
          />
          {errors.email && <p className="text-red-500 text-[12px]">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Contraseña
          </label>
          <div className="text-sm">
            <Link href="/forgot_password" className="font-semibold text-primary-600 hover:text-primary-500">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>
        <div className="mt-2">
          <input
            id="password"
            type="password"
            {...register("password")}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-primary-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
          />
          {errors.password && <p className="text-red-500 text-[12px]">{errors.password.message}</p>}
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading} // Deshabilitar mientras está cargando
          className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${isLoading ? 'bg-gray-500' : 'bg-primary-600'} ${isLoading ? '' : 'hover:bg-primary-500'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        >
          {isLoading ? 'Cargando...' : 'Iniciar Sesión'} {/* Texto dinámico */}
        </button>
      </div>
    </form>
  );
};

export default FormLogin;
