import SpacexLogo from '@components/UI/SpacexLogo'
import Link from 'next/link'
import React from 'react'
import NavbarItem from './NavbarItem'
import MobileNavbar from './MobileNavbar'

export const PathnameContext = React.createContext('/')

export type NavbarProps = { pathname: string }

const Navbar: React.FC<NavbarProps> = ({ pathname }) => {
  return (
    <PathnameContext.Provider value={pathname}>
      <nav className="fixed z-30 flex justify-between w-full px-6 bg-black h-12 bottom-auto top-0">
        <span className="flex md:justify-start justify-center gap-2 items-center max-w-7xl w-full m-auto">
          <Link href="/" passHref>
            <div className="w-[200px] md:relative absolute z-50">
              <SpacexLogo />
            </div>
          </Link>
          <NavbarItem link="/" text="Launches" />

          <NavbarItem link="/missions" text="Missions" />

          <NavbarItem link="/roadster" text="Roadster" />

          <MobileNavbar />
        </span>
      </nav>
    </PathnameContext.Provider>
  )
}

export default Navbar
