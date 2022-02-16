import { gql } from "@apollo/client";
import { SeoFragment } from "../fragments/seo";
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
              ... on Page_GqlPagecontent_Sektion_Tjanster {
                fieldGroupName
                installning {
                  bildHoger
                }
                tjanst {
                  rubrik1
                  rubrik2
                  text
                  avslut
                  bild {
                    altText
                    id
                    mediaItemUrl
                  }
                }
              }
              ... on Page_GqlPagecontent_Sektion_Menyer {
                fieldGroupName
                meny {
                  dag
                  maltider {
                    maltid
                  }
                }
                alltidHosAplate {
                  maltid
                }
                bokaBord
              }
              ... on Page_GqlPagecontent_Sektion_VanligaFragor {
                fieldGroupName
                rubrik1
                rubrik2
                fraga {
                  rubrik
                  text
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
                      ... on GQLCatering {
                        id
                        uri
                      }
                    }
                  }
                }
              }
                ... on Page_GqlPagecontent_Sektion_InfoSektion {
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
                          slug
                          uri
                        }
                        ... on Page {
                          id
                          slug
                          uri
                        }
                        ... on GQLCatering {
                          id
                          slug
                          uri
                        }
                      }
                    }
                    installningar {
                      galleri
                      galleriHoger
                      oregelbundetGalleri
                    }
                    galleri {
                      altText
                      id
                      mediaItemUrl
                    }
                    bild {
                      altText
                      id
                      mediaItemUrl
                    }
                  }
            ... on Page_GqlPagecontent_Sektion_Blurbs {
                fieldGroupName
                blurb {
                symbol
                rubrik
                utdrag
                text
                avslut
                avslut2
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
  ${SeoFragment}
`