import Blocks from "../components/blocks";
import ContactForm from "../components/blocks/sections/contact-form";
import Client from "../src/apollo/client"
import { GET_PAGE } from "../src/queries/pages/get-page"
import { handleRedirectsAndReturnData } from "../src/utils/slug";

export default function Home({ data }) {
  
  return (
      <>
        <Blocks blocks={data?.page?.GQL_frontPage} />
        <ContactForm />
      </>
  )
}

export async function getStaticProps(){
  const { data, errors } = await Client.query({
    query: GET_PAGE,
    variables: {
      uri: '/',
    }
  })

  const defaultProps = {
    props: {
      data: data || {},
    },
    revalidate: 1,
  }
  return handleRedirectsAndReturnData( defaultProps, data, errors, 'page')
}