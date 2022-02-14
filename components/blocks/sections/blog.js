import isEmpty from "lodash.isempty";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Blog = ( {content, post, tax}) => {
    const router = useRouter()
    const theRout = router?.query?.slug.toString()
    const routArr = router?.asPath?.split('/')
    const popArray = routArr?.pop()
    
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
                    <div className="py-10 border-b">
                        <ul className="flex flex-wrap items-center justify-between">
                            {theRout === 'catering' ? null : (
                                <li className="hover:text-aplate-rost" key="the-back123">
                                    <Link scroll={false} href="/catering/"><a>back</a></Link>
                                </li>
                            )}
                            {tax.nodes.map((button) =>{
                                if(theRout === button.slug && !isEmpty(button?.children?.nodes)){
                                    return button?.children?.nodes?.map((child) =>{
                                        return (
                                            <li className="hover:text-aplate-rost" key={child?.slug}>
                                                <Link scroll={false} href={child?.uri}><a>{child?.name}</a></Link>
                                            </li>
                                        )
                                    })
                                } else if (theRout === 'catering'){

                                    return (
                                        <li className="hover:text-aplate-rost" key={button?.slug}>
                                            <Link scroll={false} href={button?.uri}><a>{button?.name}</a></Link>
                                        </li>
                                    )
                                } 
                                
                            })}
                        </ul>
                    </div>

                    <div>
                        {theRout == 'catering' ? (
                            <div className="layout-top">
                            <div className="items-center px-10 pb-10 text-center">
                                <h3 className="text-3xl">Populärt</h3>
                            </div>
                            
                            <div className="grid-3">
                                {content?.populartCategorier?.map((category) => {
                                    return <TopTax key={category?.GQL_categoryContent?.featuredImage?.id} category={category} />
                                })}
                            </div>
                            </div>
                            
                        ) : (
                            
                            isMenuItem?.filter((item, index) => {
           
                                    const postCategories = item?.gQLCateringKategorier?.nodes?.map((i) => {
                                        return i.slug
                                    })
                                    if(postCategories.includes(popArray)){
                                        
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

export const TopTax = ({category}) => {
    return (
        <div className="category_card">
            
            <Link scroll={false} href={category?.uri}>
                <a>
                <div className="relative w-full h-50vh">
                    {}
                    <Image 
                        layout="fill"
                        objectFit="cover"
                        alt={category?.GQL_categoryContent?.featuredImage?.altText}
                        src={category?.GQL_categoryContent?.featuredImage?.mediaItemUrl}
                    />

                    <h3 className="absolute -bottom-10 left-2/4 -translate-x-2/4">{category?.name}</h3>
                </div>
                </a>
            </Link>
        
        </div>
    )
}