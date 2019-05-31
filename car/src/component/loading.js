import React from 'react'
import Loading from '../assets/loading.gif'
import '../views/App.scss'
export default Component=>{
    return class extends Component{
        // constructor(props){
        //     super(props);
        // }
        render(){
            // console.log(this.state,'.........')
            return <div className="loading">
            {super.render()}
                {
                    this.state.loading ? <div className="load">
                        <img src={Loading} alt=""/>
                        <p>加载中...</p>
                    </div> : null
                }
            </div>
        }
}
}
// 
