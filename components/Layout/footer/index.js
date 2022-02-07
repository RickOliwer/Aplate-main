import isEmpty from 'lodash.isempty';
import { sanitize } from '../../../src/utils/miscellaneous'
import Link from 'next/link'
import SvgInstagram from '../../icons/Instagram';
import SvgFacebook from '../../icons/Facebook';
import SvgLinkedin from '../../icons/Linkedin';
import SvgFooterLogo from '../../icons/FooterLogo';
import SvgFooterLogoMax from '../../icons/FooterLogoMax';

const Footer = ( { footerMenus } ) => {
    console.log(footerMenus);
    return (
        <footer className="layout aplate-bg text-white">
            {/* widgets */}
            <div className="footer_container grid-4 py-16 ">
                <div className="">
                    <SvgFooterLogo />
                </div>
                <div className="">
                    <h2 className='mb-4 text-xl'>Information.</h2>

                    { isEmpty(footerMenus) ? null : (
                        <ul>
                            {
                                footerMenus?.edges?.map((footerMenu) =>{
                                    return <li className='mb-4' key={footerMenu?.node?.id}>
                                        <Link href={footerMenu?.node?.path}><a className='urbanist my-hover'>{footerMenu?.node?.label}</a></Link>
                                    </li>
                                })
                            }
                        </ul>
                    )}
                </div>
                <div className="">
                    <h2 className='mb-4 text-xl'>Följ oss.</h2>
                    <div className='flex mb-20 justify-between'>
                        <Link href="https://www.facebook.com/">
                            <a className=''>
                                <SvgFacebook />
                            </a>
                        </Link>

                        <Link href="https://instagram.com/">
                            <a>
                                <SvgInstagram />
                            </a>
                        </Link>
                        <Link href="https://se.linkedin.com/">
                            <a>
                                <SvgLinkedin />
                            </a>
                        </Link>
                        
                        
                        
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

            <div className='py-8 flex justify-between text-sm'>
                <p>Copyright © Aplate Nordic 2021</p>
                <p>Byggd med <span className='text-capace-oranges'>♥</span> av Capace Media</p>
            </div>
        </footer>
    );
}
 
export default Footer;