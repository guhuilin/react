import React,{Component} from 'react';
import {inject,observer} from 'mobx-react'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import '../views/App.scss'
@inject('index','photo')
@observer

class Swipe extends Component {
  constructor(props){
    super(props)
    this.state = {
       total:'',
       datalist:[]
    }
  }
  async componentDidMount(){
    let curColor = JSON.parse(window.localStorage.getItem('color'))
    
    let data = await this.props.photo.getCurEveryCar({
      SerialID:this.props.SerialID,
      ImageID:this.props.ImageID,
      ColorID:curColor.colorId
    })
    if(data){
       this.setState({
        // total:data.List.length,
        datalist:data.List
       })
    }
    let mySwiper = new Swiper('.swiper-container',{
      // direction: 'horizontal',
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
      observer:true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents:true,//修改swiper的父元素时，自动初始化swiper
    })
    mySwiper.slideTo(this.props.ind, false);
  }
  render(){
    return (
      <div className="banner">
         <div className="swiper-container">
           <div className="swiper-wrapper">
             {
              // this.state.datalist[this.props.ind] && <div className="swiper-slide"><li className="swiper-zoom-container"><img src={this.state.datalist[this.props.ind].Url} alt=""/></li></div>
             }
             {
              this.state.datalist && this.state.datalist.map((item,ind)=>{
                return <div key={ind} className="swiper-slide"><li className="swiper-zoom-container"><img src={item.Url} alt=""/></li></div>
              })
             }
           </div>
         </div>
         <div className="swiper-pagination"></div>
      </div>
    )
  }
}
export default Swipe;
