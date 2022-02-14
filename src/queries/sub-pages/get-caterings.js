import { gql } from "@apollo/client";

export const GET_CATERING_TAX_URI = gql`
query GET_CATERING_TAX_URI {
    cateringPages: gQLCateringKategorier(where: {parent: 0}, first: 100) {
      nodes {
        id
        name
        uri
        slug
        children {
          nodes {
            id
            name
            uri
            slug
          }
        }
      }
    }
  }
`