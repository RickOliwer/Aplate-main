import isEmpty from "lodash.isempty";
import Head from "next/head";
import { sanitize } from "../../src/utils/miscellaneous";
import Seo from "../seo";
import Header from "./header";

const Layout = ({children, data}) => {

    if(isEmpty(data?.page)){
        return null
    }
    
    const {page, header, footer, headerMenus, footerMenus} = data || {};
    return (
        <div>
            <Seo seo={page?.seo} uri={page?.uri} />
            <Head>
            <link rel="shortcut icon" href={ header?.favicon } />
                {page?.seo?.schemaDetails && (
                    <script 
                        type='application/ld+json'
                        className='yoast-schema-graph'
                        key='yoastSchema'
                        dangerouslySetInnerHTML={{ __html: sanitize(page?.seo?.schemaDetails)}}

                    />
                )}
                
            </Head>
            <Header header={header} headerMenus={headerMenus?.edges} page={page} />
            {children}
        </div>
    );
}
 
export default Layout;