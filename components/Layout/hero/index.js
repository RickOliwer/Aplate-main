import isEmpty from "lodash.isempty";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { Arrow } from "../../icons";

const Hero = ( { hero, title } ) => {
    const router = useRouter()
    const theRout = router?.query?.slug
    return (
        <div className="layout hero-grid">
            {router?.pathname == '/' ? (
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
                            <div key={img?.text} className="hero-img">
                                <h1>{img?.text}</h1>
                            </div>
                        )
                    } else {
                        return(
                            <div key={img?.bild?.id} className="relative hero-img knapp">
                                <div className="absolute z-10 flex items-baseline text-white hero-link bottom-4 right-6">

                                    <Link href={img?.knapp?.uri}>
                                        <a>
                                            {img?.knapp?.title}
                                        </a>
                                    </Link>
                                    <Arrow className="ml-5 icon-hover" />
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
            ) : (
                hero?.bilder?.map((img, index) => {
                    if (index === 6){
                        return (
                            <div key={img?.bild?.id} className="relative hero-img bg-aplate-rost">
                                {!isEmpty(title) ? (

                                    <h1 className="w-4/5 text-2xl text-center dead-center text-aplate-white lg:text-4xl md:text-2xl">{title}</h1>
                                ) : (
                                    <h1 className="w-4/5 text-2xl text-center dead-center text-aplate-white lg:text-4xl md:text-2xl">{theRout}</h1>
                                )}
                            </div>
                        )
                    }
                    if(!isEmpty(img?.bild) && img?.installning == 'Bild'){
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
                            <div key={img?.text} className="hero-img">
                                <h1>{img?.text}</h1>
                            </div>
                        )
                    }
                })
            )}
        </div>
    );

}
 
export default Hero;