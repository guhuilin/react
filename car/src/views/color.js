import React,{Component} from 'react';
import {inject,observer} from 'mobx-react'

@inject('index','photo')
@observer

class Color extends Component {
  constructor(props){
    super(props)
    this.state = {
        curYear:'2017',
        toplist:[],
        colorList:[]
    }
  }
  async componentDidMount(){
    //获取时间戳
    let timestamp = new Date().getTime();
    let colorlist = await this.props.photo.getCurColor({
        SerialID:this.props.location.state.id
    },timestamp)
    let nav = Object.keys(colorlist).sort((a,b)=>{
        return Number(b) - Number(a)
    })
    this.setState({
        toplist:nav
    })

    this.setState({
           colorList:colorlist[this.state.curYear]
      })
    }
   
  getYear(v){
      this.setState({
        curYear:v
      })
      for(let i in this.props.photo.colorlist){ 
        if(this.state.curYear == i){
            this.setState({
                colorList:this.props.photo.colorlist[v]
            })
        }
    }
  }
  getCurColor(color,ColorId){
      window.localStorage.setItem('color',JSON.stringify({color:color,colorId:ColorId}))
      this.props.history.goBack()
  }
  render(){
    const { toplist,colorList,curYear } = this.state
    return (
      <div className="color animated fadeInUp" >
        <p onClick={()=>this.getCurColor('全部颜色')}>全部颜色</p>
        <div>
          <p className="c-type">
            {
                toplist && toplist.map((v,i)=>{
                    return <span className={curYear == v ? 'active':''} key={i} onClick={()=>this.getYear(v)}>{v}</span>
                })
            }
          </p>
          <ul>
            {
                colorList && colorList.map((item,index)=>{
                   return <li key={index} onClick={()=>this.getCurColor(item.Name,item.ColorId)}><span style={{backgroundColor:item.Value}}></span>{item.Name}</li>
                })
            }
          </ul>
        </div>
      </div>
    )
  }
}
export default Color;
