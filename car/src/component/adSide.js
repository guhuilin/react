import React,{Component} from 'react';
import {inject,observer} from 'mobx-react'
import {withRouter} from 'react-router-dom'

@inject('index')
@observer

class Adside extends Component {
  constructor(props){
    super(props)
    this.state = {
      hideId:0,
      SerialId:0
    }
  }
  
  goToDetail(SerialID){
    //获取时间戳
    let timestamp = new Date().getTime();
    this.setState({
       hideId:0
     },()=>{
       this.props.getShowId(this.state.hideId)
     })
    this.props.index.getCurDetail(SerialID,timestamp)
    this.props.history.push('/Detail?id='+SerialID)
  }
  onTouchStart = (e) =>{
    e.stopPropagation();
    let startX = e.targetTouches[0].pageX - (375 - this.refs.aside.offsetLeft - this.refs.aside.offsetWidth);

    e.target.ontouchmove = (e) =>{
      e.stopPropagation();
      let X = e.targetTouches[0].pageX - startX
      this.refs.aside.style.right = -X + 'px';

      e.target.ontouchend = (e) =>{
        e.stopPropagation();
        this.refs.aside.style.right = 0;
        this.setState({
            hideId:0
          },()=>{
            this.props.getShowId(this.state.hideId)
          })
        }

    }
  }
  render(){
    return (
      <div ref="aside" onTouchStart={this.onTouchStart} className={this.props.showId ? "side show":"side"}>
        <div>
          {
              this.props.index.sideList.length > 0 && this.props.index.sideList.map((v,i)=>{
                  return <div className="sideType" key={i}>
                  <h4>{v.GroupName}</h4>
                  <ul className="carlist">
                    {
                        v.GroupList.map((item,index)=>{
                            return <li key={index} onClick={()=>this.goToDetail(item.SerialID)}>
                            <img src={item.Picture} alt=""/>
                            <div className="sideTypes">
                                <p>{item.AliasName}</p>
                                <span>{item.DealerPrice}</span>
                            </div>
                            </li>
                        })
                    }
                  </ul>
              </div>
              })
          }
        </div>
      </div>
    )
  }
}
export default withRouter(Adside);
