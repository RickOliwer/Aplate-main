import { gql } from '@apollo/client'

export const HeaderFooter = `
    HeroImage: gqlHero {
      hero {
        sektion {
          ... on GqlHero_Hero_Sektion_Galleri {
            fieldGroupName
            bilder {
              installning
              text
              knapp {
                ... on Post {
                  id
                  uri
                  title
                }
                ... on Page {
                  id
                  uri
                  title
                }
              }
              bild {
                altText
                mediaItemUrl
                id
              }
            }
          }
        }
      }
    }
`
export const GET_MENUS = gql`
query GET_MENUS {
  ${HeaderFooter}
}
`