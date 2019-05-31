import React, { Component } from 'react'
import {inject,observer} from 'mobx-react'

@inject('index','photo')
@observer

class DefaultDetail extends Component {
  constructor(props){
    super(props)
    this.state={
      years:[],
      datalist:[],
      tabval:'全部'
    }
  }
  async componentDidMount(){
    let detailLists = await this.props.index.getCurDetail(this.props.location.search.split('=')[1])
    let yearslist = ['全部']
    if( this.state.tabval == '全部'){
      this.dealList(detailLists.list)
    }
    detailLists.list && detailLists.list.map((v,i)=>{
      if(yearslist.indexOf(v.market_attribute.year)!==-1){
        return ;
      }else{
        yearslist.push(v.market_attribute.year)
      } 
    })
    yearslist.sort((a,b)=>{
       return b-a
    })
    this.setState({
      years:yearslist
    })
  }
  dealList(list){
    let newlist = []
    list.forEach((item,index)=>{
    let ind = newlist.findIndex(val=>val.type == item.type)
    if(ind == -1){
          newlist.push({
               type:item.type,
               list:[item]
          })
    }else{
         newlist[ind].list.push(item)
    }
    })
    this.setState({
        datalist:newlist
    })
  }
  async getYears(val){
    let detailLists = await this.props.index.getCurDetail(this.props.location.search.split('=')[1])
    this.setState({
      tabval:val
    })
    if( val == '全部'){
        this.dealList(detailLists.list)
     }else{
      let list = detailLists.list.filter(v=>{
          return val==v.market_attribute.year
      })
      this.dealList(list)
     }
     
  }
  async getCurID(carId){
      //获取时间戳
      let timestamp = new Date().getTime();
      let cityData = await this.props.index.getCurCityID(timestamp)
      this.props.index.getCurAskPrice({
        cityId:cityData.CityId,
        carId:carId
      },timestamp)
      this.props.history.push({
        pathname:'/askPrice',
        state:{
          carId:carId
        }
      })
  }
  getPhoto(serialId){
    this.props.history.push({
      pathname:'/photo',
      state:{
        id:serialId
      }
    })
    //获取时间戳
    let timestamp = new Date().getTime();
    //照片
    this.props.photo.getCurPicture({
      SerialID:serialId
    },timestamp)
    
  }
  render() {
    let {detailList} = this.props.index
    return (
      <div className="detailContent">
          <div className="content">
          <div className="carImg">
          <img onClick={()=>this.getPhoto(detailList.SerialID)} src={detailList.CoverPhoto} alt=""/>
          <span onClick={()=>this.getPhoto(detailList.SerialID)}>{detailList.pic_group_count}张照片</span>
       </div>
       <div className="carTotal">
          {
            detailList.market_attribute && <div className="price">
                <span>{detailList.market_attribute.dealer_price&&detailList.market_attribute.dealer_price}</span>
              <p>指导价 {detailList.market_attribute.official_refer_price&&detailList.market_attribute.official_refer_price}</p>
            </div>
          }
         <div className="dprice">
            <button onClick={()=>this.getCurID(detailList.list[0].car_id)}>{detailList.BottomEntranceTitle}</button>
         </div>
       </div>
       <div className="descr">
          <div className="c-type">
              {
                this.state.years&&this.state.years.map((v,i)=>{
                  return <span className={this.state.tabval == v ? 'active':''} key={i} onClick={()=>this.getYears(v)}>{v}</span>
                })
              }
          </div>
          <div className="descrContent">
          {
            this.state.datalist && this.state.datalist.map((v,i)=>{
              
              return  <div className="everyDescr" key={i}>
                            <p>{v.type}</p>
                            {
                              v.list.map((item,ind)=>{
                                return <div  key={ind}>
                                <p>{item.market_attribute.year}款 {item.car_name}</p>
                                <p>{item.horse_power}马力{v.gear_num}档{v.trans_type}</p>
                                <p>
                                  <span>指导价 {item.market_attribute.dealer_price_max}</span>
                                  <span>{item.market_attribute.dealer_price_min}起</span>
                                </p>
                                <button onClick={()=>this.getCurID(item.car_id)}>{detailList.BottomEntranceTitle}</button>
                              </div>
                              })
                            }
                            
                  </div>
                
            })
          }
       </div>  
       </div>
          </div>
         <div className="flex-bottom" onClick={()=>this.getCurID(detailList.list[0].car_id)}>
           <p>{detailList.BottomEntranceTitle}</p>
           <p>本地经销商为你报价</p>
         </div>
      </div>
    )
  }
}
export default DefaultDetail;