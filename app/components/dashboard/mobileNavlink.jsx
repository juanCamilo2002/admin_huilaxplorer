import Link from 'next/link';

const MobileNavlink = ({ link, pathname }) => {
  return (
    <Link href={link.navUrl} key={link.text}>
      <li className={`nav-link group ${pathname.split("/")[2] === link.navUrl.split("/")[2]  ? 'nav-link-active from-primary-600 to-primary-400' : 'nav-link-inactive hover:bg-primary-200'}`}>
        <link.icon className="h-5 w-5" />
        <span className="w-52 ml-3" >{link.text}</span>
      </li>
    </Link>
  );
}

export default MobileNavlink;