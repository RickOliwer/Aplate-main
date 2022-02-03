import isEmpty from 'lodash.isempty';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import 'tailwindcss/tailwind.css'
import Dropdown from './dropdown';
//import isEmpty from "lodash.isempty"

const Nav = ({ header, headerMenus }) => {
    const [isDropdownIndex, setDropDownIndex] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    return (
        <nav className='flex w-full lg:h-44 h-32 text-gray-700 justify-between xl:px-40 lg:px-32 md:px-20 px-8 items-center navbar'>
            <div className='relative md:h-32 md:w-52 h-20 w-36'>

                <Image 
                    layout="fill"
                    objectFit="contain"
                    width="100%" 
                    height="100%" 
                    src={header?.siteLogoUrl}
                    priority
                    alt="logo"
                />
            </div>
            <div onClick={() => setIsOpen(!isOpen)} className={`nav_button ${isOpen ? 'click' : '' }`} id="nav_button">
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
            </div>

            <div className={`link-items items-center ${isOpen ? 'link-items-active' : '' }`}>

                {headerMenus?.map( (menus, index) => (
                        
                    isEmpty(menus?.node?.childItems?.edges) ?
                         <Link key={menus?.node?.id} href={menus?.node?.path}>
                             <a className="link-item special-elite">
                                 {menus?.node?.label}.
                             </a>
                        </Link>
                    : <Dropdown set={setDropDownIndex} is={isDropdownIndex} key={menus?.node?.id} index={index} label={menus?.node?.label} kids={menus?.node?.childItems?.edges} />
                ))}
            </div>
        </nav>
    );
}

export default Nav;
