import isEmpty from "lodash.isempty";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { ArrowBlack, Left, Right } from "../../icons";
import Form from "./form";

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
    const refScroll = useRef()

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
        refScroll.current.addEventListener('scroll', () => {

            if(refScroll?.current?.scrollLeft <= 0){
                setScrollLeft(true)
            }else if(refScroll?.current?.scrollLeft > 0) {
                setScrollLeft(false)
            }
            if(refLength?.current?.offsetWidth + refScroll?.current?.scrollLeft >= refLength?.current?.scrollWidth){
                setScrollRight(true)
            } else if (refLength?.current?.offsetWidth + refScroll?.current?.scrollLeft < refLength?.current?.scrollWidth){
                setScrollRight(false)
            }
        })
    }, [refScroll, refLength, setScrollRight])

    const scrollRight = () => {
        refScroll?.current?.scrollLeft += 200;
    }
    const scrollLeft = () => {
        refScroll?.current?.scrollLeft -= 200;
    }
    //console.log('hmm ? =>', refLength.current);
    return (
        <>
            {content?.blog === true ? (
                <div className="layout layout-top blog-container">
                    <div className="relative px-3 py-10 border-b blog-nav">
                        <div className="ul-container" ref={refScroll}>

                            
                            <ul className="" ref={refLength}>
                                {theRout === 'catering' ? null : (
                                    <li className="hover:text-aplate-rost blog-link" key="the-back123">
                                        <Link scroll={false} href="/catering/">
                                            <a>
                                                <ArrowBlack className="rotate-180 icon-hover"/>
                                            </a>
                                        </Link>
                                    </li>
                                )}
                                {tax.nodes.map((button) =>{
                                    if(theRout === button.slug && !isEmpty(button?.children?.nodes)){
                                        return button?.children?.nodes?.map((child) =>{
                                            return (
                                                <li className={`hover:text-aplate-price active:text-aplate-price ${router.asPath + '/' === child?.uri ? 'clicked' : ''}`} key={child?.slug}>
                                                    <Link scroll={false} href={child?.uri}><a>{child?.name}</a></Link>
                                                    <div className={`w-0 bg-aplate-green `}></div>
                                                </li>
                                            )
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
                        {/* <button onClick={scrollRight} className={`absolute top-2/4 -translate-y-2/4 right-0 bg-aplate-white border cat-button ${isOverflow ? 'block' : 'hidden'}`}>right</button>

                        <button onClick={scrollLeft} className={`absolute top-2/4 -translate-y-2/4 left-0 bg-aplate-white border cat-button ${isOverflow ? 'block' : 'hidden'}`}>left</button> */}
                    </div>

                    <div className="card-container">
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
            <div className="relative w-full h-full grid-item service-img">
                {isEmpty(cardContent?.featuredImage?.node) ? null : (

                    <Image 
                        layout="fill"
                        objectFit="cover"
                        alt={cardContent?.featuredImage?.node?.altText}
                        src={cardContent?.featuredImage?.node?.mediaItemUrl}
                        priority
                    />
                )}
            </div>
            <div className="grid-item">
                <h4>{cardContent?.title}</h4>
                {cardContent?.GQL_cateringContent?.sektion?.map((infos) => {
                    return infos?.meny?.map((info) => {
                        if(isEmpty(info?.text)){
                            return (
                                <div key={`${info?.textRad1}${info?.textRad2}${info?.textRad3}`} className="mb-4 text-sm font-light ">
                                    <p>{info?.textRad1}</p>
                                    <p>{info?.textRad2}</p>
                                    <p>{info?.textRad3}</p>
                                </div>
                            )
                        } else {
                            return <p key={info?.text} className="mb-4 text-sm font-light lg:w-2/4">{info?.text}</p>
                        }
                        
                        
                    })

                })}
                {cardContent?.GQL_cateringContent?.sektion?.map((price, index) =>{
                    return (
                        <div key={`${price?.prisperson?.pris}${index}`} className="lg:flex lg:justify-between lg:mt-28">
                            <div>
                                <p className="font-semibold text-aplate-price">Pris: {price?.prisperson?.pris}</p>
                                <p className="mb-4 text-sm font-light">{price?.prisperson?.antal}</p>
                            </div>
                            <div>
                                <button onClick={() => setForm(!isForm)} className="px-4 py-4 rounded special-elite bg-aplate-rost text-aplate-white">Gör en förfrågan</button>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className={`form-item ${isForm ? 'block' : 'hidden'}`}>
                <Form subject={cardContent?.title} heading={`${cardContent?.title}`} />
            </div>
        </div>
    )
}


export const TopTax = ({category}) => {
    return (
        <div className="category_card">
            
            <Link scroll={false} href={category?.uri}>
                <a>
                <div className="relative w-full h-50vh">
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
        
        </div>
    )
}