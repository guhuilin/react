import request from '../util/request.js'

//全部汽车
export function getAllCar(time){
   return request.get(`https://baojia.chelun.com/v2-car-getMasterBrandList.html?${time}`)
}
//侧边
export function getSideCar(params,time){
   return request.get(`https://baojia.chelun.com/v2-car-getMakeListByMasterBrandId.html?MasterID=${params}&${time}`)
}

//进详情  
export function getDetail(params,time){
   return request.get(`https://baojia.chelun.com/v2-car-getInfoAndListById.html?SerialID=${params}&${time}`)
}

//获取当前城市id
export function getCityID(time){
   return request.get(`https://baojia.chelun.com/location-client.html?_1557969802768`)
}

//点击询问底价
export function getAskPrice(params,time){
  return request.get(`https://baojia.chelun.com/v2-dealer-alllist.html?carId=${params.carId}&cityId=${params.cityId}&${time}`)
}

//获取图片
export function getPicture(params,time){
   console.log(params.CarID,'params.CarID.....')
   if(params.ColorID){
      return request.get(`https://baojia.chelun.com/v2-car-getImageList.html?SerialID=${params.SerialID}&ColorID=${params.ColorID}&${time}`)

   }else if(params.CarID){
      return request.get(`https://baojia.chelun.com/v2-car-getImageList.html?SerialID=${params.SerialID}&CarID=${params.CarID}&${time}`)

   }else{
      return request.get(`https://baojia.chelun.com/v2-car-getImageList.html?SerialID=${params.SerialID}&${time}`)

   }
}
//颜色
export function getColor(params,time){
   return request.get(`https://baojia.chelun.com/v2-car-getModelImageYearColor.html?SerialID=${params.SerialID}&${time}`)
 
 }
 //点击外观
export function getPictureStyle(params,time){
 return request.get(`https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=${params.SerialID}&ImageID=${params.Id}&Page=${params.page}&PageSize=${params.PageSize}&${time}`)
}
 //获取城市
 export function getCity(time){
   return request.get(`https://baojia.chelun.com/v1-city-alllist.html?${time}`)
}

//获取每个城市
export function getEveryCity(params,time){
   return request.get(`https://baojia.chelun.com/v1-city-alllist.html?provinceid=${params.CityID}&${time}`)
}

//点击获取每辆车
export function getEveryCar(params,time){
   console.log(params.ColorID)
   if(params.ColorID){
      return request.get(`https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=${params.SerialID}&ImageID=${params.ImageID}&ColorID=${params.ColorID}&Page=1&PageSize=30&${time}`)
      
   }else{
      return request.get(`https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=${params.SerialID}&ImageID=${params.ImageID}&Page=1&PageSize=30&${time}`)

   }
}