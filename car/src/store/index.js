import { autorun } from "mobx";
// 引入模块
import Index from './modules/index';
import Photo from './modules/photo';

let index  = new Index();
let photo  = new Photo();

// 追踪数据变化
autorun(() => {
    console.log('count触发了改变....', index.count);
});

export default {
    index,
    photo
}