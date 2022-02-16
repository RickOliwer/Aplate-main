const Textarea = ( { content } ) => {
    return (
        <div className="layout layout-top">
            {content?.rubrikText?.map((title) => {
                return (
                    <div className="mb-10">
                        <h3 className="text-xl">{title?.rubrik}</h3>
                        {title?.textstycken?.map((text) => {
                            return (
                                <p className="mb-4 lg:pr-60">{text?.text}</p>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    );
}
 
export default Textarea;