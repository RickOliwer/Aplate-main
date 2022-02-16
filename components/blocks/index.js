import isEmpty from "lodash.isempty";
import Blog from "./sections/blog";
import Blurb from "./sections/blurb";
import Faq from "./sections/faq";
import ImageLink from "./sections/imageLink";
import InfoSection from "./sections/infoSektion";
import Jumbotron from "./sections/jumbotron";
import Menu from "./sections/menu";
import Service from "./sections/service";
import Textarea from "./sections/textarea";

const Blocks = ( { blocks, post, tax, subBlock } ) => {
    return (
        <div>
            {blocks?.sektion?.map((block, index) => {
                return <Block key={`block${index}`} section={block} post={post} tax={tax} />
            })}
            {isEmpty(subBlock) ? null : (
                subBlock?.sektion?.map((subBlock, index) => {
                    return <Block key={`subBlock${index}`} section={subBlock} />
                })
            )}
        </div>
    );
}
 
export default Blocks;

export const Block = ( { section, post, tax } ) => {
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
        case "Page_GqlPagecontent_Sektion_CateringBlog":
            return <Blog content={section} post={post} tax={tax} />
            break;
        case "Page_GqlPagecontent_Sektion_InfoSektion":
            return <InfoSection content={section} />
            break;
        case "Page_GqlPagecontent_Sektion_VanligaFragor":
            return <Faq content={section} />
            break;
        case "Page_GqlPagecontent_Sektion_Menyer":
            return <Menu content={section} />
            break;
        case "Page_GqlPagecontent_Sektion_Tjanster":
            return <Service content={section} />
            break;
        case "Page_GqlPagecontent_Sektion_RubrikTexter":
            return <Textarea content={section} />
            break;
        default:
            return <div>{section.fieldGroupName}</div>;
            break;
    }
}
 