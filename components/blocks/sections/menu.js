import isEmpty from "lodash.isempty";

const Menu = ( { content } ) => {
    return (
        <div className="layout">
            <div className="grid lg:grid-cols-2">
                <div className="lg:px-12 lg:border-r border-aplate-black">
                    {content?.meny?.map((menus) => {
                        return (
                            <div key={menus?.dag} className="text-center">
                                <h2 className="mb-4 text-xl">{menus?.dag}</h2>
                                <div className="mb-8">
                                    {menus?.maltider?.map((menu) => {
                                        return (
                                            <p key={menu?.maltid} className="mb-2 font-light">{menu?.maltid}</p>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-col justify-between text-center lg:px-12">
                    <div>
                        <h2 className="mt-4 mb-6 text-xl lg:mt-0">Alltid hos Aplate</h2>
                        {content?.alltidHosAplate?.map((always, index) => {
                            return (
                                <p key={`${always?.maltid}${index}`} className="mb-2 font-light">{always?.maltid}</p>
                            )
                        })}
                    </div>
                    <div className="mb-10">
                        <h2 className="my-4 text-xl">Boka bord</h2>
                        <p className="font-light">{content?.bokaBord}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Menu;