import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const useCustomAxios = (customConfig = {}) => {
  const { data: session, status } = useSession();

  const defaultConfig = {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      'Content-Type': 'application/json',
    }, 
    
  };

  const CustomAxios = axios.create({
    ...defaultConfig,
    ...customConfig,
  });

  // Configura el interceptor de solicitud
  useEffect(() => {
    const requestInterceptor = CustomAxios.interceptors.request.use(
      (config) => {
        if (status === 'authenticated' && session?.accessToken) {
          config.headers['Authorization'] = `Bearer ${session.accessToken}`;
        }
        return config;
      },
      (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Configura el interceptor de respuesta
    const responseInterceptor = CustomAxios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('Response Error:', error);
        if (error.response && error.response.status === 401) {
          // Maneja la redirección aquí
        }
        return Promise.reject(error);
      }
    );

    // Limpia los interceptores al desmontar
    return () => {
      CustomAxios.interceptors.request.eject(requestInterceptor);
      CustomAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [CustomAxios, session, status]);

  const request = async (method, url, data = null, config = {}) => {
    try {
      const response = await CustomAxios[method](url, data, config);
      return response.data;
    } catch (error) {
      console.error('Request Error:', error);
      throw error; // Lanzar el error para manejarlo en el componente
    }
  };

  return { request };
};

export default useCustomAxios;
