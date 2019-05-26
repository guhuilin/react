import { observable, action } from "mobx";
import { getAllDataApi, getSlideDataApi } from '../../api/index'

export default class Index {
	@observable data;
	@observable dataRight;
	@observable allData;
	@observable slideShow;
	@observable slideData;

	// 初始化
	constructor() {
		this.data = [];
		this.dataRight = ['#'];
		this.allData = {};
		this.slideShow = false;
		this.slideData = [];
	}

	@action async getAllData() {
		let xxx = await getAllDataApi();

		// 处理数据,便于渲染
		let obj = {};
		xxx.data.data.map(item => {
			if(obj[item.Spelling[0]]){
				obj[item.Spelling[0]].push(item)
			}else{
				obj[item.Spelling[0]] = []
				obj[item.Spelling[0]].push(item)
			}
			
			// 获取右边侧边栏的数据
			this.dataRight.push(item.Spelling.slice(0,1));
			return this.dataRight = Array.from(new Set(this.dataRight));
		})

		this.allData = obj;
		this.data = xxx.data.data;
	}

	@action async getSlideData(payload) {
		let xxx = await getSlideDataApi(payload);
		this.slideData = xxx.data.data;
		console.log(xxx.data.data,'...xxx')
	}
}   