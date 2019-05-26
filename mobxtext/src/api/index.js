import request from '../utils/request'

// 获取页面初始数据
export function getAllDataApi() {
  return request('https://baojia.chelun.com/v2-car-getMasterBrandList.html')
}

// 获取页面子侧边栏数据
export function getSlideDataApi(params) {
  return request('https://baojia.chelun.com/v2-car-getMakeListByMasterBrandId.html?MasterID=' + params)
}