import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import useCustomAxios from '@/app/services/CustomAxios';

const EventManager = ({ touristSpotId }) => {
  const { request } = useCustomAxios();
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(false);  // Estado para el botón

  // Ref para el formulario
  const formRef = useRef(null);

  // Validación con Yup
  const validationSchema = Yup.object().shape({
    eventName: Yup.string().required("El nombre del evento es obligatorio."),
    eventDescription: Yup.string().required("La descripción del evento es obligatoria."),
    eventDate: Yup.date()
      .nullable()
      .transform((value, originalValue) => originalValue === "" ? null : value)
      .required("La fecha del evento es obligatoria.")
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      eventName: '',
      eventDescription: '',
      eventDate: '',
    }
  });

  const fetchEvents = async () => {
    try {
      const response = await request('get', `/event-spots/?tourist_spot=${touristSpotId}`);
      setEvents(response.results);
    } catch (error) {
      toast.error(`Error al cargar eventos: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [touristSpotId]);

  const submitEvent = async (data) => {
    setLoading(true);
    const eventDate = new Date(data.eventDate).toISOString().split('T')[0];

    const payload = {
      name: data.eventName,
      description: data.eventDescription,
      date: eventDate,
      tourist_spot: touristSpotId,
    };

    try {
      if (editingEvent) {
        await request('put', `/event-spots/${editingEvent.id}/`, payload);
        toast.success("Evento actualizado exitosamente.");
      } else {
        await request('post', '/event-spots/', payload);
        toast.success("Evento creado exitosamente.");
      }

      reset({
        eventName: '',
        eventDescription: '',
        eventDate: '',
      });
      setEditingEvent(null); // Limpiar el evento en edición
      fetchEvents(); // Recargar los eventos
    } catch (error) {
      toast.error(`Error al guardar evento: ${error.message}`);
    } finally {
      setLoading(false); // Desactivar estado de carga
    }
  };

  const handleEdit = (event) => {
    reset({
      eventName: event.name,
      eventDescription: event.description,
      eventDate: event.date,
    });
    setEditingEvent(event);

    // Mover el scroll al formulario
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const cancelEdit = () => {
    reset({
      eventName: '',
      eventDescription: '',
      eventDate: '',
    });
    setEditingEvent(null); 
  };

  const deleteEvent = async (eventId) => {
    try {
      await request('delete', `/event-spots/${eventId}/`);
      toast.success("Evento eliminado exitosamente.");
      fetchEvents();
    } catch (error) {
      toast.error(`Error al eliminar evento: ${error.message}`);
    }
  };

  return (
    <div className="mt-5">
      <h2 className="text-2xl font-semibold mb-6">Eventos para el Tourist Spot</h2>

      {/* Formulario con referencia */}
      <form ref={formRef} onSubmit={handleSubmit(submitEvent)} className="mb-8 space-y-6">
        <h3 className="text-xl font-semibold mb-4">{editingEvent ? "Editar Evento" : "Crear Evento"}</h3>

        <div className="space-y-2">
          <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">Nombre del Evento</label>
          <input
            id="eventName"
            type="text"
            placeholder="Nombre del Evento"
            {...register('eventName')}
            className={`border border-gray-300 rounded p-2 w-full focus:ring-primary-500 focus:border-primary-500`}
          />
          {errors.eventName && <span className="text-red-500 text-[11px]">{errors.eventName.message}</span>}
        </div>

        <div className="space-y-2">
          <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700">Descripción del Evento</label>
          <textarea
            id="eventDescription"
            placeholder="Descripción del Evento"
            {...register('eventDescription')}
            className={`border border-gray-300 rounded p-2 w-full h-24 focus:ring-primary-500 focus:border-primary-500 `}
          />
          {errors.eventDescription && <span className="text-red-500 text-[11px]">{errors.eventDescription.message}</span>}
        </div>

        <div className="space-y-2">
          <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">Fecha del Evento</label>
          <input
            id="eventDate"
            type="date"
            {...register('eventDate')}
            className={`border border-gray-300 rounded p-2 w-full focus:ring-primary-500 focus:border-primary-500 `}
          />
          {errors.eventDate && <span className="text-red-500 text-[11px]">{errors.eventDate.message}</span>}
        </div>

        <div className="flex justify-between">
          <button type="submit" disabled={loading} className="w-full h-12 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded">
            {loading ? "Cargando..." :(editingEvent ? "Actualizar Evento" : "Crear Evento")}
          </button>
          {editingEvent && (
            <button type="button" onClick={cancelEdit} className="w-full h-12 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded ml-4">
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h3 className="text-xl font-semibold mb-4">Lista de Eventos</h3>
      <ul className="divide-y divide-gray-200">
        {events.map((event) => (
          <li key={event.id} className="py-4 flex justify-between items-center">
            <div>
              <h4 className="text-lg font-bold">{event.name}</h4>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-gray-400">{new Date(event.date).toLocaleDateString()}</p>
            </div>
            <div className="flex space-x-4">
              <button onClick={() => handleEdit(event)} className="text-blue-500 hover:underline">
                Editar
              </button>
              <button onClick={() => deleteEvent(event.id)} className="text-red-500 hover:underline">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventManager;
