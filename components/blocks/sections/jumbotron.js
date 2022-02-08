import Image from "next/image";
import Link from "next/link";

const Jumbotron = ( { content } ) => {

    return (
        <div className="jumbotron relative layout-top">
            <Image 
                layout="fill"
                objectFit="cover"
                alt={content?.bild?.altText}
                src={content?.bild?.mediaItemUrl}
            />

            <div className="absolute z-10 text-aplate-white -translate-y-2/4 -translate-x-2/4 top-2/4 left-2/4 text-center w-11/12">
                <h2 className="lg:text-5xl md:text-4xl text-2xl w-full mb-4">{content?.rubrik}</h2>
                <p className="lg:text-2xl md:text-lg text-base w-2/4 m-auto mb-12">{content?.text}</p>

                <Link href={content?.knapp?.url?.uri}><a className="button">{content?.knapp?.text}</a></Link>
            </div>
        </div>
    );
}
 
export default Jumbotron;