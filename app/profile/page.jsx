"use client";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PencilIcon } from '@heroicons/react/24/outline';
import useCustomAxios from '../services/CustomAxios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const ProfileForm = () => {
  const { request } = useCustomAxios();
  const { status } = useSession();
  const router = useRouter();
  const [initialData, setInitialData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('El nombre es requerido'),
    last_name: Yup.string().required('El apellido es requerido'),
    email: Yup.string().email('Email inválido').required('El email es requerido'),
    phone_number: Yup.string().required('El número de teléfono es requerido'),
    img_profile: Yup.mixed().nullable()
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Cargar los datos del usuario del backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (status === 'authenticated') {
          const response = await request('get', `/auth/users/me/`);
          console.log('User data from API:', response);

          // Cargar los datos del usuario
          const formData = {
            first_name: response.first_name || '',
            last_name: response.last_name || '',
            email: response.email || '',
            phone_number: response.phone_number || '',
            img_profile: response.img_profile || null,
          };

          console.log('Form data prepared for reset:', formData);
          setSelectedImage(response.img_profile); // Cambiado a obtener la URL de la imagen
          reset(formData);
          setInitialData(response);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [reset, status]);

  const onFormSubmit = async (data) => {
    console.log('onFormSubmit called');
    console.log('Submitted data:', data);

    // Crear un objeto FormData
    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('email', data.email);
    formData.append('phone_number', data.phone_number);

    // Solo agregar la imagen seleccionada si está presente
    if (selectedImage && selectedImage instanceof File) {
      formData.append('img_profile', selectedImage);
    }

    try {
      const response = await request('patch', `/users/accounts/${initialData.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response from API:', response);
      toast.success('Usuario actualizado correctamente');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error al actualizar:', error.response?.data || error.message);
      toast.error('Error al actualizar el usuario');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Almacenar el archivo directamente
    }
  };

  console.log(errors);

  if (!initialData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <Skeleton height={50} count={4} />
          <div className="flex justify-between mt-4">
            <Skeleton height={40} width={100} /> 
            <Skeleton height={40} width={100} /> 
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button className="flex items-center justify-center w-24 h-24 rounded-full border-2 border-gray-300 shadow-lg">
                {selectedImage ? (
                  <img
                    src={selectedImage instanceof File ? URL.createObjectURL(selectedImage) : selectedImage} // Crear un objeto URL para mostrar la imagen
                    alt="Imagen de perfil"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <PencilIcon className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
          {/* Campo de Nombre */}
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              id="first_name"
              name="first_name"
              {...register('first_name')}
              className={`mt-1 block w-full rounded-md border ${errors.first_name ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm`}
            />
            {errors.first_name && <p className="text-red-500 text-xs">{errors.first_name.message}</p>}
          </div>

          {/* Campo de Apellido */}
          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
              id="last_name"
              name="last_name"
              {...register('last_name')}
              className={`mt-1 block w-full rounded-md border ${errors.last_name ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm`}
            />
            {errors.last_name && <p className="text-red-500 text-xs">{errors.last_name.message}</p>}
          </div>

          {/* Campo de Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              {...register('email')}
              className={`mt-1 block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm`}
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          {/* Campo de Número de Teléfono */}
          <div>
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
              Número de Teléfono
            </label>
            <input
              id="phone_number"
              name="phone_number"
              {...register('phone_number')}
              className={`mt-1 block w-full rounded-md border ${errors.phone_number ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm`}
            />
            {errors.phone_number && <p className="text-red-500 text-xs">{errors.phone_number.message}</p>}
          </div>

          <div className="flex justify-between mt-4">
            <Link
              href="/dashboard"
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-offset-2"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-600"
            >
              Guardar Cambios
            </button>

          </div>
        </form>
        <div className="mt-4">
          <Link
            href="/cambiar-contraseña" // Cambia esta ruta a la que necesites
            className="text-blue-600 hover:underline"
          >
            Cambiar Contraseña
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
