//  import React from 'react';
//  export default Component =>{
//     return class extends React.Component{
//         scroll(){
//             let imgs = [...this.scrollEl.querySelectorAll('img[data-src]')]
//             imgs.forEach(item => {
//               if (item.src === item.dataset.src) {
//                 return;
//               }
//               let rect = item.getBoundingClientRect()
//               if (rect.top >= 0 && rect.top <= window.innerHeight) {
//                 item.src = item.dataset.src
//               }
//             })
//             }
//             //函数节流  一段时间内允许触发一次
//             throttle(func,delay){
//               let start = +new Date();
//               return function(){
//                   let cur = +new Date();
//                   if(cur - start > delay){
//                      setTimeout(()=>{
//                          func()
//                      },delay)
//                   }
//               }
//             }
//             //函数防抖,一段时间连续触发只会执行最后一次
//             debounce(func,delay){
//                 let time = 0;
//                 return function(){
//                    clearTimeout(time)
//                        time = setTimeout(()=>{
//                            func()
//                        },delay)
//                 }
//               }
//     }
    
// }

export default function LazyImg(selector) {
    
    this.scrollEl = document.querySelector(selector)
    //使用防抖
    this.scrollEl.addEventListener('scroll', this.debounce(this.scroll.bind(this), 300))
    //初次渲染
    this.scroll()
  }
  //滚动事件
  LazyImg.prototype.scroll = function () {
    let imgs = [...this.scrollEl.querySelectorAll('img[data-src]')]
    

    imgs.forEach(item => {
      if (item.src === item.dataset.src) {
        return;
      }
      let rect = item.getBoundingClientRect()
      if (rect.top >= 0 && rect.top <= window.innerHeight) {
        item.src = item.dataset.src
      }
    })
  }
  
  LazyImg.prototype.debounce = function (func, delay) {
    let time = null;
    return function () {
      window.clearTimeout(time)
      time = setTimeout(() => {
        func()
      }, delay);
    }
  }