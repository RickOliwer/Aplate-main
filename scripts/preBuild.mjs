import fs from 'fs'
import dotenv from "dotenv"
import fetch from "node-fetch"
dotenv.config()


const auth = Buffer.from(
    process.env.WP_HEADLESS_GRAPHQL_AUTH_USER + ':' + process.env.WP_HEADLESS_GRAPHQL_AUTH_PASS
).toString('base64')




const PreBuild = async () => {
    const GET_HEADER = `
    query getGlobalData {
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
    }
    `
    const response = await fetch(process.env.WP_HEADLESS_GRAPHQL_URI, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({query:GET_HEADER})
    })
    const data = await response.json()
    
    fs.writeFileSync("./data/header-static.json", JSON.stringify({
        header: data.data.header,
        headerMenues: data.data.headerMenus
    }))
    fs.writeFileSync("./data/footer-static.json", JSON.stringify({
        footerMenus: data.data.footerMenus
    }))

}
 
PreBuild();