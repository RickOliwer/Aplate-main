import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import Blocks from "../../components/blocks";
import ContactForm from "../../components/blocks/sections/contact-form";
import Client from "../../src/apollo/client";
import { HeaderFooter } from "../../src/queries/layout/get-menus";
//import { GET_PAGE } from "../../src/queries/pages/get-page";

const Preview = ({data}) => {
  const router = useRouter()
  console.log(data?.page?.pageId);
    return (
        <>
                <Blocks blocks={data?.page?.preview?.node?.GQL_frontPage || data?.page?.preview?.node?.Gql_pageContent} />
                {data?.page?.pageId === 17 || data?.page?.pageId === 113 && (
                  <ContactForm />
                )}
      

        </>
    );
}

export async function getStaticProps(context){
    console.log(context);
    if(!context.preview || !context.previewData.id){
        return {
            notFound: true
        }
    }
    if(context.previewData.id === 17){

      const { data, errors } = await Client.query({
          query: gql`
          query GET_PREVIEW_PAGE($id: ID!) {
            ${HeaderFooter}
              page(idType: DATABASE_ID, id: $id) {
                title
                uri
                pageId
                preview {
                  node {
                    title
                    uri
                    pageId
                    id
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
            id: context.previewData.id,
          }
        })
        return {
          props: {
            data: data || {},
          }
      }

        
    } else {

      const { data, errors } = await Client.query({
        query: gql`
        query GET_PREVIEW_PAGE($id: ID!) {
          ${HeaderFooter}
            page(idType: DATABASE_ID, id: $id) {
              title
              uri
              pageId
              preview {
                node {
                  title
                  uri
                  pageId
                  id
                  Gql_pageContent {
                    sektion {
                      ... on Page_GqlPagecontent_Sektion_RubrikTexter {
                        fieldGroupName
                        rubrikText
                      }
                      ... on Page_GqlPagecontent_Sektion_VaraReferenser {
                        fieldGroupName
                        referens {
                          rubrik
                          text
                          namn
                          bild {
                            altText
                            id
                            mediaItemUrl
                          }
                        }
                      }
                      ... on Page_GqlPagecontent_Sektion_Tjanster {
                        fieldGroupName
                        installning {
                          bildHoger
                        }
                        tjanst {
                          tjanst
                          rubrik1
                          rubrik2
                          text
                          avslut
                          lista {
                            text
                          }
                          avslutItalic
                          bild {
                            altText
                            id
                            mediaItemUrl
                          }
                        }
                      }
                      ... on Page_GqlPagecontent_Sektion_Menyer {
                        fieldGroupName
                        meny {
                          dag
                          maltider {
                            maltid
                            pris
                          }
                        }
                        alltidHosAplate {
                          rubrik
                          maltid
                          pris
                        }
                        bokaBord
                        bokaBordKnapp
                      }
                      ... on Page_GqlPagecontent_Sektion_VanligaFragor {
                        fieldGroupName
                        rubrik1
                        rubrik2
                        fraga {
                          rubrik
                          text
                          knapp {
                            text
                            url {
                              
                              ... on Post {
                                id
                                uri
                              }
                              ... on Page {
                                id
                                uri
                              }
                              ... on GQLCatering {
                                id
                                uri
                              }
                            }
                          }
                        }
                      }
                        ... on Page_GqlPagecontent_Sektion_InfoSektion {
                            fieldGroupName
                            rubrik1
                            rubrik2
                            text
                            avslut
                            knapp {
                              text
                              kategoriUrl {
                                uri
                                slug
                                id
                              }
                              url {
                                ... on Page {
                                  id
                                  slug
                                  uri
                                }
                              }
                            }
                            installningar {
                              galleri
                              galleriHoger
                              oregelbundetGalleri
                            }
                            galleri {
                              altText
                              id
                              mediaItemUrl
                            }
                            bild {
                              altText
                              id
                              mediaItemUrl
                            }
                          }
                    ... on Page_GqlPagecontent_Sektion_Blurbs {
                        fieldGroupName
                        blurb {
                        symbol
                        rubrik
                        text
                        }
                    }
                    ... on Page_GqlPagecontent_Sektion_Jumbotron {
                        fieldGroupName
                        installningar {
                            infoJumbotron
                        }
                        rubrik
                        utdrag
                        kontakt {
                            eMail
                            telefon
                        }
                        text
                        lista {
                            text
                        }
                        avslut
                        knapp {
                            text
                            url {
                              ... on Post {
                                id
                                uri
                              }
                              ... on Page {
                                id
                                uri
                              }
                            }
                        }
                        bild {
                            altText
                            id
                            mediaItemUrl
                        }
                    }
                    ... on Page_GqlPagecontent_Sektion_CateringBlog {
                        blog
                        fieldGroupName
                        populartCategorier {
                            slug
                            uri
                            name
                            GQL_categoryContent {
                              featuredImage {
                                altText
                                id
                                mediaItemUrl
                              }
                            }
                          }
                    }
                    ... on Page_GqlPagecontent_Sektion_BildLankar {
                        fieldGroupName
                        bildLank {
                        bild {
                            altText
                            id
                            mediaItemUrl
                        }
                        knapp {
                            text
                            url {
                            ... on Post {
                                id
                                uri
                            }
                            ... on Page {
                                id
                                uri
                            }
                            }
                        }
                        }
                    }
                    }
                }
                }
            }
          }
          }`,
        variables: {
          id: context.previewData.id,
        }
      })
      return {
        props: {
          data: data || {},
        }
    }

    }
   
}
 
export default Preview;