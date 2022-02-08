import Link from 'next/link';
import { getIconComponentByName } from '../../../src/utils/icons-map';
import {sanitize} from '../../../src/utils/miscellaneous'
import { ArrowBlack } from '../../icons';

const Blurb = ( { content } ) => {
    return (
        <div className="layout layout-top">
            <div className="grid md:grid-cols-3 gap-24">
                {
                    content?.blurb?.map((b) => {
                        return (
                            <div key={b?.rubrik} className="text-center items-center blurbs px-10 pb-10">
                                <div className='mb-4 flex mr-0 justify-center'>{getIconComponentByName(b?.symbol)}</div>
                                <h3 className='mb-1 text-2xl' dangerouslySetInnerHTML={{ __html: sanitize(b?.rubrik) }} />
                                <p className='mb-6 font-light' dangerouslySetInnerHTML={{ __html: sanitize(b?.text) }} />
                                <p className='mb-6 font-light' dangerouslySetInnerHTML={{ __html: sanitize(b?.avslut) }} />

                                <div className="hero-link flex items-baseline text-aplate-black">
                                    <Link href={b?.knapp?.url?.uri}>
                                        <a>
                                            {b?.knapp?.text}
                                        </a>
                                    </Link>
                                    <ArrowBlack className="icon-hover ml-5" />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
 
export default Blurb;