'use client';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { useState, createContext, useContext } from 'react';
import { useSession } from 'next-auth/react';
import ProfileMenu from '../profileMenu';
import Image from 'next/image';

export const SidebarContext = createContext();

export default function AsideDashboard({ children }) {
  const { data: session } = useSession();
  const [expanded, setExpanded] = useState(true);
  return (
    <aside className='min-h-screen hidden lg:block'>
      <nav className='h-full flex flex-col bg-white border-r shadow-sm'>
        <div className='p-4 pb-2 flex  justify-between items-center'>
          <Image
            src={'/Imagen2.png'}
            width={expanded ? 170 : 25} height="30"
            objectFit='cover'
            alt=""
            
          />
          <button onClick={() => setExpanded(prev => !prev)} className='p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100'>
            {expanded ? <ChevronLeftIcon className='w-5 h-5' /> : <ChevronLeftIcon className='w-5 h-5 transform rotate-180' />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className='flex-1 px-3 mt-4'>{children}</ul>
        </SidebarContext.Provider>


        <div className='border-t flex p-3 '>
          <img
            src={session?.user.user.img_profile ?? "https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"}
            alt=""
            className='w-10 h-10 rounded-md object-cover'
          />
          <div
            className={`flex  justify-between items-center  transition-all  ${expanded ? "w-52 ml-3 " : "w-0 hidden"}`}
          >
            <div className='leading-4'>
              <h4 className="font-semibold">{session?.user.user.first_name}</h4>
              <span className='text-xs text-gray-600'>{session?.user.email}</span>
            </div>
            <ProfileMenu />
          </div>
        </div>
      </nav>
    </aside>
  )
}

