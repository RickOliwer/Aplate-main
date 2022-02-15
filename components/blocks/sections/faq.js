import Link from "next/link";
import { ArrowBlack } from "../../icons";

const Faq = ( { content } ) => {
    return (
        <div className="layout layout-top">
            <div className="mb-12 text-center">
                <h3 className="text-xl">{content?.rubrik1}</h3>
                <h2 className="text-3xl">{content?.rubrik2}</h2>
            </div>
            <div className="grid-3">
                {content?.fraga?.map((faq) => {
                    return (
                        <div key={`${faq?.knapp?.url?.id}${faq?.rubrik}`} className="px-6 py-6 border border-aplate-black">
                            <h3 className="mb-3 text-xl lg:text-2xl">{faq?.rubrik}</h3>
                            <p className="pr-20 pb-36">{faq?.text}</p>
                            <div className="flex items-baseline justify-end hero-link text-aplate-black">
                                <Link href={faq?.knapp?.url?.uri}>
                                    <a>{faq?.knapp?.text}</a>
                                </Link>
                                <ArrowBlack className="ml-5 icon-hover" />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
 
export default Faq;