"use client";

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';

const UserFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  // Esquema de validación con Yup para creación
  const createValidationSchema = Yup.object().shape({
    first_name: Yup.string().required('El nombre es requerido'),
    last_name: Yup.string().required('El apellido es requerido'),
    email: Yup.string().email('Debe ser un email válido').required('El email es requerido'),
    phone_number: Yup.string().optional(),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('La contraseña es requerida'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('La confirmación de contraseña es requerida'),
    is_staff: Yup.boolean().required(),
  });

  // Esquema de validación con Yup para edición
  const editValidationSchema = Yup.object().shape({
    first_name: Yup.string().required('El nombre es requerido'),
    last_name: Yup.string().required('El apellido es requerido'),
    email: Yup.string().email('Debe ser un email válido').required('El email es requerido'),
    phone_number: Yup.string().optional(),
    is_staff: Yup.boolean().required(),
  });

  // Formulario para crear usuario
  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    formState: { errors: errorsCreate },
    reset: resetCreate,
  } = useForm({
    resolver: yupResolver(createValidationSchema),
  });

  // Formulario para editar usuario
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit },
    reset: resetEdit,
  } = useForm({
    resolver: yupResolver(editValidationSchema),
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        resetEdit(initialData);
      } else {
        resetCreate({
          first_name: '',
          last_name: '',
          email: '',
          phone_number: '',
          is_staff: false,
        });
      }
    }
  }, [isOpen, initialData, resetCreate, resetEdit]);

  const onCreateSubmit = (data) => {
    onSubmit(data);
    onClose();
  };

  const onEditSubmit = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <Transition
        show={isOpen}
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="fixed inset-0 bg-black bg-opacity-30" />
      </Transition>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full p-4 text-center">
          <Transition
            show={isOpen}
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
              <div className="sm:flex sm:items-start">
                <div
                  className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${initialData ? 'bg-blue-100' : 'bg-green-100'} sm:mx-0 sm:h-10 sm:w-10`}
                >
                  {initialData ? (
                    <PencilIcon aria-hidden="true" className="h-6 w-6 text-blue-600" />
                  ) : (
                    <PlusIcon aria-hidden="true" className="h-6 w-6 text-green-600" />
                  )}
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {initialData ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
                  </Dialog.Title>
                </div>
              </div>

              {/* Formulario para Crear Usuario */}
              {!initialData ? (
                <form onSubmit={handleSubmitCreate(onCreateSubmit)} className="mt-4">
                  {/* Nombre */}
                  <div className="mb-4">
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                      Nombre
                    </label>
                    <input
                      id="first_name"
                      {...registerCreate('first_name')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                    {errorsCreate.first_name && <p className="text-red-500 text-xs">{errorsCreate.first_name.message}</p>}
                  </div>

                  {/* Apellido */}
                  <div className="mb-4">
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                      Apellido
                    </label>
                    <input
                      id="last_name"
                      {...registerCreate('last_name')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                    {errorsCreate.last_name && <p className="text-red-500 text-xs">{errorsCreate.last_name.message}</p>}
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      id="email"
                      {...registerCreate('email')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                    {errorsCreate.email && <p className="text-red-500 text-xs">{errorsCreate.email.message}</p>}
                  </div>

                  {/* Teléfono */}
                  <div className="mb-4">
                    <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                      Teléfono
                    </label>
                    <input
                      id="phone_number"
                      {...registerCreate('phone_number')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                    {errorsCreate.phone_number && <p className="text-red-500 text-xs">{errorsCreate.phone_number.message}</p>}
                  </div>

                  {/* Contraseña */}
                  <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Contraseña
                    </label>
                    <input
                      id="password"
                      type="password"
                      {...registerCreate('password')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                    {errorsCreate.password && <p className="text-red-500 text-xs">{errorsCreate.password.message}</p>}
                  </div>

                  {/* Confirmar Contraseña */}
                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirmar Contraseña
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      {...registerCreate('confirmPassword')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                    {errorsCreate.confirmPassword && <p className="text-red-500 text-xs">{errorsCreate.confirmPassword.message}</p>}
                  </div>

                  {/* Rol - Staff (Checkbox) */}
                  <div className="mb-4">
                    <label htmlFor="is_staff" className="block text-sm font-medium text-gray-700">
                      ¿Es Staff?
                    </label>
                    <input
                      id="is_staff"
                      type="checkbox"
                      {...registerCreate('is_staff')}
                      className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    {errorsCreate.is_staff && <p className="text-red-500 text-xs">{errorsCreate.is_staff.message}</p>}
                  </div>

                  {/* Botón para Crear Usuario */}
                  <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-offset-2"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="ml-2 w-full inline-flex justify-center rounded-md border border-transparent bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    Crear
                  </button>
                </div>
                </form>
              ) : (
                // Formulario para Editar Usuario
                <form onSubmit={handleSubmitEdit(onEditSubmit)} className="mt-4">
                  {/* Nombre */}
                  <div className="mb-4">
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                      Nombre
                    </label>
                    <input
                      id="first_name"
                      {...registerEdit('first_name')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                    {errorsEdit.first_name && <p className="text-red-500 text-xs">{errorsEdit.first_name.message}</p>}
                  </div>

                  {/* Apellido */}
                  <div className="mb-4">
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                      Apellido
                    </label>
                    <input
                      id="last_name"
                      {...registerEdit('last_name')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                    {errorsEdit.last_name && <p className="text-red-500 text-xs">{errorsEdit.last_name.message}</p>}
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      id="email"
                      {...registerEdit('email')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                    {errorsEdit.email && <p className="text-red-500 text-xs">{errorsEdit.email.message}</p>}
                  </div>

                  {/* Teléfono */}
                  <div className="mb-4">
                    <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                      Teléfono
                    </label>
                    <input
                      id="phone_number"
                      {...registerEdit('phone_number')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                    {errorsEdit.phone_number && <p className="text-red-500 text-xs">{errorsEdit.phone_number.message}</p>}
                  </div>

                  {/* Rol - Staff (Checkbox) */}
                  <div className="mb-4">
                    <label htmlFor="is_staff" className="block text-sm font-medium text-gray-700">
                      ¿Es Staff?
                    </label>
                    <input
                      id="is_staff"
                      type="checkbox"
                      {...registerEdit('is_staff')}
                      className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    {errorsEdit.is_staff && <p className="text-red-500 text-xs">{errorsEdit.is_staff.message}</p>}
                  </div>

                  {/* Botón para Editar Usuario */}
                  <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-offset-2"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="ml-2 w-full inline-flex justify-center rounded-md border border-transparent bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                   Actualizar
                  </button>
                </div>
                </form>
              )}
            </Dialog.Panel>
          </Transition>
        </div>
      </div>
    </Dialog>
  );
};

export default UserFormModal;
