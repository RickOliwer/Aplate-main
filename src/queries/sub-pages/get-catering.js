import { gql } from "@apollo/client";
//import { TaxSeoFragment } from "../fragments/seo";
import { HeaderFooter } from "../layout/get-menus";

export const GET_CATERING_TAX = gql`
query GET_CATERING_TAX($uri: ID!) {
    ${HeaderFooter}
    cateringPage: gQLCateringKategori(id: $uri, idType: SLUG) {
      id
      slug
      uri
      name
      children(where: {parent: 1}) {
        nodes {
          slug
          uri
          id
          name
          childChild: children {
            nodes {
              slug
              uri
              id
              name
            }
          }
        }
      }
      gQLCaterings {
        nodes {
          GQL_cateringContent {
            sektion {
              ... on GQLCatering_GqlCateringcontent_Sektion_Menyer {
                fieldGroupName
                meny {
                  textRad1
                  textRad2
                  textRad3
                  text
                }
                prisperson {
                  pris
                  antal
                }
              }
            }
          }
          featuredImage {
            node {
              altText
              id
              mediaItemUrl
            }
          }
        }
      }
    }
  }
  
`