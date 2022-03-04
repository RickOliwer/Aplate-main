import { gql } from "@apollo/client";
import Client from "../../src/apollo/client";

const Preview = () => {
    return (
        <div>preview</div>
    );
}

export async function getStaticProps(context){
    console.log(context);
    if(!context.preview || !context.previewData.id){
        return {
            notFound: true
        }
    }
    const { data, errors } = await Client.query({
        query: gql`
        query GET_PREVIEW_PAGE($id: ID!) {
            page(idType: DATABASE_ID, id: $id) {
              title
              id
              pageId
              preview {
                node {
                  uri
                  slug
                  title
                  pageId
                }
              }
            }
          }`,
        variables: {
          id: context.previewData.id,
        }
      })
      console.log('data =>', data, errors);
    return {
        props: {
        }
    }
}
 
export default Preview;