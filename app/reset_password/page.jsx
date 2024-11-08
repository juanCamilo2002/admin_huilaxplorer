"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useCustomAxios from '../services/CustomAxios';

const ResetPassword = () => {
    const { request } = useCustomAxios();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Estado de "Cargando..."
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setIsLoading(true); // Iniciar "Cargando..."

        try {
            // Enviar solicitud para restablecer la contraseña
            await request('post', '/auth/reset-password/', {
                phone_number: phoneNumber,
                code: code,
                new_password: newPassword,
                re_new_password: confirmPassword,
            });

            // Si la solicitud es exitosa, mostrar mensaje de éxito
            setMessage("Contraseña cambiada exitosamente.");
            setError('');
            setIsLoading(false); // Terminar "Cargando..."

            // Redirigir a la vista de login después de un pequeño retraso
            setTimeout(() => {
                router.push('/login'); // Reemplaza '/login' con la ruta del formulario de inicio de sesión
            }, 1000);
        } catch (err) {
            // Manejo de errores: mostrar mensaje en caso de fallo
            setError("Hubo un problema al restablecer la contraseña. Inténtalo de nuevo.");
            setMessage('');
            setIsLoading(false); // Terminar "Cargando..." en caso de error
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-center mb-6">
              <img src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" className="h-10" />
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-800">Restablecer Contraseña</h2>
            <p className="text-sm text-center text-gray-500">Ingresa el código de verificación, tu número de celular y la nueva contraseña</p>
    
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
                <label
                  htmlFor="code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Código de Verificación
                </label>
                <div className="mt-2">
                  <input
                    id="code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="block w-full rounded-md border border-green-600 py-2 px-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nueva Contraseña
                </label>
                <div className="mt-2">
                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="block w-full rounded-md border border-green-600 py-2 px-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirmar Contraseña
                </label>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                  {isLoading ? 'Cargando...' : 'Ingresar Nueva Contraseña'} {/* Texto dinámico */}
                </button>
              </div>
    
              {message && <p className="text-green-600 text-center text-sm">{message}</p>}
              {error && <p className="text-red-600 text-center text-sm">{error}</p>}
            </form>
          </div>
        </div>
    );
};

export default ResetPassword;

