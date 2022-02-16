import isEmpty from "lodash.isempty";
import { useRouter } from "next/router";
import Blocks from "../../../components/blocks";
import Client from "../../../src/apollo/client";
import { GET_CATERING } from "../../../src/queries/posts/get-post";
import { GET_BLOCKS } from "../../../src/queries/sub-pages/get-blocks";
import { GET_CATERING_TAX } from "../../../src/queries/sub-pages/get-catering";
import { GET_CATERING_TAX_URI } from "../../../src/queries/sub-pages/get-caterings";
import { FALLBACK, handleRedirectsAndReturnData, isCustomPageUri } from "../../../src/utils/slug";

const CateringPage = ({ data, response, tax }) => {
    const router = useRouter()
    if(router.isFallback){
        return <div>Loading...</div>
    }
    return (
        <>
            <Blocks blocks={response?.data?.subPage?.Gql_pageContent} data={data} post={tax?.data?.cateringPosts} tax={tax?.data?.category} />
        </>
    );
}
 
export default CateringPage;

export async function getStaticProps( { params } ) {
    const { data, errors } = await Client.query( {
        query: GET_CATERING_TAX,
        variables: {
            uri: params?.slug
        },

    } );

    const response = await Client.query( {
        query: GET_BLOCKS,
        variables: {
            uri: "/catering/"
        }
    })

    const tax = await Client.query({
        query: GET_CATERING,
    })
    
    const defaultProps = {
         props: {
             data: data || {},
             response: response || {},
             tax: tax || {},
         },
         revalidate: 1,
    }
    return handleRedirectsAndReturnData( defaultProps, data, errors, 'cateringPage')
}

export async function getStaticPaths() {
    const { data } = await Client.query({
        query: GET_CATERING_TAX_URI,
    })

    const pathsData = [];

    data?.cateringPages?.nodes && data?.cateringPages?.nodes.map( page => {
        
        if(! isEmpty( page?.uri)){
                pathsData.push( { params: { slug: page.slug } } )
            
        }
    })
    return {
        paths: pathsData,
        fallback: FALLBACK
    }

}