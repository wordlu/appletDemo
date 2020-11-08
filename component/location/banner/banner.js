// component/location-banner/location-banner.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    yard: {
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
    title: "PRO科学空间站青年路站间站青年路间站青年路",
    address: "朝阳区东直门第三方大厦A门第三",
    bgImg: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_location.png",
    bgLiving: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_campus_type_living.jpg",
    bgIndoor: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_campus_type_indoor.jpg",
    bgOutdoor: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_campus_type_outdoor.jpg",
		locations: [
			{
				title: "天鹅湾",
				address: "青年路甘露园中街天鹅南区"
			},
			{
				title: "青年路",
				address: "青年路甘露园中街天鹅南区"
			},
			{
				title: "甘露园",
				address: "青年路甘露园中街天鹅南区"
			},
		]
  },
   markers: [{
      // iconPath: "/resources/others.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    
    controls: [{
      id: 1,
      // iconPath: '/resources/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }],

  /**
   * 组件的方法列表
   */
  methods: {
    showLocations: function (event) {
      wx.navigateTo({
        url: '/pages/locations/details/details'
      })
    },

    showLocations: function (event) {
      let yardid = event.currentTarget.dataset.yardid;
      wx.navigateTo({
        url: '/pages/locations/details/details?yardid=' + yardid 
      })
    },
  }
})
