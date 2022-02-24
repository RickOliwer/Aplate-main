import isEmpty from 'lodash.isempty';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { getIconComponentByName } from '../../../src/utils/icons-map';
import {sanitize} from '../../../src/utils/miscellaneous'
import { ArrowBlack } from '../../icons';
import handleParse from '../../../src/utils/parse';

const Blurb = ( { content } ) => {
    const [isLayoutOne, setLayoutOne] = useState(false)
    const [isLayoutTwo, setLayoutTwo] = useState(false)
    const layout = useRef()
    useEffect(() => {
        if(layout.current.childNodes.length === 1){
            setLayoutOne(true)
        }
        if(layout.current.childNodes.length === 2){
            setLayoutTwo(true)
        }
    }, [layout, setLayoutOne, setLayoutTwo])
    return (
        <div className="layout layout-top">
            <div ref={layout} className={`grid gap-24 md:grid-cols-3 ${isLayoutOne ? 'md:grid-cols-1 lg:px-72 md:px-44' : ''} ${isLayoutTwo ? 'md:grid-cols-2' : ''}`}>
                {
                    content?.blurb?.map((b) => {
                        return (
                            <TheBlurb key={b?.rubrik} b={b} />
                        )
                    })
                }
            </div>
        </div>
    );
}
 
export default Blurb;

export const TheBlurb = ( { b } ) => {
    return (
        <div className="items-center pb-10 text-center md:px-10 blurbs">
            {!isEmpty(b?.symbol) && (
                <div className='flex justify-center mb-4 mr-0'>{getIconComponentByName(b?.symbol)}</div>
            )}
            <h3 className='mb-1 text-2xl' dangerouslySetInnerHTML={{ __html: sanitize(b?.rubrik) }} />

           {handleParse(b?.text)}

            {! isEmpty(b?.knapp?.url?.uri) ? (

                <div className="flex items-baseline hero-link text-aplate-black">
                    <Link href={b?.knapp?.url?.uri}>
                        <a>
                            {b?.knapp?.text}
                        </a>
                    </Link>
                    <ArrowBlack className="ml-5 icon-hover" />
                </div>
            ) : null}
        </div>
    )
}