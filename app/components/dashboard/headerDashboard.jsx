'use client'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import CommandPallette from './commandPallette'
import navLinks from '@/app/constants/navLinks'
import MobileNavlink from './mobileNavlink'


export default function HeaderDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const pathname = usePathname()
  // Maneja la apertura de la paleta con Ctrl+K o Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen(true);
      }
      if (e.key === 'Escape') {
        setIsPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  return (
    <header className="bg-white border-b sticky top-0 ">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 lg:px-8 ">
        <div className="flex lg:flex-1 ">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="text-xl capitalize hidden sm:block">{pathname.split("/")[1]}</span>
            <img alt="" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" className="h-8 w-auto block sm:hidden" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-center items-center lg:space-x-6">
          <div onClick={() => setIsPaletteOpen(true)} className='flex border h-12 p-3 rounded-md w-[500px] justify-between items-center cursor-pointer'>
            <span className='text-base text-gray-500'>Buscar...</span>
            <MagnifyingGlassIcon className='h-5 w-5 text-gray-400' />
          </div>
          <CommandPallette isOpen={isPaletteOpen} onClose={() => setIsPaletteOpen(false)} />
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true"></span>
          </a>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navLinks.map((link) => (
                  <MobileNavlink link={link} pathname={pathname} key={link.text} />
                ))}

              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
