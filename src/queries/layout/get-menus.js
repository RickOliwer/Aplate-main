import { gql } from '@apollo/client'

export const HeaderFooter = `
    header: getHeader {
      favicon
      siteLogoUrl
      siteTagLine
      siteTitle
    }
    headerMenus: menuItems(where: {location: HCMS_MENU_HEADER, parentId: "0"}) {
      edges {
        node {
          id
          label
          url
          path
          childItems {
            edges {
              node {
                id
                label
                url
                path
                order
                connectedNode {
                  node {
                    ... on GQLCateringKategori {
                      id
                      name
                      slug
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
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
    footerMenus: menuItems(where: {location: HCMS_MENU_FOOTER, parentId: "0"}) {
      edges {
        node {
          id
          label
          url
          path
          childItems {
            edges {
              node {
                id
                label
                url
                path
              }
            }
          }
        }
      }
    }
    footer: getFooter {
      copyrightText
      sidebarOne
      sidebarTwo
      socialLinks {
        iconName
        iconUrl
      }
    }
`
export const GET_MENUS = gql`
query GET_MENUS {
  ${HeaderFooter}
}
`