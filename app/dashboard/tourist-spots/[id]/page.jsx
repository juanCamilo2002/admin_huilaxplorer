'use client'

import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import useCustomAxios from '@/app/services/CustomAxios';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getInitials = (firstName, lastName) => {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  return initials;
};

const TouristSpotComponent = ({ params }) => {
  const { id } = params;
  const { request } = useCustomAxios();
  const [touristSpot, setTouristSpot] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    const fetchTouristSpot = async () => {
      const response = await request('get', `/tourist-spots/${id}/`);
      setTouristSpot(response);
    };

    const fetchReviews = async () => {
      const response = await request('get', `/reviews/?tourist_spot=${id}`);
      setReviews(response.results);
      setLoadingReviews(false);
    };
    const fetchEvents = async () => {
      const response = await request('get', `/event-spots/?tourist_spot=${id}`);
      setEvents(response.results);
      setLoadingEvents(false);
    };

    fetchTouristSpot();
    fetchReviews();
    fetchEvents();
  }, [id]);

  if (!touristSpot) {
    return (
      <div className="bg-white">
        <div className="pt-6">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb">
            <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <li className="text-sm">
                <Skeleton width={100} />
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg border-b border-gray-200">
                <Skeleton height="100%" />
              </div>
            ))}
          </div>

          {/* Tourist Spot info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <Skeleton height={30} width={200} />
              <Skeleton count={3} className="mt-4" />
              <Skeleton height={20} className="mt-4" />
              <h2 className="mt-6 text-lg font-semibold">
                <Skeleton width={100} />
              </h2>
              <ul className="mt-2 space-y-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <li key={index} className="text-gray-700">
                    <Skeleton width="80%" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <li className="text-sm">
              <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {touristSpot.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          {touristSpot.images.map((image) => (
            <div key={image.id} className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg border-b border-gray-200">
              <img
                alt={image.caption}
                src={image.image}
                className="h-full w-full object-cover object-center"
              />
            </div>
          ))}
        </div>

        {/* Tourist Spot info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{touristSpot.name}</h1>
            <p className="mt-4 text-sm text-gray-600">{touristSpot.description}</p>
            <p className="mt-4 text-sm text-gray-600">
              Ubicación: {touristSpot.location.name} (Lat: {touristSpot.latitude}, Lon: {touristSpot.longitude})
            </p>
            <h2 className="mt-6 text-lg font-semibold">Actividades</h2>
            <ul className="mt-2 space-y-2">
              {touristSpot.activities.map(activity => (
                <li key={activity.id} className="text-gray-700">
                  <strong>{activity.name}</strong>: {activity.description}
                </li>
              ))}
            </ul>

            {/* Nueva sección de Eventos */}
            <h2 className="mt-6 text-lg font-semibold">Eventos</h2>
            {events && events.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {events.map(event => (
                  <li key={event.id} className="text-gray-700">
                    <strong>{event.name}</strong>: {event.description} - <span className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No hay eventos programados.</p>
            )}
          </div>
        </div>

        {/* Sección de Reseñas */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="mt-6 text-lg font-semibold">Reseñas</h2>
          {loadingReviews ? (
            <Skeleton count={3} className="mt-4" /> // Cargando reseñas
          ) : (
            reviews.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {reviews.map((review) => (
                  <li key={review.id} className="border-b border-gray-200 pb-2 mb-2 flex items-start">
                    {review.user.img_profile ? (
                      <img
                        src={review.user.img_profile}
                        alt={`${review.user.first_name} ${review.user.last_name}`}
                        className="h-10 w-10 rounded-full mr-3"
                      />
                    ) : (
                      <div
                        className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mr-3"
                        style={{ backgroundColor: getRandomColor() }}
                      >
                        <span className="text-white font-bold">
                          {getInitials(review.user.first_name, review.user.last_name)}
                        </span>
                      </div>
                    )}
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{review.user.first_name} {review.user.last_name}</span>
                        <span className="text-sm text-gray-500">{review.rating} ⭐</span>
                      </div>
                      <p className="mt-1 text-gray-600">{review.comment}</p>
                      {/* Fecha de creación de la reseña */}
                      <p className="mt-1 text-xs text-gray-500">{new Date(review.created_at).toLocaleDateString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No hay reseñas aún.</p>
            )
          )}
        </div>

      </div>
    </div>
  );
};

export default TouristSpotComponent;
