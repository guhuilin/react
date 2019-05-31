import React,{Component} from 'react';
import {inject,observer} from 'mobx-react'

@inject('index','photo')
@observer

class TypeYear extends Component {
  constructor(props){
    super(props)
    this.state = {
      years:[],
      tabval:'',
      datalist:[]
    }
  }
  async componentDidMount(){
    //获取时间戳
    let timestamp = new Date().getTime();
    let detailLists = await this.props.index.getCurDetail(this.props.location.state.id,timestamp)
    let yearslist = []
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
      years:yearslist,
      tabval:yearslist[0]
    },()=>{
      this.getValue(this.state.tabval)
    })
    
  }
  async getValue(val){
    let detailLists = await this.props.index.getCurDetail(this.props.location.state.id)
    let list = detailLists.list.filter(v=>{
      return val==v.market_attribute.year
    })
    this.dealList(list)
  }
  dealList(list){
    let newlist = []
    list.forEach(item=>{
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
  getYears(val){
    this.setState({
      tabval:val
    })
    this.getValue(val)
     
  }
  getCarId(name,car_id,year){
    if(!this.props.location.state.type){
      this.props.index.getCurAskPrice({
        cityId:this.props.index.CityId,
        carId:car_id
      })
      this.props.history.push({
        pathname:'/askPrice',
        state:{
          carId:car_id
        }
      })
    }else{
      
      if(name == '全部车款'){
        this.props.photo.getCurPicture({
          SerialID:this.props.location.state.id
        })
        window.localStorage.setItem('type',JSON.stringify({type:`${name}`,CarID:car_id}))

      }else{
        this.props.photo.getCurPicture({
          SerialID:this.props.location.state.id,
          CarID:car_id
        })
        window.localStorage.setItem('type',JSON.stringify({type:`${year}款 ${name}`,CarID:car_id}))
                 
      }
      this.props.history.goBack()
    }
  }
  render(){
    return (
      <div className="type animated fadeInUp">
        {
          this.props.location.state.type ?  <div className="no">
          <div className="line"></div>
          <p onClick={()=>this.getCarId('全部车款')}>全部车款</p>
        </div> : null
        }
        <div className="line"></div>
        <div className="c-type">
          {
            this.state.years&&this.state.years.map((v,i)=>{
              return <span className={this.state.tabval == v ? 'active':''} key={i} onClick={()=>this.getYears(v)}>{v}</span>
            })
          }
        </div>
        <div className="c-content">
        {
          this.state.datalist && this.state.datalist.map((v,i)=>{
            return <div key={i}>
                <p>{v.type}</p>
                {
                  v.list.map((item,ind)=>{
                   return <ul key={ind} onClick={()=>this.getCarId(item.car_name,item.car_id,item.market_attribute.year)}>
                    <li>
                    <p>
                      <span>{item.market_attribute.year}款 {item.car_name}</span>
                      <span>{item.market_attribute.dealer_price_min}起</span>
                    </p>
                    <p>
                      <span>{item.horse_power}马力{item.gear_num}档{item.trans_type}</span>
                      <span>指导价 {item.market_attribute.official_refer_price}</span>
                    </p>
                    </li>
                  </ul>
                  })
                }
                </div>
          })
         }
        </div>
      </div>
    )
  }
}
export default TypeYear;
