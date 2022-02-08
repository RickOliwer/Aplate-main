import * as SvgIconsComponent from "../../components/icons"

export const getIconComponentByName = ( name ) => {
    const ComponentsMap = {
        catering: SvgIconsComponent.Catering,
        cocktailglas: SvgIconsComponent.Cocktailglas,
        talrik: SvgIconsComponent.Talrik,
    }

    if( name in ComponentsMap ) {
        const IconComponent = ComponentsMap[name];
		return <IconComponent />;
    } else {
        return null
    }
}