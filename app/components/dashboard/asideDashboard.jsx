'use client';
import { ChevronLeftIcon, EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useState, createContext, useContext } from 'react';
import ProfileMenu from './profileMenu';

const SidebarContext = createContext();

export default function AsideDashboard({ children }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <aside className='min-h-screen hidden lg:block'>
      <nav className='h-full flex flex-col bg-white border-r shadow-sm'>
        <div className='p-4 pb-2 flex  justify-between items-center'>
          <img
            src="https://img.logoipsum.com/243.svg"
            alt=""
            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
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
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className='w-10 h-10 rounded-md'
          />
          <div
            className={`flex  justify-between items-center  transition-all  ${expanded ? "w-52 ml-3 " : "w-0 hidden"}`}
          >
            <div className='leading-4'>
              <h4 className="font-semibold">John Doe</h4>
              <span className='text-xs text-gray-600'>johndoe@gmail.com</span>
            </div>
            <ProfileMenu />
          </div>
        </div>
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, alert, href }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <Link href={href}>
      <li className={`nav-link group ${active ? 'nav-link-active' : 'nav-link-inactive'}`} >
        {icon}
        <span className={` overflow-hidden transition-all  ${expanded ? "w-52 ml-3" : "w-0"}`}>
          {text}
        </span>
        {alert && (
          <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`} />
        )}
        {!expanded && (
          <div className="nav-link-active-hover">
            {text}
          </div>)}
      </li>
    </Link>
  );
}