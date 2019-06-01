import React from 'react';
import {Route,Switch,Redirect} from "react-router-dom"
class RouteMap extends React.Component {
    render() {
        const {router} = this.props
        const defaultRoute = <Route path='/' component={()=>{
            return <Redirect to={"/index/recommend"}/>
        }} key={0} exact/>
        return <Switch>{
            router.map((item,index)=>{
                const Com = item.component
                if(item.path==="/"){
                    return <Route exact path={item.path} component={item.component} key={index}/> 
                }
                return <Route path={item.path} component={(apiRouter)=>{
                    return <Com routers={item.children} {...apiRouter}></Com>
                }} key={index}/> 
            }).concat(defaultRoute)
        }</Switch>
    }
}

export default RouteMap;