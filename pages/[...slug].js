import isEmpty from "lodash.isempty";
import { useRouter } from "next/router";
import Client from "../src/apollo/client"
import { GET_SUB_PAGE } from "../src/queries/sub-pages/get-page";
import { GET_SUB_PAGES_URI } from "../src/queries/sub-pages/get-pages";
import Blocks from "../components/blocks";
import { FALLBACK, handleRedirectsAndReturnData, isCustomPageUri } from "../src/utils/slug";
const Page = ( { data } ) => {
    const router = useRouter()

    if(router.isFallback){
        return <div>Loading...</div>
    }
    return (
        <>
            <Blocks blocks={data?.subPage?.Gql_pageContent} />
        </>
    );
}
 
export default Page;

export async function getStaticProps( { params } ) {
    const { data, errors } = await Client.query( {
        query: GET_SUB_PAGE,
        variables: {
            uri: params?.slug.join( '/' ),
        },

    } );

    const defaultProps = {
        props: {
            data: data || {},
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
        if(! isEmpty( page?.uri && ! isCustomPageUri( page?.uri))){
            const slugs = page?.uri?.split('/').filter( pageSlug => pageSlug);

            if(slugs.length > 0){
                pathsData.push( { params: { slug: slugs } } )
            }
        }
    })

    return {
        paths: pathsData,
        fallback: FALLBACK
    }
}