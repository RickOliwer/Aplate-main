import { gql } from "@apollo/client";
import SeoFragment from "../fragments/seo";
import { HeaderFooter } from "../layout/get-menus";

export const GET_SUB_PAGE = gql`
query GET_SUB_PAGE($uri: String) {
    ${HeaderFooter}
    subPage: pageBy(uri: $uri) {
        id
        uri
        slug
        title
        seo {
            ...SeoFragment
        }
        Gql_pageContent {
            sektion {
            ... on Page_GqlPagecontent_Sektion_Blurbs {
                fieldGroupName
                blurb {
                symbol
                rubrik
                text
                avslut
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