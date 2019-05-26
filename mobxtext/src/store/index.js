import { autorun } from 'mobx';

// 引入模块
import Count from './modules/count'
import Index from './modules/index'

// 实例化
const count = new Count();
const index = new Index();

// 追踪数据变化
autorun(() => {
  console.log('count变成了...',count);
  console.log('index变成了...',index);
})

export default {
  count,
  index
}