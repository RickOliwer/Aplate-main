import isEmpty from "lodash.isempty";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Arrow } from "../../icons";

const Hero = ( { hero } ) => {

    return (
        <div className="layout hero-grid">
            {
                hero?.bilder?.map((img) => {
                    if(isEmpty(img?.knapp) && img?.installning == 'Bild'){
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
                    } else if(img?.installning == 'Text'){
                        return (
                            <div className="hero-img">
                                <h1>{img?.text}</h1>
                            </div>
                        )
                    } else {
                        return(
                            <div key={img?.bild?.id} className="relative hero-img knapp">
                                <div className="hero-link flex items-baseline absolute z-10 bottom-6 right-6 text-white">

                                    <Link href={img?.knapp?.uri}>
                                        <a>
                                            {img?.knapp?.title}
                                        </a>
                                    </Link>
                                    <Arrow className="icon-hover ml-5" />
                                </div>
                                
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