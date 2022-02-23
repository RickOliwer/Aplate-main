import { gql } from "@apollo/client";
import { SeoFragment } from "../fragments/seo";

export const GET_LUNCH_BLOCKS = gql`
query GET_LUNCH_BLOCKS($uri: String) {
  subPage: pageBy(uri: $uri) {
      uri
      slug
      Gql_pageContent {
          sektion {
            ... on Page_GqlPagecontent_Sektion_Menyer {
              fieldGroupName
              meny {
                dag
                maltider {
                  maltid
                }
              }
              alltidHosAplate {
                maltid
              }
              bokaBord
            }
          }
      }
  }
}
`

export const GET_BLOCKS = gql`
query GET_BLOCKS($uri: String) {
    subPage: pageBy(uri: $uri) {
        id
        uri
        slug
        seo {
            ...SeoFragment
        }
        Gql_pageContent {
            sektion {
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
            ... on Page_GqlPagecontent_Sektion_Blurbs {
                fieldGroupName
                blurb {
                symbol
                rubrik
                text
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
  ${SeoFragment}
`