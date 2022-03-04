import { gql } from "@apollo/client";
import Client from "../../../src/apollo/client";
import { getAuthToken } from "../../../src/utils/cookies";
import { getLoginPreviewRedirectUrl } from "../../../src/utils/redirects";
import { handleRedirectsAndReturnData } from "../../../src/utils/slug";

const PagePreview = ({data}) => {
    console.log('data 2 ====>', data);
    return (
        <div>Page Preview</div>
    );
}


export default PagePreview;

export async function getServerSideProps( context ) {
    const authToken = getAuthToken( context.req )

    const {params} = context || {}
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
                  GQL_frontPage {
                    fieldGroupName
                    sektion {
                      ... on Page_GqlFrontpage_Sektion_Blurbs {
                        fieldGroupName
                        blurb {
                          symbol
                          rubrik
                          text
                          avslut
                          knapp {
                            text
                            url {
                              ... on Post {
                                id
                                uri
                                slug
                              }
                              ... on Page {
                                id
                                uri
                                slug
                              }
                            }
                          }
                        }
                      }
                      ... on Page_GqlFrontpage_Sektion_Jumbotron {
                        fieldGroupName
                        rubrik
                        text
                        knapp {
                          text
                          url {
                            ... on Post {
                              id
                              uri
                              slug
                            }
                            ... on Page {
                              id
                              uri
                              slug
                            }
                          }
                        }
                        bild {
                          altText
                          id
                          mediaItemUrl
                        }
                      }
                      ... on Page_GqlFrontpage_Sektion_InfoSektion {
                        fieldGroupName
                        rubrik1
                        rubrik2
                        text
                        avslut
                        knapp {
                          text
                          url {
                            ... on Post {
                              id
                              uri
                              slug
                            }
                            ... on Page {
                              id
                              uri
                              slug
                            }
                          }
                        }
                        installningar {
                          galleriHoger
                          oregelbundetGalleri
                        }
                        galleri {
                          altText
                          mediaItemUrl
                          id
                        }
                      }
                    }
                  }
                }
              }
            }
          }`,
          variables: {
              id: Number(params?.id ?? ''),
          },
          context:{
              headers: {
                  authorization: authToken ? `Bearer ${authToken}` : '',
              }
          }
    })
    console.log('data ======>', data);
	const defaultProps = {
		props: {
			data: data || {}
		}
	};

	const loginRedirectURL = getLoginPreviewRedirectUrl( 'page', params?.id ?? '' );

	return handleRedirectsAndReturnData( defaultProps, data, errors, 'page', true, loginRedirectURL );
}