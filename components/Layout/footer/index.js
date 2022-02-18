import isEmpty from 'lodash.isempty';
import Link from 'next/link'
import * as SvgsComp from '../../icons'

const Footer = ( { footerMenus } ) => {
    return (
        <footer className="text-center md:text-left layout layout-top aplate-bg text-aplate-white">
            {/* widgets */}
            <div className="py-16 footer_container grid-4 ">
                <div className="flex justify-center">
                    <SvgsComp.FooterLogo />
                </div>
                <div className="">
                    <h2 className='mb-4 text-xl'>Information.</h2>

                    { isEmpty(footerMenus) ? null : (
                        <ul>
                            {
                                footerMenus?.edges?.map((footerMenu) =>{
                                    return <li className='mb-4' key={footerMenu?.node?.id}>
                                                <Link href={footerMenu?.node?.path}>
                                                    <a className='urbanist my-hover'>
                                                        {footerMenu?.node?.label}
                                                    </a>
                                                </Link>
                                            </li>
                                })
                            }
                        </ul>
                    )}
                </div>
                <div className="">
                    <h2 className='mb-4 text-xl'>Följ oss.</h2>
                    <div className='grid grid-cols-3 mb-20'>
                        <div className='flex justify-center md:justify-start'>

                            <Link href="https://www.facebook.com/">
                                <a className='inline-block'>
                                    <SvgsComp.Facebook />
                                </a>
                            </Link>
                        </div>
                        <div className='flex justify-center md:justify-start'>

                            <Link href="https://instagram.com/">
                                <a className='inline-block'>
                                    <SvgsComp.Instagram />
                                </a>
                            </Link>
                        </div>
                        <div className='flex justify-center md:justify-start'>

                            <Link href="https://se.linkedin.com/">
                                <a className='inline-block'>
                                    <SvgsComp.Linkedin />
                                </a>
                            </Link>
                        </div>
                        
                        
                        
                    </div>
                    <h3 className='mb-2 text-lg'>Lunch.</h3>
                    <p>
                        Lunchöppet: 11.11 - 14.14
                        (vid större sällskap går det att boka bord utanför ordinarie öppettider)
                    </p>
                </div>
                <div className="">
                    <h2 className='mb-4 text-xl'>Kontakt.</h2>
                    <p className='mb-12'>info@aplate.se</p>
                    <p className='mb-10'>0709 - 99 91 83</p>
                    <p className=''>
                        Medeon Science Park,
                        Per Albin Hanssons väg 41,
                        205 12 Malmö
                    </p>
                </div>
            </div>

            <div className='flex flex-col justify-between pb-8 text-sm md:py-8 md:flex-row'>
                <p className='mb-4 md:mb-0'>Copyright © Aplate Nordic 2021</p>
                <p>Byggd med <span className='text-capace-oranges'>♥</span> av Capace Media</p>
            </div>
        </footer>
    );
}
 
export default Footer;