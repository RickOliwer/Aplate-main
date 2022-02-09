import isEmpty from "lodash.isempty";

export const FALLBACK = 'blocking'
export const PAGES_COUNT = 10

export const isCustomPageUri = (uri) => {
    const pagesToExclude = [
        '/'
    ]
    return pagesToExclude.includes(uri)
}

export const handleRedirectsAndReturnData = ( defaultProps, data, errors, field) => {
    if( isEmpty( data ) ){
        return{
            redirect: {
                destination: '/503',
                statusCode: 301
            }
        }
    }
    if(field && isEmpty( data?.[field] ) ){
        return {
            notFound: true
        }
    }

    return defaultProps
}