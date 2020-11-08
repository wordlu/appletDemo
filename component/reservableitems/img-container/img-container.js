// component/class-banner/img-containger/img-container.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    exp: {
      type: "Array",
      value: [],
      observer: function (news, olds, path) {
        //console.log(news.sessioninfo.title.length)
        //console.log("this is in img-container .js")
        console.log(news, olds)
      }
    }
  },
  
  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    circular: true,
    pointerColor: "#FFFFFF",
    interval: 2000,
    duration: 1000,
    curIndex: 0,
    screenWidth: wx.getSystemInfoSync().windowWidth,
    images: [
      {
        url: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_cover_trialclass_01.jpg"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeIndex: function(e) {
      let index = e.detail.current
      //console.log("hhhhhhhhh "+index)
      this.setData({
        curIndex: index,
      })
    }
  }
})
