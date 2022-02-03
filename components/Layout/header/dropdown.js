import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Dropdown = ( { children, label, index } ) => {
    const [isDropdown, setDropdown] = useState(false)
    const dropItems = useRef()


    useEffect(() =>{
       
            if(isDropdown){
                dropItems.current.style.animation = `dropDownShow 0.5s ease forwards .4s`
            } else if(!isDropdown){
                dropItems.current.style.animation = ""
            }

    }, [isDropdown])

    return (
        <div className="dropdown-container">
            <p onClick={() => setDropdown(!isDropdown)} className="cursor-pointer special-elite dropdown-button">{label}.</p>

            <div ref={dropItems} className={`${isDropdown ? 'show' : 'hide'}  dropdown`}>
                {children?.map((child) =>{
                    return <Link key={child?.node?.id}  href={child?.node?.path}>
                                <a className="drop-item">{child?.node?.label}</a>
                            </Link>
                })}
            </div>
        </div>
    );
}
 
export default Dropdown;