import isEmpty from "lodash.isempty";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const Hero = ( { hero } ) => {

    return (
        <div className="layout hero-grid">
            {
                hero?.bilder?.map((img) => {
                    if(isEmpty(img?.knapp)){
                        return (
                            <div key={img?.bild?.id} className="relative hero-img">
                                <Image
                                    layout="fill"
                                    objectFit="cover"
                                    src={img?.bild?.mediaItemUrl}
                                    alt={img?.bild?.altText}
                                    priority
                                />
                            </div>
                        )
                    } else {
                        return(
                            <div key={img?.bild?.id} className="relative hero-img knapp">
                                <Link  href={img?.knapp?.uri}>
                                    <a className="absolute z-10 bottom-6 right-6 text-white">
                                        {img?.knapp?.title}
                                    </a>
                                </Link>
                                <Image
                                    layout="fill"
                                    objectFit="cover"
                                    src={img?.bild?.mediaItemUrl}
                                    alt={img?.bild?.altText}
                                    priority
                                />
                            </div>
                        )
                    }
                })
            }
        </div>
    );

}
 
export default Hero;