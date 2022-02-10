import { gql } from "@apollo/client";
import {SeoFragment} from "../fragments/seo";
import { HeaderFooter } from "../layout/get-menus";

export const GET_PAGE = gql`
query GET_PAGE($uri: String) {
    ${HeaderFooter}
    page: pageBy(uri: $uri) {
      id
      uri
      slug
      title
      seo {
        ...SeoFragment
      }
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
  ${SeoFragment}
`