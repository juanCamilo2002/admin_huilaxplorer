import { HomeIcon, UserIcon, } from '@heroicons/react/20/solid'; // Puedes ajustar los íconos según lo necesites
import { MapPinIcon, GlobeAltIcon, CalendarIcon } from '@heroicons/react/20/solid';

const navLinks = [
  {
    icon: HomeIcon,
    text: 'Inicio',
    navUrl: '/dashboard',
    alert: true
  },
  {
    icon: GlobeAltIcon,
    text: 'Lugares Turisticos',
    navUrl: '/tourist-spots',
    alert: false
  },
  {
    icon: CalendarIcon,
    text: 'Actividades',
    navUrl: '/activities',
    alert: false
  },
  {
    icon: MapPinIcon,
    text: 'Ubicaciones',
    navUrl: '/locations',
    alert: false
  },
  {
    icon: UserIcon,
    text: 'Usuarios',
    navUrl: '/users',
    alert: false
  },

];

export default navLinks;