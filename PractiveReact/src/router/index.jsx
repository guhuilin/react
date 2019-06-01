import React from 'react';
import Routers from "./route.jsx"
import RouteMap from "./map.jsx"

class ReactView extends React.Component {
    render() {
        const { routers } = this.props;
        
        return <RouteMap router={routers===undefined?Routers:routers}/>
    }
}

export default ReactView;