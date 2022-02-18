import Link from "next/link";
import { useEffect, useRef } from "react";

const Dropdown = ( { kids, label, index, is, set } ) => {
    const dropItems = useRef()



    useEffect(() =>{
       
            if(is === index){
                dropItems.current.style.animation = `dropDownShow 0.5s ease forwards .1s`
            } else if(is !== index){
                dropItems.current.style.animation = ""
            }




    }, [is, index])

    return (
        <div className="dropdown-container">
            <button onClick={() => set(is !== index ? index : false)} className="cursor-pointer special-elite dropdown-button">{label}.</button>

            <div ref={dropItems} className={`dropdown ${is === index ? 'show' : ''}`}>
                {kids?.map((child) =>{
                    return <Link key={child?.node?.id}  href={child?.node?.path}>
                                <a className="drop-item">{child?.node?.label}</a>
                            </Link>
                })}
            </div>
        </div>
    );
}
 
export default Dropdown;