import isEmpty from "lodash.isempty";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Blog = ( {content, post, tax}) => {
    const router = useRouter()
    const theRout = router?.query?.slug.toString()
    console.log('tax', tax);
    const posts = [];
    post?.edges?.map((post) => {
        posts.push(post?.node)
    })
    const [isMenuItem, setMenuItem] = useState(posts)
    const [isActiveFilter, setActiveFilter] = useState('')
    const [isNav, setNav] = useState(false)
    return (
        <>
            {content?.blog === true ? (
                <div className="layout layout-top">
                    <div className="p-10 border-b">
                        <ul className="flex justify-between">
                            {tax.nodes.map((button) =>{
                                console.log('the button',);
                                if(theRout === button.slug){
                                    return button?.children?.nodes?.map((child) =>{
                                        return (
                                            <li key={child?.slug}>
                                                <Link scroll={false} href={child?.uri}><a>{child?.name}</a></Link>
                                            </li>
                                        )
                                    })
                                } else {

                                    return (
                                        <li key={button?.slug}>
                                            <Link scroll={false} href={button?.uri}><a>{button?.name}</a></Link>
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                    </div>

                    <div>
                        {theRout == 'catering' ? (
                            <TopTax />
                        ) : (
                            
                            isMenuItem?.filter((item, index) => {
           
                                    const postCategories = item?.gQLCateringKategorier?.nodes?.map((i) => {
                                        return i.slug
                                    })
                                    if(postCategories.includes(theRout)){
                                        
                                        return true
                                    } else {
                                        return false
                                    }
                                
                            }).map((val) => {
            
                                return (
                                    <Card key={val?.id} cardContent={val} />
                                )
                            })
                        )}
                        
                    </div>
                
                </div>
            ) : null}
        </>
    );
}
 
export default Blog;

export const Card = ( { cardContent } ) => {
    return (
        <div>Card</div>
    )
}

export const TopTax = () => {
    return (
        <div>TopTax</div>
    )
}