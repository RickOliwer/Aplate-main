const handler = async (req, res) => {
    const {token, id, type} = req.query
    
    try {
        if(token !== process.env.PREVIEW_TOKEN){
            res.status(404).send('invalid token')
            return
        }
        res.setPreviewData({
            id: id,
            type: type,
        })
        res.writeHead(307, {
            Location: "/preview",
        })
        res.end()
    } catch (error) {
        console.log(error);
    }
}

export default handler