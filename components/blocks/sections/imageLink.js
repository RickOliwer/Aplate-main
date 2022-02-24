import isEmpty from "lodash.isempty";
import Image from "next/image";
import Link from "next/link";
import { ArrowBigger } from "../../icons";

const ImageLink = ( { content } ) => {
    if(isEmpty(content)){
        return null
    }
    return (
        <div className="layout layout-top grid-2 image-links">
            {content?.bildLank?.map((img) =>{
                if(! isEmpty(img?.bild?.mediaItemUrl)){
                    return (
                        <div className="image-link-link">

                            <Link href={img?.knapp?.url?.uri}>
                                <a className="text-xl md:text-2xl">
                                    <div key={img?.bild?.id} className="relative w-full image-link h-60vh">
                                        <Image 
                                            layout="fill"
                                            objectFit="cover"
                                            alt={img?.bild?.altText}
                                            src={img?.bild?.mediaItemUrl}
                                            priority
                                        />

                                        <div className="absolute bottom-0 left-0 z-10 flex items-baseline justify-between w-full p-12 text-white text-link">
                                            <span className="text-xl md:text-2xl link-text">{img?.knapp?.text}</span>
                                            <ArrowBigger className="ml-5 icon-hover" />
                                        </div>

                                    </div>
                                </a>
                            </Link>
                        </div>
                        
                    )
                }
            })}
        </div>
    );
}
 
export default ImageLink;