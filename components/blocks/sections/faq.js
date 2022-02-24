import isEmpty from "lodash.isempty";
import Link from "next/link";
import { ArrowBlack } from "../../icons";

const Faq = ( { content } ) => {
    if(isEmpty(content)){
        return null
    }
    return (
        <div className="layout layout-top">
            <h3 className="flex flex-col mb-12 text-center">
                <span className="text-xl">{content?.rubrik1}</span>
                <span className="text-3xl">{content?.rubrik2}</span>
            </h3>
            <div className="grid-3">
                {content?.fraga?.map((faq) => {
                    return (
                        <div key={`${faq?.knapp?.url?.id}${faq?.rubrik}`} className="flex flex-col justify-between px-6 py-6 border border-aplate-black">
                            <div>
                                <p className="mb-3 text-xl special-elite lg:text-2xl">{faq?.rubrik}</p>
                                <p className="pr-20 pb-36">{faq?.text}</p>
                            </div>

                            {!isEmpty(faq?.knapp?.url?.uri) && (

                                <div className="flex items-baseline justify-end hero-link text-aplate-black">
                                    <Link href={faq?.knapp?.url?.uri}>
                                        <a>{faq?.knapp?.text}</a>
                                    </Link>
                                    <ArrowBlack className="ml-5 icon-hover" />
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
 
export default Faq;