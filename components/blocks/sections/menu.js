import isEmpty from "lodash.isempty";
import { useState } from "react";
import Form from "./form";

const Menu = ( { content } ) => {
    const [isForm, setForm] = useState(false)
    if(isEmpty(content)){
        return null
    }
    return (
        <div className="layout">
            <div className="grid lg:grid-cols-2">
                <div className="lg:px-12 lg:border-r border-aplate-black">
                    {content?.meny?.map((menus) => {
                        return (
                            <div key={menus?.dag} className="text-center">
                                <p className="mb-4 text-xl special-elite">{menus?.dag}</p>
                                <div className="mb-8">
                                    {menus?.maltider?.map((menu) => {
                                        return (
                                            <div key={menu?.maltid}>
                                                <p className="mb-2 font-light">{menu?.maltid}</p>
                                                {!isEmpty(menu?.pris) && (
                                                    <p className="mb-2 font-light">{menu?.pris}</p>

                                                )}

                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-col justify-between text-center lg:px-12">
                    <div>
                        <h2 className="mt-4 mb-6 text-xl lg:mt-0">Veckans á la carte</h2>
                        {content?.alltidHosAplate?.map((always, index) => {
                            return (
                                <div key={`${always?.maltid}${index}`}>
                                    <p className="mb-2 special-elite">{always?.rubrik}</p>
                                    <p className={`font-light ${isEmpty(always?.pris) ? 'mb-5' : 'mb-2'}`}>{always?.maltid}</p>
                                    {!isEmpty(always?.pris) && (
                                        <p className="mb-5 font-light">{always?.pris}</p>

                                    )}
                                </div>
                            )
                        })}
                    </div>
                    <div className="mb-10">
                        <h2 className="my-4 text-xl">Boka bord</h2>
                        {!isEmpty(content?.bokaBord) && (
                            <p className={`font-light ${content?.bokaBordKnapp == true ? 'mb-4' : ''}`}>{content?.bokaBord}</p>

                        )}
                        {content?.bokaBordKnapp == true && (
                            <div>
                                <button 
                                onClick={() => setForm(!isForm)} 
                                className="px-4 py-4 transition duration-500 ease-in-out rounded special-elite bg-aplate-rost hover:scale-105 text-aplate-white">Boka bord</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {content?.bokaBordKnapp == true && (

                <div className={`form-item layout-top ${isForm ? 'block' : 'hidden'}`}>
                    <Form heading={`Boka Bord`} subject={`Boka Bord`} />
                </div>
            )}
        </div>
    );
}
 
export default Menu;