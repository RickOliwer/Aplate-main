import isEmpty from 'lodash.isempty';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css'
import Dropdown from './dropdown';

const Nav = ({ header, headerMenus }) => {
    const [isDropdownIndex, setDropDownIndex] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [ isMenuScroll, setMenuScroll ] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if(window.pageYOffset > 20){
                setMenuScroll(true)
            }else{
                setMenuScroll(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    })

    return (
        <nav className='w-full fixed z-40'>

        
        <div className={`flex text-aplate-black justify-between layout items-center navbar ${ isMenuScroll ? 'navbar-color h-20' : 'lg:h-44 h-32'}`}>
            <div className={`relative logo z-50 ${isMenuScroll ? ' h-12 w-32' : 'md:h-32 md:w-52 h-20 w-36'}`}>

                <Image 
                    layout="fill"
                    objectFit="contain"
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

            <div className={`link-items items-center ${isOpen ? `link-items-active` : '' }`}>
                
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
        </div>
        </nav>
    );
}

export default Nav;
