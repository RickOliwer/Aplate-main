import isEmpty from "lodash.isempty";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { ArrowBlack, Left, Right } from "../../icons";
import Form from "./form";
import parse from "html-react-parser"

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
    const [isOverflow, setOverflow] = useState(false)
    const [isScrollLeft, setScrollLeft] = useState(true)
    const [isScrollRight, setScrollRight] = useState(false)

    const refLength = useRef()
    let theScroll = useRef()

    useEffect(() => {
        if(refLength?.current?.offsetWidth < refLength?.current?.scrollWidth){
             setOverflow(true)
         } else {
            setOverflow(false)
         }
    }, [refLength, setOverflow])

    useEffect(() => {
        

        window.addEventListener('resize', () => {
            if(refLength?.current?.offsetWidth < refLength?.current?.scrollWidth){
                setOverflow(true)
            } else {
                setOverflow(false)
            }
        })

    }, [refLength, setOverflow])

    useEffect(() => {
        theScroll.current.addEventListener('scroll', () => {

            if(theScroll?.current?.scrollLeft <= 0){
                setScrollLeft(true)
            }else if(theScroll?.current?.scrollLeft > 0) {
                setScrollLeft(false)
            }
            if(refLength?.current?.offsetWidth + theScroll?.current?.scrollLeft >= refLength?.current?.scrollWidth){
                setScrollRight(true)
            } else if (refLength?.current?.offsetWidth + theScroll?.current?.scrollLeft < refLength?.current?.scrollWidth){
                setScrollRight(false)
            }
        })
    }, [theScroll, refLength, setScrollRight])

    const scrollRight = () => {
        let scrollright = theScroll?.current?.scrollLeft
        scrollright += 200;
        theScroll.current.scrollLeft = scrollright
    }
    const scrollLeft = () => {
        let scrollleft = theScroll?.current?.scrollLeft
        scrollleft -= 200;
        theScroll.current.scrollLeft = scrollleft
    }

    const slug = router.asPath.split('/')
    slug.pop()
    const slugJoin = slug.join('/')
    if(isEmpty(content && post && tax)){
        return null
    }

    return (
        <>
            {content?.blog === true ? (
                <div className="layout layout-top blog-container">
                    <div className="relative px-3 py-10 border-b blog-nav">
                        <div className="ul-container" ref={theScroll}>

                            
                            <ul className="" ref={refLength}>
                                {theRout === 'catering' ? null : (
                                    <li className="hover:text-aplate-rost blog-link" key="the-back123">
                                        <Link scroll={false} href={slugJoin}>
                                            <a>
                                                <ArrowBlack className="rotate-180 icon-hover"/>
                                            </a>
                                        </Link>
                                    </li>
                                )}
                                {tax.nodes.map((button) =>{
                                    if(theRout === button.slug && !isEmpty(button?.children?.nodes)){
                                        return button?.children?.nodes?.map((child) =>{
                                            if(router?.query?.subSlug === child?.slug && !isEmpty(child?.childChild?.nodes)){
                                                return child?.childChild?.nodes?.map((grandkids) => {
                                                    return (
                                                        <li 
                                                            className={`hover:text-aplate-price active:text-aplate-price ${router.asPath + '/' === grandkids?.uri ? 'clicked' : ''}`} key={grandkids?.slug}>
                                                        
                                                            <Link 
                                                                scroll={false} 
                                                                href={grandkids?.uri}
                                                            >
                                                                <a>{grandkids?.name}</a>
                                                            </Link>
                                                            <div className={`w-0 bg-aplate-green `}></div>
                                                        </li>
                                                    )
                                                })
                                            } else if (theRout === button?.slug && !router?.query?.subSlug) {

                                                return (
                                                    <li className={`hover:text-aplate-price active:text-aplate-price ${router.asPath + '/' === child?.uri ? 'clicked' : ''}`} key={child?.slug}>
                                                        <Link scroll={false} href={child?.uri}><a>{child?.name}</a></Link>
                                                        <div className={`w-0 bg-aplate-green `}></div>
                                                    </li>
                                                )
                                            }
                                        })
                                    } else if (theRout === 'catering'){

                                        return (
                                            <li className="hover:text-aplate-price active:text-aplate-price" key={button?.slug}>
                                                <Link scroll={false} href={button?.uri}><a>{button?.name}</a></Link>
                                                <div className="w-0 bg-aplate-green"></div>
                                            </li>
                                        )
                                    } 
                                    
                                })}
                            </ul>
                        </div>
                        <Left onClick={scrollLeft} className={`absolute top-2/4 -translate-y-2/4 left-0 bg-aplate-white cat-button ${isOverflow ? 'block' : 'hidden'} ${isScrollLeft ? 'hidden' : 'block'}`} />
                        <Right onClick={scrollRight} className={`absolute top-2/4 -translate-y-2/4 right-0 bg-aplate-white cat-button ${isOverflow ? 'block' : 'hidden'} ${isScrollRight ? 'hidden' : 'block'}`} />
                    </div>

                    <div className="my-10 text-center">
                        {tax.nodes.map((parent) => {

                                    if(router?.asPath + '/' === parent.uri){
                                        return (
                                            <h2 className="text-2xl" key={`${parent?.id}"#€€#Q43`}>{parent?.name}</h2>
                                        )
                                    } else {
                                        return parent?.children?.nodes?.map((child) => {
                                            if(router?.asPath + '/' === child.uri){
                                                return (
                                                    <h2 className="text-2xl" key={`${child?.id}"#€€#Q43`}>{child?.name}</h2>
                                                )
                                            } else {

                                                return child?.childChild?.nodes?.map((grandChild) => {
                                                    if(router?.asPath + '/' === grandChild.uri){
                                                    return (
                                                        <h2 className="text-2xl" key={`${grandChild?.id}"#€€#Q43`}>{grandChild?.name}</h2>
                                                    )
                                                    }else {
                                                        return null
                                                    }
                                                })
                                            }
                                        })
                                    }
                        })}
                        
                    </div>

                    <div className="card-container">
                        {theRout == 'catering' ? (
                            <div className="layout-top">
                            <div className="items-center px-10 pb-10 text-center">
                                <p className="text-3xl special-elite">Populärt</p>
                            </div>
                            
                            <div className="grid-3">
                                {content?.populartCategorier?.map((category) => {
                                    return <TopTax key={category?.GQL_categoryContent?.featuredImage?.id} category={category} />
                                })}
                            </div>
                            </div>
                            
                        ) : (

                            <div>
                                {isMenuItem?.filter((item, index) => {
            
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
                                })}
                            </div>
                        )}
                        
                    </div>
                
                </div>
            ) : null}
        </>
    );
}
 
