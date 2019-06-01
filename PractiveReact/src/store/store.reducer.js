//
const initState = {
	leftData: [],
	isShow: false,
	rightData: [],
	allData: []
}

let allReducer = (state= initState,action)=> {
  switch(action.type){
    case 'ALL_DATA':    //获取所有数据
      return {
        ...state,
        allData:[...action.data]
      }
    case 'ADD_SOYDATA':     //豆浆++ --
      return {
        ...state,
        allNum:action.num,
        soyData:[...action.data]
      }
    case 'ALL_FRIEDDATA':  //获取油条数据
      return {
        ...state,
        friedData:[...action.data]
      }
    case 'ADD_FRIEDDATA':  //油条++ --
      return {
        ...state,
        allNum:action.num,
        friedData:[...action.data]
      }
    case 'CHANGEALL':        //修改购物车数据
    console.log(action)
      return {
        ...state,
        soyData:[...action.soyData],
        friedData:[...action.friedData],
        allNum:action.num,
      }
    default :
      return state;
  }
}

export default allReducer;