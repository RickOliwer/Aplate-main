import { gql } from "@apollo/client";

export const GET_CATERING = gql`
query GET_CATERING {
    cateringPosts: gQLCaterings {
      edges {
        node {
          title
          id
          featuredImage {
            node {
              altText
              id
              mediaItemUrl
            }
          }
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
          gQLCateringKategorier {
            nodes {
              slug
              uri
              name
              id
            }
          }
        }
      }
    }
    category: gQLCateringKategorier(where: {parent: 0}, first: 100) {
      nodes {
        name
        slug
        uri
        id
        GQL_categoryContent {
            featuredImage {
              altText
              id
              mediaItemUrl
            }
          }
        children {
          nodes {
            name
            slug
            uri
            GQL_categoryContent {
                featuredImage {
                  altText
                  id
                  mediaItemUrl
                }
              }
          }
        }
      }
    }
  }
  
`