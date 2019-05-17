import request from '../utils/request'

export function getAllDataApi() {
  return request('https://baojia.chelun.com/v2-car-getMasterBrandList.html')
}