'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ExclamationTriangleIcon, PencilIcon, PlusIcon } from '@heroicons/react/24/outline';

const ActivityFormModal = ({ isOpen, closeModal, onSubmit, initialData }) => {
  if (typeof closeModal !== 'function') {
    console.error('closeModal is not a function');
    return null;
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    description: Yup.string().required('La descripción es requerida'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (isOpen) {
      reset(initialData || { name: '', description: '' });
    }
  }, [isOpen, initialData, reset]);

  const onFormSubmit = (data) => {
    console.log('Submitted data:', data); // Agregado para depuración
    onSubmit(data);
    closeModal();
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
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
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
              <div className="sm:flex sm:items-start">
                <div
                  className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                    initialData ? 'bg-blue-100' : 'bg-green-100'
                  } sm:mx-0 sm:h-10 sm:w-10`}
                >
                  {initialData ? (
                    <PencilIcon aria-hidden="true" className="h-6 w-6 text-blue-600" />
                  ) : (
                    <PlusIcon aria-hidden="true" className="h-6 w-6 text-green-600" />
                  )}
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {initialData ? 'Editar Actividad' : 'Crear Actividad'}
                  </Dialog.Title>
                </div>
              </div>

              <form onSubmit={handleSubmit(onFormSubmit)} className="mt-4">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <input
                    id="name"
                    name="name"
                    {...register('name')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                  {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>

                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    {...register('description')}
                    className="mt-1 h-48 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs">{errors.description.message}</p>
                  )}
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-offset-2"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="ml-2 w-full inline-flex justify-center rounded-md border border-transparent bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    {initialData ? 'Actualizar' : 'Crear'}
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition>
        </div>
      </div>
    </Dialog>
  );
};

export default ActivityFormModal;
