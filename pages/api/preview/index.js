// const handler = async (req, res) => {
//     const {secret, id, type} = req.query

import isEmpty from "lodash.isempty"
import { getAuthToken } from "../../../src/utils/cookies";
import { getPreviewRedirectUrl } from "../../../src/utils/redirects";

    
//     try {
//         if(secret !== process.env.PREVIEW_TOKEN){
//             res.status(404).send('invalid token')
//             return
//         }
//         // const post = await getPreviewPost(id || slug, id ? 'DATABASE_ID' : 'SLUG')
//         // if (!post) {
//         //     return res.status(401).json({ message: 'Post not found' })
//         // }
//         res.setPreviewData({
//             id: id,
//             type: type,
//         })
//         res.writeHead(307, {
//             Location: "/preview/",
//         })
//         res.end()
//     } catch (error) {
//         console.log(error);
//     }
// }

// export default handler
export default async function preview(req, res) {
    const {postType, postId} = req.query
    const authToken = getAuthToken(req)

    if (isEmpty( authToken )){
        res.writeHead( 307, {Location: `/login/?postType=${postType}&previewPostId=${postId ?? ''}`} );
    }else{
        const previewUrl = getPreviewRedirectUrl( postType, postId );
        res.writeHead(307, {Location: previewUrl } );
    }
    res.end()
}