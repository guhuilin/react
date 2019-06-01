import React, { Component } from 'react'
import "../common/css/style.scss"
import { BrowserRouter, Link, Route, Redirect } from 'react-router-dom'
import Order from './order'
import Evaluate from './evaluate'
import Merchant from './merchant'

export default class Home extends Component {
  render() {
    return (
    <BrowserRouter>
      <div className="wrapper">
        <header>
          <Link to="/order">点菜</Link>
          <Link to="/evaluate">评论</Link>
          <Link to="/merchant">商家</Link>
        </header>
        <section>
          <Route path="/" render={()=><Redirect to="/order" />} exact/>
          <Route path="/order" component={Order} />
          <Route path="/evaluate" component={Evaluate} />
          <Route path="/merchant" component={Merchant} />
        </section>
        <footer>footer</footer>
      </div>    
    </BrowserRouter>
    )
  }
}
