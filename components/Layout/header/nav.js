import isEmpty from 'lodash.isempty';
import Image from 'next/image';
import Link from 'next/link';
import 'tailwindcss/tailwind.css'
import Dropdown from './dropdown';
//import isEmpty from "lodash.isempty"

const Nav = ({ header, headerMenus }) => {

    return (
        <nav className='flex w-full h-44 text-gray-700 justify-between xl:px-40 lg:px-32 md:px-20 px-14 items-center navbar'>
            <div className='relative h-32 w-52'>

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

            <div className='link-items items-center'>

                {headerMenus?.map( (menus, index) => (
                        
                    isEmpty(menus?.node?.childItems?.edges) ?
                         <Link key={menus?.node?.id} href={menus?.node?.path}>
                             <a className="link-item special-elite">
                                 {menus?.node?.label}.
                             </a>
                        </Link>
                    : <Dropdown key={menus?.node?.id} index={index} label={menus?.node?.label} children={menus?.node?.childItems?.edges} />
                ))}
            </div>
        </nav>
    );
}

export default Nav;
