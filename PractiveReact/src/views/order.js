import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as allData from '../store/store.action'
import Right from '../components/right'


import axios from 'axios'
import '../api/order'

class Order extends Component {
  constructor() {
    super()
    this.state= {
      active: false,
      val:{}
    }
  }
  componentDidMount() {
    axios.get('/api/data').then(res => {
      this.props.getData(res.data.data.categoryList)
    })
  }
  changeLi(ind,val){
    this.setState({
      active: ind,
      val
    })
  }
  render() {
    let { allData } = this.props.allReducer;
    let { active } = this.state;
    return (
      <div className="cont">
        <ul className="left">
          {
            allData.length > 0 && allData.map((item, index) => (
              <li className={active === index?'color':''} key={index} onClick={()=>{this.changeLi(index,item)}}>{item.categoryName}</li>
            ))
          }
        </ul>
        <div className="right">
        <Right data={this.state.val}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => bindActionCreators(allData, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Order)
