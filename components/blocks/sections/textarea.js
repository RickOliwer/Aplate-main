
import isEmpty from "lodash.isempty";
import parse from "html-react-parser"

const Textarea = ( { content } ) => {
    if(isEmpty(content)){
        return null
    }
    return (
        <div className="layout layout-top">
           <div className="parsed">{!isEmpty(content?.rubrikText) && parse(content?.rubrikText)}</div>
        </div>
    );
}
 
export default Textarea;