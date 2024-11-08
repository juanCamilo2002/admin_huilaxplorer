"use client";
import AsideDashboard from '../components/dashboard/sidebar/asideDashboard'
import HeaderDashboard from '../components/dashboard/headerDashboard'
import navLinks from '../constants/navLinks';
import { usePathname } from 'next/navigation';
import SidebarItem from '../components/dashboard/sidebar/sideBarItem';
const Layout = ({ children }) => {
    const pathname = usePathname();
    return (
        <main className='flex w-full max-h-screen'>
            <AsideDashboard >
                {navLinks.map((navLink, index) => (
                    <SidebarItem
                        key={index}
                        icon={<navLink.icon className='w-5 h-5' />}
                        text={navLink.text}
                        active={pathname.split("/")[2] === navLink.navUrl.split("/")[2] ? true : false}
                        alert={navLink.alert}
                        href={navLink.navUrl}
                    />
                ))}
            </AsideDashboard>
            <section className='w-full overflow-y-auto bg-gray-100'>
                
                <div className='p-5'>
                    {children}
                </div>
            </section>
        </main>
    )
}

export default Layout