// component/classes/cls-info/cls-info.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    exp: {
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
    sort: "数理逻辑",
    name: '科学小屋来探索一下子',
    img1: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_age%402x.png",
    img2: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_time%402x.png",
    img3: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_address%402x.png",
    img4: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/phone%402x.png",
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
