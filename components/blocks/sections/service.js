import isEmpty from "lodash.isempty";
import Image from "next/image";
import { useState } from "react";
import Form from "./form";

const Service = ( { content } ) => {
    const [isForm, setForm] = useState(false)
    console.log('serv',content);
    return (
        <div className="layout layout-top">
            <div className="">
                {content?.tjanst?.map((service) => {
                    return (
                        <div key={service?.bild?.id}>
                            <div className="grid-2">
                                <div className="relative w-full">
                                    <Image 
                                        layout="fill"
                                        objectFit="cover"
                                        alt={service?.bild?.altText}
                                        src={service?.bild?.mediaItemUrl}
                                        priority
                                    />
                                </div>
                                <div className="py-40">
                                    <h3>{service?.rubrik1}</h3>
                                    <h2>{service?.rubrik2}</h2>
                                    <p>{service?.text}</p>
                                    {isEmpty(service?.avslut) ? null : (
                                        <p>{service?.avslut}</p>
                                    )}
                                    <div>
                                        <button onClick={() => setForm(!isForm)} className="px-4 py-4 rounded special-elite bg-aplate-rost text-aplate-white">Gör en förfrågan</button>
                                    </div>
                                </div>
                            </div>
                            <div className={`form-item ${isForm ? 'block' : 'hidden'}`}>
                                <Form subject={`${service?.rubrik1} ${service?.rubrik2}`} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
 
export default Service;