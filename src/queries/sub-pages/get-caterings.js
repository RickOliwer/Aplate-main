import { gql } from "@apollo/client";

export const GET_CATERING_TAX_URI = gql`
query GET_CATERING_TAX_URI {
    cateringPages: gQLCateringKategorier(where: {parent: 0}, first: 100) {
      nodes {
        id
        name
        uri
        slug
        children(where: {parent: 1}) {
          nodes {
            id
            name
            uri
            slug
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
      }
    }
  }
`