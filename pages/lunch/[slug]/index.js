import isEmpty from "lodash.isempty";
import { useRouter } from "next/router";
import Blocks from "../../../components/blocks";
import Client from "../../../src/apollo/client";
import { GET_LUNCH_BLOCKS } from "../../../src/queries/sub-pages/get-blocks";
import { GET_SUB_PAGE } from "../../../src/queries/sub-pages/get-page";
import { GET_SUB_PAGES_URI } from "../../../src/queries/sub-pages/get-pages";
import { FALLBACK, handleRedirectsAndReturnData } from "../../../src/utils/slug";

const LunchPage = ({ data, response }) => {
    const router = useRouter()
    if(router.isFallback){
        return <div>Loading...</div>
    }
    console.log('where? =>', router);
    return (
        <>
        {router.asPath == "/lunch/lunchcatering" ? (
            <Blocks blocks={data?.subPage?.Gql_pageContent} subBlock={response?.data?.subPage?.Gql_pageContent} />
        ) : (
            <Blocks blocks={data?.subPage?.Gql_pageContent} />

        )}
        </>
    );
}
 
export default LunchPage;

export async function getStaticProps( { params } ) {
    console.log(params);
    const { data, errors } = await Client.query( {
        query: GET_SUB_PAGE,
        variables: {
            uri: `lunch/${params?.slug}`
        },

    } );

    const response = await Client.query( {
        query: GET_LUNCH_BLOCKS,
        variables: {
            uri: "/lunch/"
        }
    })
    
    const defaultProps = {
         props: {
             data: data || {},
             response: response || {},
         },
         revalidate: 1,
    }
    return handleRedirectsAndReturnData( defaultProps, data, errors, 'subPage')
}

export async function getStaticPaths() {
    const { data } = await Client.query({
        query: GET_SUB_PAGES_URI,
    })

    const pathsData = [];

    

    data?.subPages?.nodes && data?.subPages?.nodes.map( page => {
        data?.subPages?.nodes && page?.children?.nodes?.map(child => {
            if(! isEmpty( child?.uri)){
                    pathsData.push( { params: {slug: child.slug } } )
                
            }
        })
    })

    return {
        paths: pathsData,
        fallback: FALLBACK
    }

}