export default Blog;

export const Card = ( { cardContent } ) => {
    const [isForm, setForm] = useState(false)
    return (
        <div className="my-16 card-grid">
            <div className="relative w-full grid-item service-img">
                {isEmpty(cardContent?.featuredImage?.node) ? null : (

                    

                            <Image 
                                layout="fill"
                                objectFit="cover"
                                objectFit={cardContent?.GQL_cateringContent?.sektion?.map((img) => {
                                    if(img?.helbild === true){
                                        return 'cover'
                                    }else{
                                        return 'contain'
                                    }
                                })}
                                alt={cardContent?.featuredImage?.node?.altText}
                                src={cardContent?.featuredImage?.node?.mediaItemUrl}
                                className="serv-img"
                                priority
                            />
                    
                   
                )}
            </div>
            <div className="grid-item">
                <p className="mb-2 special-elite">{cardContent?.title}</p>
                {cardContent?.GQL_cateringContent?.sektion?.map((texttext) => {
                   return (
                    <div key={texttext?.text} className="grid grid-cols-2 gap-16">
                        <div  className="mb-4 text-sm font-light parsed">{!isEmpty(texttext?.text) && parse(texttext?.text)}</div>
                        <div className="mb-4 text-sm font-light parsed">{!isEmpty(texttext?.text2) && parse(texttext?.text2)}</div>


                    </div>

                   ) 

                })}
                        
                        
                        
            
                {cardContent?.GQL_cateringContent?.sektion?.map((price, index) =>{
                    return (
                        <div key={`${price?.prisperson?.pris}${index}`} className="lg:flex lg:justify-between lg:mt-28">
                            <div>
                                <p className="font-semibold text-aplate-price">Pris: {price?.prisperson?.pris}</p>
                                <p className="mb-4 text-sm font-light">{price?.prisperson?.antal}</p>
                            </div>
                            <div>
                                <button onClick={() => setForm(!isForm)} className="px-4 py-4 transition duration-500 ease-in-out rounded hover:scale-105 special-elite bg-aplate-rost text-aplate-white">Gör en förfrågan</button>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div id={`${cardContent?.id}`} className={`form-item ${isForm ? 'block' : 'hidden'}`}>
                <Form subject={cardContent?.title} heading={`${cardContent?.title}`} />
            </div>
        </div>
    )
}


export const TopTax = ({category}) => {
    return (
        <div className="category_card">

            {!isEmpty(category?.uri) && (

            <Link scroll={false} href={category?.uri}>
                <a>
                <div className="relative w-full h-50vh topTax">
                    {isEmpty(category?.GQL_categoryContent?.featuredImage) ? null : (

                        <Image 
                            layout="fill"
                            objectFit="cover"
                            alt={category?.GQL_categoryContent?.featuredImage?.altText}
                            src={category?.GQL_categoryContent?.featuredImage?.mediaItemUrl}
                            priority
                        />
                    )}

                    <h3 className="absolute -bottom-10 left-2/4 -translate-x-2/4">{category?.name}</h3>
                </div>
                </a>
            </Link>
            )}
        
        </div>
    )
}