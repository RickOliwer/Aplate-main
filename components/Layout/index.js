import isEmpty from "lodash.isempty";
import Head from "next/head";
import { sanitize } from "../../src/utils/miscellaneous";
import Seo from "../seo";
import Footer from "./footer";
import Header from "./header";
import Hero from "./hero";
import staticHeader from "../../data/header-static.json"
import staticFooter from "../../data/footer-static.json"

const Layout = ({children, data}) => {

    const {page, subPage, HeroImage} = data || {};
    return (
        <div>
            <Seo seo={page?.seo || subPage?.seo} uri={page?.uri || subPage?.uri} />
            <Head>
            <link rel="shortcut icon" href={ staticHeader?.header?.favicon } />
                {page?.seo?.schemaDetails || subPage?.seo?.schemaDetails && (
                    <script 
                        type='application/ld+json'
                        className='yoast-schema-graph'
                        key='yoastSchema'
                        dangerouslySetInnerHTML={{ __html: sanitize(page?.seo?.schemaDetails)}}

                    />
                )}
                
            </Head>
            <Header header={staticHeader?.header} headerMenus={staticHeader?.headerMenues?.edges} page={page} />
            <Hero hero={HeroImage?.hero?.sektion[0]} title={subPage?.title}/>
                <main>
                    {children}
                </main>
            <Footer footerMenus={staticFooter?.footerMenus} />
        </div>
    );
}
 
export default Layout;