// component/common/facility/facility.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    facilities: {
      type: "Object",
      value: null,
      observer: function (news, olds, path) {
        console.log("111111111111"+news)
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    facilities: [],
    // facilities: [
    //   {
    //     image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_camear%402x.png",
    //     name: "实时监控"
    //   },
    //   {
    //     image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_entranceguard%402x.png",
    //     name: "门禁"
    //   },
    //   {
    //     image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_emergency%402x.png",
    //     name: "急救包"
    //   },
    //   {
    //     image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_floor%402x.png",
    //     name: "防摔地板"
    //   },
    //   {
    //     image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_emergency%402x.png",
    //     name: "急救包"
    //   },
    //   {
    //     image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_floor%402x.png",
    //     name: "防摔地板"
    //   },
    // ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    moreFacility: function(e){
      console.log("%%%%%");
      console.log(this.data.facilities)
      wx.navigateTo({
        url: "/pages/locations/facilities/facilities?facilities=" + this.data.facilities
      })
    },
  }
})
