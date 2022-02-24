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

    if(isEmpty(content)){
        return null
    }
    return (
        <section className="slider-container layout layout-top">
            <h2 className="mb-5 text-xl">Våra referenser</h2>
            {!isEmpty(content?.referens) && (
                <section ref={slider} className="slider">

                    <button className="hidden left-arrow md:block" onClick={prevSlide}><LeftImageSlider /></button>
                    <button className="hidden right-arrow md:block" onClick={nextSlide}><RightImageSlider /></button>
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
                                        <div className="absolute left-0 z-10 w-full h-full p-10 md:p-20 md:w-3/6 top-2/4 -translate-y-2/4 text-aplate-white">
                                            <h3 className="mb-4 text-xl md:text-3xl">{slide?.rubrik}</h3>
                                            <p className="mb-24 text-sm md:text-lg">{slide?.text}</p>
                                            <div className="flex items-center">
                                                <Line className="mr-8" />
                                                <p className="text-sm">{slide?.namn}</p>
                                            </div>
                                        </div>

                                        <div className="absolute top-0 left-0 z-20 block w-2/4 h-full md:hidden" onClick={prevSlide}></div>
                                        <div className="absolute top-0 right-0 z-20 block w-2/4 h-full md:hidden" onClick={nextSlide}></div>
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