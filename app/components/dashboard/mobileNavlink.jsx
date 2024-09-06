import Link from 'next/link';

const MobileNavlink = ({ link, pathname }) => {
  return (
    <Link href={link.navUrl} key={link.text}>
      <li className={`nav-link group ${pathname === link.navUrl ? 'nav-link-active' : 'nav-link-inactive'}`}>
        <link.icon className="h-5 w-5" />
        <span className="w-52 ml-3" >{link.text}</span>
      </li>
    </Link>
  );
}

export default MobileNavlink;