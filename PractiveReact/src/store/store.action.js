export const getData = (obj)=>{
  return (dispatch,getState)=>{
    dispatch({
      type:'ALL_DATA',
      data:obj
    })
  }
}

export const computedSoy = (ind,type)=>{
  return (dispatch,getState)=>{
    let { soyData, allNum } = getState().allReducer
    if(type==='add'){
      soyData[ind].num++
      allNum ++
    }else{
      soyData[ind].num--
      allNum --
    }
    
    dispatch({
      type:'ADD_SOYDATA',
      data:soyData,
      num:allNum
    })
  }
}
