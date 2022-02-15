import isEmpty from "lodash.isempty";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Jumbotron = ( { content } ) => {

    return (
        <>
            <div className="relative jumbotron layout-top">
                <Image 
                    layout="fill"
                    objectFit="cover"
                    alt={content?.bild?.altText}
                    src={content?.bild?.mediaItemUrl}
                />
                
                <JumboContent content={content} />
            </div>
        </>
    );
}
 
export default Jumbotron;

export const JumboContent = ( { content } ) => {
    const [isContentLeft, setContentLeft] = useState(false)
    const left = content?.fieldGroupName
    useEffect(() => {
        if(left == 'Page_GqlPagecontent_Sektion_Jumbotron'){
            setContentLeft(true)
        }
    }, [left, setContentLeft])
    return (
        <div className={`z-10 w-11/12 text-aplate-white ${isContentLeft ? 'absolute flex flex-col top-0 p-8 lg:p-20 md:p-16 left-0 h-full md:w-3/4 w-full justify-between' : 'dead-center  text-center'}`}>
            <div>

                <h2 className="w-full mb-4 text-2xl lg:text-5xl md:text-4xl">{content?.rubrik}</h2>
                
                <p className={`text-base lg:text-2xl md:text-lg ${isContentLeft ? 'lg:text-lg mb-6' : 'm-auto w-2/4 mb-12'}`}>{content?.text}</p>
                <p className="text-base md:text-lg">{content?.avslut}</p>
            </div>
            {!isEmpty(content?.knapp?.url?.uri) ? (
                <Link href={content?.knapp?.url?.uri}><a className="button">{content?.knapp?.text}</a></Link>
            ) : null}
        </div>
    )
}