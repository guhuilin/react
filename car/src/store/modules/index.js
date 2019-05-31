import { observable, action } from "mobx";
import { getAllCar,getSideCar,getDetail,getCityID,getAskPrice } from '../../serives/index'
export default class Index{ 
    
    @observable list;
    @observable sideList;
    @observable detailList;
    @observable everylist;
    // 初始化
    constructor(){
       this.list = []
       this.sideList = []
       this.detailList = []
       this.SerialID = ''
       this.CityId = ''
       this.CityNames = ''
       this.everylist = ''
    }
    
    @action async autoAdd(time) {
        let data = await getAllCar(time)
        if(data.code == 1){
            let obj = {}
            data.data.forEach((v,i) => {
                if(obj[v.Spelling[0]]){
                   obj[v.Spelling[0]].push(v)
                }else{
                   obj[v.Spelling[0]] = [];
                   obj[v.Spelling[0]].push(v)
                }
            });
            this.list = obj
        }
        return this.list
    }

    @action async getCurMasterID(parmas,time) {
        let data = await getSideCar(parmas,time)
        if(data.code == 1){
            this.sideList = data.data
        }
    }
     
    @action async getCurDetail(parmas,time){
        let data = await getDetail(parmas,time)
        if(data.code == 1){
            data.data.list.sort((a,b)=>{
                //排量升序
                if(a.exhaust !== b.exhaust){
                    return a.exhaust - b.exhaust;
                }else{
                    //发动机功率升序
                    if(a.max_power !== b.max_power){
                        return a.max_power - b.max_power
                    }else{
                        //吸气方式
                        if(a.inhale_type !== b.inhale_type){
                            if(a.inhale_type < b.inhale_type){
                               return -1;
                            }else{
                                return 1;
                            }
                        }else{
                            //年份降序
                            return b.market_attribute.year-a.market_attribute.year
                        }
                    }
                }
            })
            data.data.list.forEach(item=>{
               item.type = `${item.exhaust_str}/${item.max_power_str} ${item.inhale_type}`
            })
            
            this.detailList = data.data
            return data.data
        }
    }

    @action async getCurCityID(time){
        let data = await getCityID(time)
        if(data.code == 1){
            this.CityId = data.data.CityID
            this.CityNames = data.data.CityName
            return {
                CityId:this.CityId,
                CityNames:this.CityNames
            }
        }
        
    }
    // getAskPrice
    @action async getCurAskPrice(params,time){
        let data = await getAskPrice(params,time)
        return data.data
        
    }
    
}   