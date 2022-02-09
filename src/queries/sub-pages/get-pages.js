import { gql } from "@apollo/client";

export const GET_SUB_PAGES_URI = gql`
query GET_SUB_PAGES_URI {
    subPages: pages{
        nodes {
            id
            uri
        }
    }
}`