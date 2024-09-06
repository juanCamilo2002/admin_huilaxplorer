"use client";
import { useState, useEffect, useRef } from "react";
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';

const CommandPallette = ({ isOpen, onClose }) => {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('users');
  const categories = {
    users: [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ],
    touristSpots: [
      { id: 1, name: 'Eiffel Tower' },
      { id: 2, name: 'Great Wall of China' },
    ],
    activities: [
      { id: 1, name: 'New York' },
      { id: 2, name: 'Los Angeles' },
    ],
    locations: [
      { id: 1, name: 'New York' },
      { id: 2, name: 'Los Angeles' },
    ],
   
  };


  const filteredResults = Object.keys(categories).reduce((acc, category) => {
    const results = categories[category].filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    if (results.length > 0) {
      acc[category] = results;
    }
    return acc;
  }, {});

  useEffect(() => {
    if (isOpen) {
      inputRef.current.focus();
    }
  }, [isOpen])
  return (
    isOpen && (
      <div className="fixed w-screen inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transform translate-x-[-24.3px]">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 ">
          <div className="w-full flex items-center gap-2">

            <div className="flex border border-gray-300 pr-2 rounded-md w-full gap-1 items-center cursor-text ">
              <input
                ref={inputRef}
                type="text"
                placeholder="Escribe algo para buscar..."
                className="py-2 ml-1 pl-3 w-full focus:outline-none text-sm text-gray-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <MagnifyingGlassIcon className='h-5 w-5 text-gray-400 mx-2' />
            </div>
           
              <button onClick={onClose} className=" p-2 rounded-full transition-colors hover:bg-gray-100">
                <XMarkIcon className="h-5 w-5" />
              </button>
           
          </div>
          <div className="mt-2">
            <div className="flex mb-2 gap-1">
              <button
                className={`px-2 py-1 rounded-[5px] text-[13px] ${selectedCategory === 'users' ? 'bg-indigo-800 text-white' : 'bg-gray-200'}`}
                onClick={() => setSelectedCategory('users')}
              >
                usuarios
              </button>
              <button
                className={`px-2 py-1 rounded-[5px] text-[13px] ${selectedCategory === 'touristSpots' ? 'bg-indigo-800 text-white' : 'bg-gray-200'}`}
                onClick={() => setSelectedCategory('touristSpots')}
              >
                Lugares turísticos
              </button>
              <button
                className={`px-3 py-1 rounded-[5px] text-[13px] ${selectedCategory === 'locations' ? 'bg-indigo-800 text-white' : 'bg-gray-200'}`}
                onClick={() => setSelectedCategory('locations')}
              >
                Ubicaciones
              </button>
              <button
                className={`px-3 py-1 rounded-[5px] text-[13px] ${selectedCategory === 'activities' ? 'bg-indigo-800 text-white' : 'bg-gray-200'}`}
                onClick={() => setSelectedCategory('activities')}
              >
                Actividades
              </button>
              
            </div>
            {query && (
              <div>
                {Object.keys(filteredResults).length === 0 ? (
                  <p className="text-gray-500">No results found</p>
                ) : (
                  <ul className="max-h-60 overflow-y-auto">
                    {filteredResults[selectedCategory]?.map((item) => (
                      <li
                        key={item.id}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          console.log(`Selected: ${item.name}`);
                          onClose();
                        }}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default CommandPallette