import React,{Component} from 'react';
import {inject,observer} from 'mobx-react'
import {withRouter} from 'react-router-dom'
import {Icon} from 'antd'
import {Checkbox, Flex,Modal} from 'antd-mobile'
const AgreeItem = Checkbox.AgreeItem;
const alert = Modal.alert
@inject('index','photo')
@observer

class AskPrice extends Component {
  constructor(props){
    super(props)
    this.state = {
       descrData:[],
       cityName:'',
       showCity:false,
       showsCity:false,
       name:'',
       photo:'',
       checked:false
    }
  }
  
  async componentDidMount(){
    //获取时间戳
    let timestamp = new Date().getTime();
    let cityData = await this.props.index.getCurCityID(timestamp)
    this.setState({
      cityName:cityData.CityNames
    })
    let data = await this.props.index.getCurAskPrice({
      cityId:cityData.CityId,
      carId:this.props.location.state.carId
    },timestamp)
    this.setState({
      descrData:data
    })
    
  }
  getEveryYear(SerialID){
    this.props.history.push({
      pathname:'/typeYear',
      state:{
        id:SerialID
      }
    })
  }

  curCity(CityID){
    this.props.photo.getCurEveryCity({
      CityID:CityID
    })
    this.setState({
      showCity:true
    })
  }
  async hideCity(cityName,CityID){
    let data = await this.props.index.getCurAskPrice({
      cityId:CityID,
      carId:this.props.location.state.carId
    })
    this.setState({
      descrData:data,
      showsCity:false,
      cityName:cityName
    })
  }
  getEveCity(){
    //获取时间戳
    let timestamp = new Date().getTime();
    this.props.photo.getCurCity(timestamp)
    this.setState({
      showsCity:true
    })
  }
  ontouch(){
    this.setState({
      showCity:false
    })
  }

  getName(e){
    this.setState({
      name:e.target.value
    })
   
  }

  getPhoto(e){
    this.setState({
      photo:e.target.value
    })
   }
   getBottom(){
     let phoneReg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
     let nameReg = /^[\u4E00-\u9FA5]{2,4}$/
     console.log(this.state.name,'.......')
    if(!nameReg.test(this.state.name)){
      alert('', '请输入真实的中文姓名', [
        { text: '好', onPress: () => console.log('ok') },
      ])
    }else if(!phoneReg.test(this.state.photo)){
      alert('', '请输入正确的手机号', [
        { text: '好', onPress: () => console.log('ok') },
      ])
    }else if(!this.state.checked){
      alert('', '请先选择报价经销商', [
        { text: '好', onPress: () => console.log('ok') },
      ])
    }
   }
  render(){
    const {descrData,cityName,showCity,showsCity} = this.state
    return (
      <div className="ask">
        <header>
          <p>可向多个商家咨询最低价，商家及时回复</p>
          <Icon type="question-circle" style={{marginTop:'4px',marginLeft:'3px',fontSize:'15px',color:'#FFF'}} />
        </header>
        <div className="askContent">
          {
            descrData.details && <div className="ask-info" onClick={()=>this.getEveryYear(descrData.details.serial.SerialID)}>
            <img src={descrData.details.serial.Picture} alt=""/>
            <div className="ask-infoCar">
              <p>{descrData.details.serial.AliasName}</p>
              <p> {descrData.details.market_attribute.year}款 {descrData.details.car_name}</p>
            </div>
            <Icon type="right" />
          </div>
          }
          
          <div className="self-info">
            <p>个人信息</p>
            <ul>
              <li><label>姓名</label><input onChange={(e)=>this.getName(e)} type="text" placeholder="输入你的真实中文姓名" value={this.state.name} maxLength="4"/></li>
              <li><label>手机</label><input onChange={(e)=>this.getPhoto(e)} type="text" placeholder="输入你的真实手机号码" value={this.state.photo} maxLength="12"/></li>
              <li><label>城市</label><span onClick={()=>this.getEveCity()}>{cityName}<Icon style={{marginLeft:'2px'}} type="right" /></span></li>              
            </ul> 
            <button onClick={()=>this.getBottom()}>询最低价</button>
          </div>
          <div className="deal-info">
            <p>选择报价经销商</p>
            <Flex>
               {
                 descrData.list && descrData.list.map((item,ind)=>{
                  return <Flex.Item key={ind}>
                      <AgreeItem data-seed="logId" onChange={e => {
                        this.setState({
                          checked:e.target.checked
                        })
                        
                      }}>
                        <p><span>{item.dealerShortName}</span><b>万</b></p>
                        <p><span>{item.address}</span><span>售{item.saleRange}</span></p>
                      </AgreeItem>
                    </Flex.Item>
                 })
               }
            </Flex>
          </div>
        </div>
        {
          showsCity ? <div className={showsCity ? 'city active':'city'}>
          <div className="province">
            <div className="location">
              <p>自动定位</p>
              <p onClick={()=>this.hideCity(this.props.index.CityNames,this.props.index.CityId)}>{this.props.index.CityNames}</p>
            </div>
            <div className="list">
              <p>省市</p>
              <ul>
                {
                  this.props.photo.citylist && this.props.photo.citylist.map((v,i)=>{
                     return <li key={i} onClick={()=>this.curCity(v.CityID)}>{v.CityName}</li>
                  })
                }
              </ul>
            </div>
          </div>
       </div> : null
        }
        {
          showCity ? <div id="cityModal" onClick={()=>this.ontouch()}>
             <ul id="cityList" className={showCity ? 'active':''}>
               {
                this.props.photo.citylists && this.props.photo.citylists.map((v,i)=>{
                   return <li key={i} onClick={()=>this.hideCity(v.CityName,v.CityID)}>{v.CityName}</li>
                })
               }
             </ul>
          </div> : null
        }
        
      </div>
    )
  }
}

export default withRouter(AskPrice);
