// component/classes/cla-banner/cla-banner.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		isList: {
			type: String,
			value: 'true',
		},
		exps:{
			type:"Array",
			value:[],
			observer:function(news,olds,path){
					let exp = [],
          brandid = '';
					if(news != null) {
							news.map((ele) => {
                  brandid = ele['brand-id'];
                  if (ele['start-date'] != -1 && ele['end-date'] != -1) {
											exp.push(ele)
									}
							})
							this.setData({
									exp: exp,
                  brandid: brandid
							})
					}  
			}
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		showClasses: function (event) {
			wx.navigateTo({
        url: '/pages/reservableitems/exps/lst/lst?brandid=' + this.data.brandid + '&status=1' + '&bar=精选体验课'
			})
		},
		showClsDetail: function (event) {
			let expid = event.currentTarget.dataset.expid;
			wx.navigateTo({
				url: '/pages/reservableitems/detail/detail?expid=' + expid
			})
		}
	}
})
