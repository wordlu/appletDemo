// component/brand/brand-top2/brand-top2.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    brand: {
      type: "Object",
      value: null,
      observer: function (news, olds, path) {
        console.log(news)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    img: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/brand%20detail%20copy%203%402x.png",
    scan: 　"https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_scan%402x.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    brandDetails: function (event) {
      let brandid = event.currentTarget.dataset.brandid;
      wx: wx.navigateTo({
        url: '/pages/brand/detail/detail?brandid' + brandid
      })
    },

    scanclick: function (res) {
      wx.scanCode({
        success: (res) => {
          let parse = require('url-parse')
          let url = parse(res.path, true);

          let tmp = url.query.redir
          let tid = url.query.reservableid
          let dir = ''
          if (tmp && tmp.startsWith('exp') && tid && tid != "") {
            dir = '/pages/reservableitems/detail/detail?expid=' + tid
          }
          else if (tmp && tmp.startsWith('actv') && tid && tid != "") {
            dir = '/pages/activity/detail/detail?actvid=' + tid
          } else if (tmp && tmp.startsWith('pre')) {
            dir = '/pages/preregister/preregister'
          } else {
            dir = '/pages/brand/info/info'
          }
          console.log(dir)
          if (dir.length > 0) {
            wx.navigateTo({
              url: dir,
            })
          } else {
            console.log('二维码错误')
          }
        }
      })
    },
  }
})
