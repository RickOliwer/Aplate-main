import Image from 'next/image';
import Link from 'next/link';
import 'tailwindcss/tailwind.css'
//import isEmpty from "lodash.isempty"

const Nav = ({ header, headerMenus }) => {
    console.log(header);

    return ( 
        <nav className='flex w-full h-44 text-gray-700 justify-between xl:px-40 lg:px-32 md:px-20 px-14 items-center'>
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
            

            <div className=''>
                {
                    headerMenus?.map((menus) =>{
                        return <Link key={menus?.node?.id} href={menus?.node?.path}><a className="ml-6">{menus?.node?.label}.</a></Link>
                    })
                }
            </div>
        </nav>
                     
    );
}
 
export default Nav;
