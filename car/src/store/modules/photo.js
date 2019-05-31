import { observable, action } from "mobx";
import { getPicture,getColor,getPictureStyle,getCity,getEveryCity,getEveryCar } from '../../serives/index'
export default class Photo{ 
    
    @observable photolist;
    @observable colorlist;
    @observable morelist;
    @observable citylist;
    @observable citylists;
    @observable everyCarList;
    @observable url;

    // 初始化
    constructor(){
        this.photolist = []
        this.colorlist = []
        this.morelist = []
        this.citylist = []
        this.citylists = []
        this.everyCarList = []
        this.url = ''
    }

    @action async getEveryUrl(params){
         console.log(params,'params.........')
         this.url = params.Url
         return this.url
    }

    @action async getCurPicture(params,time) {
        let data = await getPicture(params,time)
        if(data.code == 1){
            data.data.map((v,i)=>{
                v.List.map((item,ind)=>{
                   return item.Url = item.Url.replace(/\{0\}/g,3)
              })
            })
            this.photolist = data.data
        }
    }
    @action async getCurColor(params,time) {
        let data = await getColor(params,time)
        if(data.code == 1){
            this.colorlist = data.data
            return data.data
        }
    }

    @action async getCurPictureStyle(params,time) {
        let data = await getPictureStyle(params,time)
        if(data.code == 1){
                data.data.List.map((item,ind)=>{
                   return item.Url = item.Url.replace(/\{0\}/g,3)
              })
            this.morelist.push(data.data)
        }
    }
    
    @action async getCurCity(time) {
        let data = await getCity(time)
        if(data.code == 1){
           this.citylist = data.data
        }
        
    }

    @action async getCurEveryCity(time) {
        let data = await getEveryCity(time)
        if(data.code == 1){
           this.citylists = data.data
        }
        
    }

    @action async getCurEveryCar(params,time) {
        let data = await getEveryCar(params,time)
        console.log(this.url,'this.url...')
        
        if(data.code == 1){
            data.data.List.map((item,ind)=>{
                return item.Url = item.Url.replace(/\{0\}/g,3)
           })
           
        
            this.everyCarList = data.data
            return data.data
        }
        
    }
}   