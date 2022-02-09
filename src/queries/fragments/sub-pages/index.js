const SubPageFragment = `
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
        bild {
          altText
          id
          mediaItemUrl
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
`

export default SubPageFragment;