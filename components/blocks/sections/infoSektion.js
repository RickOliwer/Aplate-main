import isEmpty from "lodash.isempty";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowBlack } from "../../icons";

const InfoSection = ( { content } ) => {
    const [isReverse, setReverse] = useState(null)
    useEffect(() =>{
        if(content?.installningar?.galleriHoger == true ){
            setReverse(true)
        }
    }, [content?.installningar?.galleriHoger, setReverse])
    return (
        <div className={`layout layout-top grid md:grid-cols-2 md:gap-32 gap-20 info_section ${isReverse ? 'reverse' : ''}`}>
            <div className="a">
                <Gallery setting={content?.installningar?.oregelbundetGalleri} images={content?.galleri} />
            </div>
            <div className="b flex items-center">
                <div className="inline-block">
                    {!isEmpty(content?.rubrik1) && (
                        <h3 className="text-2xl">{content?.rubrik1}</h3>
                    )}
                    <h2 className="text-4xl">{content?.rubrik2}</h2>
                    <p className="font-light text-lg">{content?.text}</p>
                    {!isEmpty(content?.avslut) && (
                        <p className="mt-4 font-light text-lg">{content?.avslut}</p>
                    )}
                    
                    <div className="info-link mt-6 text-aplate-black">

                        <Link href={content?.knapp?.url?.uri}>
                            <a>
                                {content?.knapp?.text}
                            </a>
                        </Link>
                        <ArrowBlack className="icon-hover ml-5" />
                    </div>

                </div>
            </div>
        </div>
    );
}
 
export default InfoSection;

export const Gallery = ( { setting, images } ) => {

    const [isCrazyGallery, setCrazyGallery] = useState(false)

    useEffect(() =>{
        if(setting == true ){
            setCrazyGallery(true)
        }
    }, [setting, setCrazyGallery])
    return (
        <div className={`my_gallery ${isCrazyGallery ? 'crazy' : 'regular'}`}>
            {
                images?.map((image) => {
                    return (
                        <div key={image?.id} className="gallery_img">
                            <Image 
                                layout="fill"
                                objectFit="cover"
                                src={image?.mediaItemUrl}
                                alt={image?.altText}
                                priority
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}