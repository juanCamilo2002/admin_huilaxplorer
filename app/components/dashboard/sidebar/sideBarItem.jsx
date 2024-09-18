import { useContext } from "react";
import { SidebarContext } from "./asideDashboard";
import Link from "next/link";

export default function SidebarItem({ icon, text, active, alert, href, noExpanded }) {
    const { expanded } = useContext(SidebarContext);
    return (
      <Link href={href}>
        <li className={`nav-link group ${active ? 'nav-link-active from-primary-600 to-primary-400' : 'nav-link-inactive hover:bg-primary-200'}`} >
          {icon}
          <span className={` overflow-hidden transition-all  ${expanded ? "w-52 ml-3" : "w-0"}`}>
            {text}
          </span>
          {alert && (
            <div className={`absolute right-2 w-2 h-2 rounded bg-primary-600 ${expanded ? "" : "top-2"}`} />
          )}
          {!expanded && (
            <div className="nav-link-active-hover bg-primary-200 text-primary-600">
              {text}
            </div>)}
        </li>
      </Link>
    );
  }