// component/common/navigation-bar/navigation-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    noback: {
      type: String,
      value: 'false',
    },
    reLaunch: {
      type: "Boolean",
      value: false,
      observer: function(news, olds, path) {
        this.setData({
          reLaunch: news
        })
      }
    },
    title: {
      type: "String",
      value: '',
      observer: function(news, olds, path) {
        console.log(news)
        this.setData({
          title: news
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    backIcon: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_back_dark%402x.png",
    title: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    backTo: function() {
      if (this.data.reLaunch) {
        wx.reLaunch({
          url: '/pages/brand/info/info'
        })
      } else {
        wx.navigateBack({
          delta: 1
        })
      }
    }
  }
})