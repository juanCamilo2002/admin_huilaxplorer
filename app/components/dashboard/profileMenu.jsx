import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { CogIcon, EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const ProfileMenu = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50">
          <EllipsisVerticalIcon className='w-5 h-5' />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute top-[-250%] right-200 z-50 mb-40 w-56 origin-bottom-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>

            <Link
              href="/profile"
              className=" flex gap-2 items-center px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              <CogIcon className='w-5 h-5' />
              Perfil
            </Link  >
          </MenuItem>

          <form action="#" method="POST">
            <MenuItem>
              <button
                onClick={() => signOut()}
                type="submit"
                className="flex gap-2 items-center w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                <ArrowLeftOnRectangleIcon className='w-5 h-5' />
                Cerrar Sesion
              </button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
  )
}

export default ProfileMenu