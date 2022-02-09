import isEmpty from "lodash.isempty";
import Head from "next/head";
import { sanitize } from "../../src/utils/miscellaneous";
import Seo from "../seo";
import Footer from "./footer";
import Header from "./header";
import Hero from "./hero";

const Layout = ({children, data}) => {

    if(isEmpty(data?.page || data?.subPage)){
        return null
    }
    
    const {page, subPage, header, headerMenus, HeroImage, footerMenus} = data || {};

    console.log('page', subPage?.title);
    return (
        <div>
            <Seo seo={page?.seo || subPage?.seo } uri={page?.uri || subPage.uri} />
            <Head>
            <link rel="shortcut icon" href={ header?.favicon } />
                {page?.seo?.schemaDetails || subPage?.seo?.schemaDetails && (
                    <script 
                        type='application/ld+json'
                        className='yoast-schema-graph'
                        key='yoastSchema'
                        dangerouslySetInnerHTML={{ __html: sanitize(page?.seo?.schemaDetails)}}

                    />
                )}
                
            </Head>
            <Header header={header} headerMenus={headerMenus?.edges} page={page} />
            <Hero hero={HeroImage?.hero?.sektion[0]} page={page?.uri} title={subPage?.title} />
                <main>
                    {children}
                </main>
            <Footer footerMenus={footerMenus} />
        </div>
    );
}
 
export default Layout;