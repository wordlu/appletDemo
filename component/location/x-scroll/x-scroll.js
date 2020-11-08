// component/activities/acti-banner/acti-banner.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
	tagimgs: {
	  type: "Array",
	  value: [],
	  observer: function (news, olds, path) {
		console.log(news)
	  }
	}
  },

  /**
   * 组件的初始数据
   */
  data: {
	activityInfo: [{
	  title: "休息区",
	  url: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_campus_type_living.jpg",
	} , {
	  title: "教学区",
		url: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_campus_type_teaching.jpg",
	}, {
	  title: "教学区",
		url: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_campus_type_teaching.jpg",
	}
	]
  },

  /**
   * 组件的方法列表
   */
  methods: {
	showActiDetail: function (event) {
		wx.navigateTo({
			url: '/pages/activity/detail/detail'
	  	})
	},
	showLst: function (event) {
	  	wx: wx.navigateTo({
			url: '/pages/reservableitems/actvs/lst/lst',
		})
	}
  }
})
