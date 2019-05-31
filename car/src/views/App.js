import React,{Component} from 'react';
import './App.scss';
import {inject,observer} from 'mobx-react'
import Adside from '../component/adSide'
import BSCroll from 'better-scroll'
import Load from '../component/loading.js'
import LoadImg from '../util/LazyLoad.js'

@inject('index')
@observer
@Load

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
       loading:true,
       showId:0,
       rightBscroll:null,
       val:'A',
       ids:'#A',
       imgs:[]
    }
  }
  getMasterID(id){
    //获取时间戳
    let timestamp = new Date().getTime();
    this.setState({
      showId:id
    })

    this.props.index.getCurMasterID(id,timestamp)
  }
  async componentDidMount(){
    //获取时间戳
    let timestamp = new Date().getTime();
    let data = await this.props.index.autoAdd(timestamp)
    if(data){
       this.setState({
        loading:false
       })
    }
    this.setState({
      rightBscroll:new BSCroll('.carLeftContent',{
        probeType:2,
        click:true
      })
    })
    // new LoadImg('#caca')
    // let scrollEle = this.refs.left.children[0];
    // scrollEle.addEventListener('scroll',e=>this.scroll(e))
    // this.init()
  }

  // init(){
  //   this.imgs = [...this.refs.left.querySelectorAll('img[data-src]')]
    
  // }
  // scroll(e){
  //   this.init()
  //   this.imgs.map(item=>{
  //     if(item.src == item.dataset.src){
  //        return;
  //     }

  //     let rect = item.getBoundingClientRect()
  //     if(rect.top >=0 && rect.top <= window.innerHeight && rect.left >=0 && rect.right>=0){
  //       item.src = item.dataset.src;
  //     }
  //   })
  // }
  getShowId = (val) =>{
      this.setState({
        showId:val
      })
  }
  
  onTouchStart = (e) =>{
    e.stopPropagation();
    let curEvTop = e.targetTouches[0].pageY;
    let curH = e.target.offsetHeight
    let curTop = this.refs.rightH.offsetTop
    let tarHeight = Math.floor((curEvTop-curTop)/curH)
    this.state.rightBscroll.scrollTo(0,-(this.refs.left.children[0].children[tarHeight].offsetTop))
    console.log(-(this.refs.left.children[0].children[tarHeight].offsetTop),'..........')
    e.target.ontouchmove = (e) =>{
      let curEvTop = e.targetTouches[0].pageY;
      let curH = e.target.offsetHeight
      let curTop = this.refs.rightH.offsetTop
      let tar = Math.floor((curEvTop-curTop)/curH)
      this.state.rightBscroll.scrollTo(0,-(this.refs.left.children[0].children[tar].offsetTop))
    }
    
  }
  
  render(){
    return (
      <div className="App" ref="app">
          <div className="carLeftContent" ref="left">
              <div id="caca">
              {
                Object.keys(this.props.index.list).map((v,i)=>{
                   return <div className="everyCar" key={i}>
                   <h4 id={v}>{v}</h4>
                   {
                    this.props.index.list[v].map((val,ind)=>{
                      return <ul className="carlist" key={ind}>
                            <li onClick={()=>this.getMasterID(val.MasterID)}><img data-src={val.CoverPhoto} src={val.CoverPhoto} alt=""/><span>{val.Name}</span></li>
                          </ul>
                    })
                   }
                   </div>
                }) 
               }
              </div>
          </div> 
          <Adside showId={this.state.showId} getShowId={this.getShowId}></Adside>
          <div className="carRightContent" ref="rightH">
              {
                Object.keys(this.props.index.list).map((v,i)=>{
                  return <span 
                  onTouchStart={(e)=>this.onTouchStart(e)} 
                  key={i}>{v}</span>
                }) 
              }
          </div>
         
          
      </div>
    )
  }
}
export default App;
// export default Load(App);