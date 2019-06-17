import Vue from 'vue';

class Utils extends Vue {
    constructor () {
        super();
		this.attr_result = [];
    }
    /*
     * 封装element-ui中的$confirm方法作为提示用
     * -msg : 提示内容
     */
    msg (msg = null) {
        if (!msg) {
           throw new Error('utils类中msg方法缺省必要参数msg')
        }
        this.$confirm(msg,'提示',{
            showClose : false, //是否显示右上角关闭按钮
            showCancelButton :false,//是否显示取消按钮
            closeOnClickModal :false,//是否允许点击mask关闭对话框
        })
    }
	/*
	 用来根据二维数组，生成属性规格数据
	 */
	data_for_attrArr (arr,level = 0,stringBuffer = '') {
		
		let obj;
		//判断是一维数组还是二维数组
		if (arr.length > 1) {//二维数组
			for (let i = 0; i < arr[level].length; i ++) {
				if (level != arr.length - 1) {
					this.data_for_attrArr(arr,level + 1, stringBuffer + arr[level][i].label + '/')
				} else {
					obj = {
						attr_name : stringBuffer + arr[level][i].label + '/',
<<<<<<< HEAD
						supply_price : null,
=======
						supply_porice : null,
>>>>>>> c682996d9de421ea46b2902c6935dc55482c6071
						img : null,
						stock : null,
						sku : null
					}
					this.attr_result.push(obj)
				}
			}
		} else {//一维数组
			for (let i = 0; i < arr[0].length; i ++) {
				obj = {
					attr_name : stringBuffer + arr[level][i].label,
<<<<<<< HEAD
					supply_price : null,
=======
					supply_porice : null,
>>>>>>> c682996d9de421ea46b2902c6935dc55482c6071
					img : null,
					stock : null,
					sku : null
				}
				this.attr_result.push(obj)
			}
			
		}
		return this.attr_result;
	}
}

export default new Utils;