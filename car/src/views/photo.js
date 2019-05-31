import React,{Component} from 'react';
import {inject,observer} from 'mobx-react'
import { Icon } from 'antd-mobile';
import LoadImg from '../util/LazyLoad.js'
import NoImg from '../assets/no-img.png'
import Swipe from '../component/swipe'
@inject('index','photo')
@observer

class Photo extends Component {
  constructor(props){
    super(props)
    this.state = {
       show:false,
       colors:'颜色',
       types:'车款',
       showT:false,
       imgID:'',
       index:'',
       page:1,
       PageSize:30,
       id:''
    }
  }
  componentDidMount(){
      //获取时间戳
      let timestamp = new Date().getTime();
     
      let curColor = JSON.parse(window.localStorage.getItem('color'))
      let curType = JSON.parse(window.localStorage.getItem('type'))
      this.setState({
        colors:curColor.color
      })
      this.props.photo.getCurPicture({
        SerialID:this.props.location.state.id,
        ColorID:curColor.colorId,
        CarID:curType.CarID
      },timestamp)
      this.setState({
        types:curType.type
      })
  }
  componentDidUpdate(){
    
    if(this.state.show){
        // 懒加载
       // new LoadImg('.img-list')
        let scrollEle = document.querySelector('.img-list')
        scrollEle.addEventListener('scroll',e=>this.scroll(e))
      }else{
        return;
      }
  }
  getMorePicture(id){
     this.setState({
      show:true,
      id:id
     })
     //获取时间戳
     let timestamp = new Date().getTime();
     this.props.photo.getCurPictureStyle({
      SerialID:this.props.location.state.id,
      Id:id,
      page:this.state.page,
      PageSize:this.state.PageSize
     },timestamp)
     
  }

  getType(type){
    if(type == 'color'){
      this.props.history.push({
        pathname:'/color',
        state:{
          id:this.props.location.state.id
        }
      })
      //获取时间戳
      let timestamp = new Date().getTime();
      //颜色
      this.props.photo.getCurColor({
        SerialID:this.props.location.state.id
      },timestamp)
    }else if(type == 'carType'){
      
      this.props.history.push({
        pathname:'/typeYear',
        state:{
          id:this.props.location.state.id,
          type:'type'
        }
      })
    }
  }
  getEveryPicture(ind,Id){
    this.setState({
      showT:true,
      imgID:Id,
      index:ind
    })
    
    let curColor = JSON.parse(window.localStorage.getItem('color'))
    if(curColor){
      this.props.photo.getCurEveryCar({
        SerialID:this.props.location.state.id,
        ImageID:Id,
        ColorID:curColor.colorId
      })
    }else{
      this.props.photo.getCurEveryCar({
        SerialID:this.props.location.state.id,
        ImageID:Id
      })
    }
    
  }
  hideEvery(){
    this.setState({
      showT:false
    })
  }
  scroll(e){
    let top = this.refs.list.scrollTop;
    let ind = 1 
    if(top>=this.refs.list.scrollHeight-this.refs.list.offsetHeight){
      // this.setState({
      //    page:++ind
      // },()=>{
      //   console.log(this.state.page,'44444444')

      // })
      //获取时间戳
      console.log(this.state.num,'.')
      let timestamp = new Date().getTime();
      this.props.photo.getCurPictureStyle({
        SerialID:this.props.location.state.id,
        Id:this.state.id,
        page:ind++,
        PageSize:this.state.PageSize
      },timestamp)
        
    }
  }

  render(){
    const {colors,showT,types} = this.state
    return (
      <div className="photo" ref="photo">
        <div className="tit">
         <p onClick={()=>this.getType('color')}>
           <span>{colors}</span>
           <Icon type="down" />
         </p>
         <p onClick={()=>this.getType('carType')}>
            <span>{types}</span>
            <Icon type="down" />
         </p>
        </div>
        {
          this.props.photo.photolist.length > 0 ? <ul className="img-default">
          {
            this.props.photo.photolist && this.props.photo.photolist.map((v,i)=>{
                return v.List.map((item,ind)=>{
                        return <li data-ind={ind} key={ind}>
                        <img onClick={()=>this.getEveryPicture(ind,v.Id)} src={item.Url} alt="" />
                        {
                            ind == 0 ? <div onClick={()=>this.getMorePicture(v.Id)}>
                            <p>{v.Name}</p>
                            <p>{v.Count}张></p>
                          </div> : null
                        }
                      </li>
                    }) 
            })
          }
        </ul> : <div className="no-img">
              <img src={NoImg} alt=""/>
              <p>还没有内容</p>
            </div>
        }
        
        {
          this.state.show ? <ul className="img-list" ref="list">
          {
            this.props.photo.morelist && this.props.photo.morelist.map((v,i)=>{
              return v.List && v.List.map((item,ind)=>{
                return <li data-ind={ind} key={ind}>
                        <img data-src={item.Url} src={item.Url} alt="" />
                      </li>
              })
            })
          }
          </ul>: null
        }  
        {
          showT ? <div className="img-detail" onClick={()=>this.hideEvery()}>
               <Swipe ind={this.state.index} SerialID={this.props.location.state.id} ImageID={this.state.imgID}></Swipe>
          </div> : null
        }
      </div>
    )
  }
}

export default Photo;
