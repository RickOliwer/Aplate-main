import isEmpty from "lodash.isempty";
import Image from "next/image";
import { useState } from "react";
import Form from "./form";

const Service = ( { content } ) => {

    const [isForm, setForm] = useState(false)
    if(isEmpty(content)){
        return null
    }
    return (
        <div className="layout layout-top">
            <div className="">
                {content?.installning?.bildHoger === true ? (
                    content?.tjanst?.map((service) => {
                        return <ServiceCardRight key={service?.bild?.id} isForm={isForm} setForm={setForm} service={service} />
                    })
                ) : (
                    content?.tjanst?.map((service) => {
                        return <ServiceCard key={service?.bild?.id} isForm={isForm} setForm={setForm} service={service} />
                    })
                )}
            </div>
        </div>
    );
}
 
export default Service;

export const ServiceCard = ( { service, isForm, setForm } ) => {
    return (
        <div className="service-card" >
                            
            <div className="relative w-full service-item service-img">
                <Image 
                    layout="fill"
                    objectFit="cover"
                    alt={service?.bild?.altText}
                    src={service?.bild?.mediaItemUrl}
                    priority
                />
            </div>

            <div className="flex flex-col justify-center lg:pr-56 service-item">
                <h3 className="">{service?.rubrik1}</h3>
                <h2 className="mb-4 text-xl md:text-2xl">{service?.rubrik2}</h2>
                {!isEmpty(service?.text) && (
                    <p className="mb-8">{service?.text}</p>
                )}
                {!isEmpty(service?.lista) && (
                    <ul className="mb-4">
                        {service?.lista?.map((li) => {
                            return (
                                <li className="font-light" key={li?.text}>{li?.text}</li>
                            )
                        })}
                    </ul>
                )}
                {isEmpty(service?.avslut) ? null : (
                    <p>{service?.avslut}</p>
                )}
                {!isEmpty(service?.avslutItalic) && (
                    <p className="mb-20 urbanist-italic">{service?.avslutItalic}</p>
                )}
                <div>
                    <button onClick={() => setForm(!isForm)} className="px-4 py-4 transition duration-500 ease-in-out rounded special-elite bg-aplate-rost hover:scale-105 text-aplate-white">Gör en förfrågan</button>
                </div>
            </div>

            <div className={`form-item ${isForm ? 'block' : 'hidden'}`}>
                <Form heading={`${service?.rubrik1} ${service?.rubrik2}`} subject={isEmpty(service?.tjanst) ? (
                    isEmpty(service?.rubrik1) ? (
                        service?.rubrik2
                    ) : (

                        service?.rubrik1 + service?.rubrik2
                    )
                ) : (
                    service?.tjanst
                )} />
            </div>
        </div>
    )
}

export const ServiceCardRight = ( { service, isForm, setForm } ) => {
    return (
        <div className="service-card" >
                            
            <div className="relative w-full service-item-right service-img">
                <Image 
                    layout="fill"
                    objectFit="cover"
                    alt={service?.bild?.altText}
                    src={service?.bild?.mediaItemUrl}
                    priority
                />
            </div>

            <div className="flex flex-col justify-center lg:pr-56 service-item-right">
                <h3 className="">{service?.rubrik1}</h3>
                <h2 className="mb-4 text-xl md:text-2xl">{service?.rubrik2}</h2>
                {!isEmpty(service?.text) && (
                    <p className="mb-8">{service?.text}</p>
                )}

                {!isEmpty(service?.lista) && (
                    <ul className="mb-4">
                        {service?.lista?.map((li) => {
                            return (
                                <li className="font-light" key={li?.text}>{li?.text}</li>
                            )
                        })}
                    </ul>
                )}
                {isEmpty(service?.avslut) ? null : (
                    <p>{service?.avslut}</p>
                )}
                {!isEmpty(service?.avslutItalic) && (
                    <p className="mb-20 urbanist-italic">{service?.avslutItalic}</p>
                )}
                <div>
                    <button onClick={() => setForm(!isForm)} className="px-4 py-4 rounded special-elite bg-aplate-rost text-aplate-white">Gör en förfrågan</button>
                </div>
            </div>

            <div className={`form-item ${isForm ? 'block' : 'hidden'}`}>
                <Form subject={isEmpty(service?.tjanst) ? (
                        service?.rubrik1 + service?.rubrik2
                    ) : (
                        service?.tjanst
                    )} />
            </div>
        </div>
    )
}