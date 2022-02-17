const Textarea = ( { content } ) => {
    return (
        <div className="layout layout-top">
            {content?.rubrikText?.map((title, index) => {
                return (
                    <div key={`${title?.rubrik}${index}3€#%€3`} className="mb-10">
                        <h3 className="text-xl">{title?.rubrik}</h3>
                        {title?.textstycken?.map((text, index) => {
                            return (
                                <p key={`${title?.rubrik}${index}3(&/86)`} className="mb-4 lg:pr-60">{text?.text}</p>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    );
}
 
export default Textarea;