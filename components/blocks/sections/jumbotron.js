import isEmpty from "lodash.isempty";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Line, Mail, Phone } from "../../icons";

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
                {content?.installningar?.infoJumbotron === true ? (
                    <InfoJumboContent content={content} />
                ) : (
                    <JumboContent content={content} />

                )}
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
        <div className={`z-10 w-11/12 text-aplate-white ${isContentLeft ? 'absolute flex flex-col top-0 p-8 lg:p-20 md:p-16 left-0 h-full md:w-3/4 w-full justify-between' : 'dead-center text-center'}`}>
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

export const InfoJumboContent = ( { content } ) => {
    const [isContentLeft, setContentLeft] = useState(false)
    const left = content?.fieldGroupName
    useEffect(() => {
        if(left == 'Page_GqlPagecontent_Sektion_Jumbotron'){
            setContentLeft(true)
        }
    }, [left, setContentLeft])
    return (
        <div className={`z-10 w-11/12 text-aplate-white ${isContentLeft ? 'absolute flex flex-col top-0 p-8 lg:p-20 md:p-16 left-0 h-full md:w-2/4 w-full justify-between' : 'dead-center  text-center'}`}>
            <div>

                <h2 className="w-full mb-2 text-2xl lg:text-5xl md:text-4xl">{content?.rubrik}</h2>
                {!isEmpty(content?.utdrag) && (
                    <p className="text-lg lg:pr-36">{content?.utdrag}</p>
                )}
                {!isEmpty(content?.kontakt?.eMail) && (

                    <div className="flex mt-16 mb-6 text-lg lg:pr-36">
                        <p className="flex mr-10 text-center align-center"><Mail className="my-auto mr-3" />{content?.kontakt?.eMail}</p>
                        <p className="flex text-center align-center"><Phone className="my-auto mr-3" />{content?.kontakt?.telefon}</p>
                    </div>
                )}
                <p className={`text-lg lg:pr-36 ${isContentLeft ? 'text-lg lg:pr-36 mb-6' : 'm-auto w-2/4 mb-12'}`}>{content?.text}</p>
                <p className="text-lg lg:pr-36">{content?.avslut}</p>

                {!isEmpty(content?.lista) && (
                    <ul className="">
                        {content?.lista?.map((li) => {
                            return (
                                <li key={li?.text} className="flex mb-2 mr-10 text-base text-center urbanist-italic align-center"><Line className="my-auto mr-3" />{li?.text}</li>
                            )
                        })}
                    </ul>
                )}
            </div>
            {!isEmpty(content?.knapp?.url?.uri) ? (
                <Link href={content?.knapp?.url?.uri}><a className="button">{content?.knapp?.text}</a></Link>
            ) : null}
        </div>
    )
}