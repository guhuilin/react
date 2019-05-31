import React,{Component} from 'react';
import {BrowserRouter,Route,Redirect} from 'react-router-dom'
import App from '../views/App'
import Detail from '../views/defaultDetail'
import AskPrice from '../views/askPrice'
import TypeYear from '../views/typeYear'
import Photo from '../views/photo'
import Color from '../views/color'
import ECharts from '../component/eCharts'
class RouterConfig extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  render(){
    return (
      <BrowserRouter>
          <Route exact path="/" render={()=><Redirect to="/App"></Redirect>}></Route>
          <Route path="/app" component={App}></Route>
          <Route path="/detail" component={Detail}></Route>
          <Route path="/askPrice" component={AskPrice}></Route>
          <Route path="/typeYear" component={TypeYear}></Route>
          <Route path="/photo" component={Photo}></Route>
          <Route path="/color" component={Color}></Route>
          <Route path="/eCharts" component={ECharts}></Route>

      </BrowserRouter>
    )
  }
}
export default RouterConfig;
