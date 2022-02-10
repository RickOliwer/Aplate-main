import isEmpty from "lodash.isempty";
import { useRouter } from "next/router";
import Client from "../../../src/apollo/client";
import { GET_CATERING } from "../../../src/queries/posts/get-post";
import { GET_CATERING_TAX } from "../../../src/queries/sub-pages/get-catering";
import { GET_CATERING_TAX_URI } from "../../../src/queries/sub-pages/get-caterings";
import { GET_SUB_PAGE } from "../../../src/queries/sub-pages/get-page";
import { FALLBACK, handleRedirectsAndReturnData } from "../../../src/utils/slug";

const SubCateringPage = ({ data, response, tax }) => {
    const router = useRouter()

    if(router.isFallback){
        return <div>Loading...</div>
    }
    console.log('the tax', tax);
    return (
        <>
            <Blocks blocks={response?.data?.subPage?.Gql_pageContent} data={data} post={tax?.data?.cateringPosts} tax={tax?.data?.category} />
        </>
    );
}
 
export default SubCateringPage;

export async function getStaticProps( { params } ) {
    const { data, errors } = await Client.query( {
        query: GET_CATERING_TAX,
        variables: {
            uri: params?.slug
        },

    } );

    const response = await Client.query( {
        query: GET_SUB_PAGE,
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
        page?.children?.nodes?.map(child => {
            console.log(child);
            if(! isEmpty( child?.uri)){
                    pathsData.push( { params: { slug: child.slug } } )
                
            }
        })
    })

    return {
        paths: pathsData,
        fallback: FALLBACK
    }

}