import React, {useEffect} from 'react';
import Echarts from 'echarts'

export default props => {
  useEffect(() => {
    // 初始化echarts实例
    let myChart = Echarts.init(document.getElementById('main'));

    // 配置项和数据
    let option = {
      angleAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          z: 10
      },
      radiusAxis: {
      },
      polar: {
      },
      series: [{
          type: 'bar',
          data: [1, 2, 3, 4, 3, 5, 1],
          coordinateSystem: 'polar',
          name: 'A',
          stack: 'a'
      }, {
          type: 'bar',
          data: [2, 4, 6, 1, 3, 2, 1],
          coordinateSystem: 'polar',
          name: 'B',
          stack: 'a'
      }, {
          type: 'bar',
          data: [1, 2, 3, 4, 1, 2, 5],
          coordinateSystem: 'polar',
          name: 'C',
          stack: 'a'
      }]
  };

    // 显示图表
    myChart.setOption(option);
  }, [])

  return <div>
    <div id="main" style={{width: '100%',height:'400px',background:'#ccc'}}></div>
  </div>
}