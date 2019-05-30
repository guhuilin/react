import React, { useEffect } from 'react';

export default props => {
  useEffect(() => {
    var map = new window.BMap.Map("map");          // 创建地图实例  
    var point = new window.BMap.Point(116.404, 39.915);  // 创建点坐标  
    map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别 
    map.addControl(new window.BMap.NavigationControl());     // 平移缩放控件
    map.addControl(new window.BMap.ScaleControl());     //比例尺, 显示地图的比例关系
    map.addControl(new window.BMap.OverviewMapControl());

    
    // ip地址定位
    function myFun(result) {
      var cityName = result.name;
      map.setCenter(cityName);
      var point = new window.BMap.Point(result.center.lng, result.center.lat);  // 创建点坐标  
      map.centerAndZoom(point, 15);         // 初始化地图，设置中心点坐标和地图级别 
      map.addEventListener("click", function(){    
        console.log(this.Tg)   
      });
    }
    var myCity = new window.BMap.LocalCity();
    myCity.get(myFun);
  })

  return (
    <div id="map" style={{ width: '100%', height: '100%' }}>
      map
    </div>
  )
}