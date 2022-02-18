import isEmpty from "lodash.isempty";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LeftImageSlider, Line, RightImageSlider } from "../../icons";

const ImageSliderCopy = ( { content } ) => {
    const refLength = content?.referens.length
    const [isCurrent, setCurrent] = useState(Math.round(refLength / 2) - 1)
    const slider = useRef()
    const links = useRef([])
    const createLinksRefs = (link, index) => {
        links.current[index] = link;
    }
    
    useEffect(() => {
        links.current.map((dot, index) => {
            if(isCurrent === index){
                dot.style.backgroundColor = "#0F4127"
            } else {
                dot.style.backgroundColor = ""
            }
        })


    }, [isCurrent])

    const nextSlide = () => {
        setCurrent(isCurrent === refLength - 1 ? 0 : isCurrent + 1)
    }

    const prevSlide = () => {
        setCurrent(isCurrent === 0 ? refLength - 1 : isCurrent - 1)
    }

    const dotClick = (index) => {
        setCurrent(index)
    }
    return (
        <section className="slider-container layout layout-top">
            <h2 className="mb-5 text-xl">Våra referenser</h2>
            {!isEmpty(content?.referens) && (
                <section ref={slider} className="slider">

                    <button className="left-arrow" onClick={prevSlide}><LeftImageSlider /></button>
                    <button className="right-arrow" onClick={nextSlide}><RightImageSlider /></button>
                   { content?.referens?.map((slide, index) => {
                        return (

                               

                                    <div key={slide?.bild?.id} className="image"
                                        style={{
                                            marginLeft: index === 0 ? `-${isCurrent * 100}%` : undefined,
                                        }}
                                    >
                                        <Image  
                                            layout="fill"
                                            objectFit="cover"
                                            src={slide?.bild?.mediaItemUrl}
                                            alt={slide?.bild?.altText}
                                            priority
                                            className="img"
                                        />
                                        <div className="absolute z-10 w-3/6 p-20 top-2/4 -translate-y-2/4 text-aplate-white">
                                            <h3 className="mb-4 text-2xl">{slide?.rubrik}</h3>
                                            <p className="mb-24 text-lg">{slide?.text}</p>
                                            <p className=""><span className="mr-5"><Line /></span>{slide?.namn}</p>
                                        </div>
                                    </div>
                                
                            
                        )
                    
                    })}
                    <div className="dots">

                        {content?.referens?.map((dot, index) => {
                            return <div onClick={() => dotClick(index)} ref={(e) => createLinksRefs(e, index)} key={`${dot?.bild?.id}€#%63`} className="dot"></div>
                        })}
                    </div>
                </section>
            )}
        </section>
    );
}
 
export default ImageSliderCopy;