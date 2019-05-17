import { observable, action } from "mobx";
import { getAllDataApi } from '../../api/index'

export default class Index {
	@observable data;
	@observable dataRight;
	@observable allData;

	// 初始化
	constructor() {
		this.data = [];
		this.dataRight = ['#'];
		this.allData = {}
	}

	@action async getAllData() {
		let xxx = await getAllDataApi();
		let obj = {}
		xxx.data.data.map(item => {
			if(obj[item.Spelling[0]]){
				obj[item.Spelling[0]].push(item)
			}else{
				obj[item.Spelling[0]] = []
				obj[item.Spelling[0]].push(item)
			}
			
			this.dataRight.push(item.Spelling.slice(0,1));
			return this.dataRight = Array.from(new Set(this.dataRight));
		})
		console.log(obj.A,'bj...')
		this.allData = obj;
	  console.log(this.dataRight,'this.dataRight')
		this.data = xxx.data.data;
	}

}   