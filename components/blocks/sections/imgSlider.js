import isEmpty from "lodash.isempty";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LeftImageSlider, Line, RightImageSlider } from "../../icons";

const ImageSlider = ( { content } ) => {

    const [isCurrent, setCurrent] = useState(0)
    const refLength = content?.referens.length

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
                <section className="slider">

                    <button className="left-arrow" onClick={prevSlide}><LeftImageSlider /></button>
                    <button className="right-arrow" onClick={nextSlide}><RightImageSlider /></button>
                   { content?.referens?.map((slide, index) => {
                        return (
                            <div className={index === isCurrent ? 'slide active w-full' : 'slide'} key={slide?.bild?.id}>
                                {index === isCurrent && (

                                    <div  className=" image">
                                        <Image  
                                            layout="fill"
                                            objectFit="cover"
                                            src={slide?.bild?.mediaItemUrl}
                                            alt={slide?.bild?.altText}
                                            priority
                                        />
                                        <div className="absolute z-10 w-3/6 p-20 top-2/4 -translate-y-2/4 text-aplate-white">
                                            <h3 className="mb-4 text-2xl">{slide?.rubrik}</h3>
                                            <p className="mb-24 text-lg">{slide?.text}</p>
                                            <p className="flex items-center"><span className="mr-5"><Line /></span>{slide?.namn}</p>
                                        </div>
                                        <div className="left" onClick={prevSlide}></div>
                                        <div className="right" onClick={nextSlide}></div>
                                    </div>
                                )}
                                
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
 
export default ImageSlider;