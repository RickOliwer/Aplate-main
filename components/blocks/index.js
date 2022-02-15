import Blog from "./sections/blog";
import Blurb from "./sections/blurb";
import Faq from "./sections/faq";
import ImageLink from "./sections/imageLink";
import InfoSection from "./sections/infoSektion";
import Jumbotron from "./sections/jumbotron";

const Blocks = ( { blocks, post, tax } ) => {
    return (
        <div>
            {blocks?.sektion?.map((block, index) => {
                return <Block key={`block${index}`} section={block} post={post} tax={tax} />
            })}
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
        default:
            return <div>{section.fieldGroupName}</div>;
            break;
    }
}
 