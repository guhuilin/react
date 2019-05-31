import React,{useEffect} from 'react';
import LpzImg from '../assets/lpz.jpg'
// import echarts from 'echarts/lib/echarts';
// import 'echarts-gl';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';
// import 'echarts/lib/component/axisPointer/globalListener';
export default props =>{
  useEffect(()=>{
    var map = new window.BMap.Map("container"); 
    // 创建地图实例  
    // var point = new window.BMap.Point(116.404, 39.915);  // 创建点坐标  
    // map.centerAndZoom(point, 15);  
    map.enableScrollWheelZoom(true); 
      map.setCenter('八维研修学院(第二校区)');
      var point = new window.BMap.Point(116.306744,40.047403); 
      map.centerAndZoom(point, 15);
      // 定义自定义覆盖物的构造函数  
      function SquareOverlay(center, length, src){
        this._center = center;
        this._length = length;
        this._src = src;
      }
      // 继承API的BMap.Overlay
      SquareOverlay.prototype = new window.BMap.Overlay(); 
      SquareOverlay.prototype.initialize = function(map){
        // 保存map对象实例
        this._map = map;
        // 创建div元素，作为自定义覆盖物的容器
        var Img = document.createElement("img");
        Img.style.position = "absolute";
        // 可以根据参数设置元素外观
        Img.style.width = this._length + "px";
        Img.style.height = this._length + "px";
        Img.src = this._src;
        // 将div添加到覆盖物容器中
        map.getPanes().markerPane.appendChild(Img);
        // 保存div实例
        this._Img = Img;
        // 需要将div元素作为方法的返回值，当调用该覆盖物的show、
        // hide方法，或者对覆盖物进行移除时，API都将操作此元素。
        return Img;
      }
      // 实现绘制方法   
      SquareOverlay.prototype.draw = function(){    
        // 根据地理坐标转换为像素坐标，并设置给容器    
            var position = this._map.pointToOverlayPixel(this._center);    
            this._Img.style.left = position.x - this._length / 2 + "px";    
            this._Img.style.top = position.y - this._length / 2 + "px";    
      }
      
      // 添加自定义覆盖物   
      var mySquare = new SquareOverlay(map.getCenter(), 50, LpzImg);    
      map.addOverlay(mySquare); 
      var driving = new window.BMap.TransitRoute(map, { 
        renderOptions: { 
            map: map, 
            autoViewport: true 
    } 
    });
    var start = new window.BMap.Point(116.306744,40.047403);
    var end = new window.BMap.Point(111.526184,36.12992);
    driving.search(start, end);

  })
  return <div id="container"></div>
}
// class ECharts extends Component {
//   constructor(props){
//     super(props)
//     this.state = {
      
//     }
//   }
//   componentDidMount(){
//     let myChart = echarts.init(document.getElementById('main'));
//     myChart.setOption({
//       title:{
//         show:true
//       },
//       angleAxis: {
//           type: 'category',
//           data: ['其他资产', '设备', '交替运输工具', '房产', '土地使用权'],
//           z: 10
//       },
//       tooltip:{show:'true'},
//       radiusAxis: {
//       },
//       polar: {
//       },
     
//       series: [{
//           name:'成交总数',
//           type: 'bar',
//           coordinateSystem: 'polar',
//           color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da'],
//           data: [
//             {
//             value:3,
//             name:'其他资产',
//             backgroundColor:'red',
//             label: {
//               show : true,
//               position : 'inner',
              
//           }
//         },
//             {value:1,name:'设备',
//             label: {
//               show : true,
//               position : 'inner',
//           }},
//             {value:2,name:'交替运输工具',
//             label: {
//               show : true,
//               position : 'inner',
              
//           }},
//             {value:2,name:'房产',
//             label: {
//               show : true,
//               position : 'inner',
              
//           }},
//             {value:1,name:'土地使用权',
//             label: {
//               show : true,
//               position : 'inner',
              
//           }},
//           ],

//           stack: 'a'
//       }]
//   })
// }
  
//   render(){
//     return (
//       <div id="container"></div> 
//     )
//   }
// }
// export default ECharts;
