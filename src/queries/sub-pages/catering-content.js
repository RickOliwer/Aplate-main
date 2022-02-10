import { gql } from "@apollo/client";

export const GET_CATERING_CONTENT = gql`
query GET_CATERING_CONTENT($uri: String) {
    cateringContent: pageBy(uri: $uri) {
        id
        uri
        slug
        title
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
`