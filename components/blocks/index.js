import Blurb from "./sections/blurb";
import ImageLink from "./sections/imageLink";
import InfoSection from "./sections/infoSektion";
import Jumbotron from "./sections/jumbotron";

const Blocks = ( { blocks } ) => {
    return (
        <div>
            {blocks?.sektion?.map((block, index) => {
                return <Block key={`block${index}`} section={block} />
            })}
        </div>
    );
}
 
export default Blocks;

export const Block = ( { section } ) => {
    switch (section.fieldGroupName) {
        case "Page_GqlFrontpage_Sektion_Blurbs":
            return <Blurb content={section} />
            break;
        case "Page_GqlFrontpage_Sektion_Jumbotron":
            return <Jumbotron content={section} />
            break;
        case "Page_GqlFrontpage_Sektion_InfoSektion":
            return <InfoSection content={section} />
            break;
        case "Page_GqlPagecontent_Sektion_Blurbs":
            return <Blurb content={section} />
            break;
        case "Page_GqlPagecontent_Sektion_Jumbotron":
            return <Jumbotron content={section} />
            break;
        case "Page_GqlPagecontent_Sektion_BildLankar":
            return <ImageLink content={section} />
            break;
        default:
            return <div>{section.fieldGroupName}</div>;
            break;
    }
}
 