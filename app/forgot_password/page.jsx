"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useCustomAxios from '../services/CustomAxios';
import Link from 'next/link';

const ForgotPassword = () => {
  const { request } = useCustomAxios();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado de "Cargando..."
  const router = useRouter();

  const handleSubmit = async (e) => {
      e.preventDefault(); // Evitar la recarga de la página
      setIsLoading(true); // Iniciar "Cargando..."

      try {
          // Enviar solicitud para enviar el código de restablecimiento de contraseña
          await request('post', '/auth/send-reset-password-code/', { phone_number: phoneNumber });
          
          // Si la solicitud es exitosa, mostrar mensaje de éxito
          setMessage('Código enviado al número de celular proporcionado.');
          setError(''); // Limpiar errores previos
          setIsLoading(false); // Terminar "Cargando..."

          // Redirigir a la vista de verificación después de un pequeño retraso (opcional)
          setTimeout(() => {
              router.push('/reset_password'); // Reemplaza '/reset_password' con la ruta deseada
          }, 1000);
      } catch (err) {
          // Manejo de errores: mostrar mensaje en caso de fallo
          setError('Hubo un problema al enviar el código. Inténtalo de nuevo.');
          setMessage(''); // Limpiar mensajes previos
          setIsLoading(false); // Terminar "Cargando..." en caso de error
      }
  };

  return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-center mb-6">
            <img src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" className="h-10" />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800">Recuperar Contraseña</h2>
          <p className="text-sm text-center text-gray-500">Ingresa tu número de celular para recuperar tu cuenta</p>
  
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Número de Celular
              </label>
              <div className="mt-2">
                <input
                  id="phoneNumber"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="block w-full rounded-md border border-green-600 py-2 px-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
  
            <div>
              <button
                type="submit"
                disabled={isLoading} // Deshabilitar mientras está cargando
                className={`w-full py-2 px-4 text-sm font-semibold text-white rounded-md ${isLoading ? 'bg-gray-500' : 'bg-green-600'} ${isLoading ? '' : 'hover:bg-green-500'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
              >
                {isLoading ? 'Cargando...' : 'Enviar Código'} {/* Texto dinámico */}
              </button>
            </div>
  
            {message && <p className="text-green-600 text-center text-sm">{message}</p>}
            {error && <p className="text-red-600 text-center text-sm">{error}</p>}
          </form>
        </div>
      </div>
  );
};

export default ForgotPassword;
