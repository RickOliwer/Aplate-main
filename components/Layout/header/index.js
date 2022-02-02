import Nav from "./nav";
//import isEmpty from "lodash.isempty"

const Header = ({header, headerMenus, page}) => {

    return ( 
        <header className="w-full">
                <Nav header={header} headerMenus={headerMenus} />
        </header>
    );
}
 
export default Header;