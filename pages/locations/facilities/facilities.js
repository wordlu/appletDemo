// pages/locations/facilities/facilities.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customNavBarHeight: getApp().globalData.customNavBarHeight,
    facilities: [{
      image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_camear%402x.png",
      name: "实时监控"
    },
    {
      image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_entranceguard%402x.png",
      name: "门禁"
    },
    {
      image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_emergency%402x.png",
      name: "急救包"
    },
    {
      image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_floor%402x.png",
      name: "防摔地板"
    },
    {
      image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_emergency%402x.png",
      name: "急救包"
    },
    {
      image: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_floor%402x.png",
      name: "防摔地板"
    },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let yardid = options.yardid
    console.log("1111"+yardid)
    let store = require('../../../models/bm-data.js').store;
    store.clearStore()
    store.Find('yards', yardid).then(res => {
      let notDealFacili = res.facilities
      let facilities = []
      for (let idx = 0; idx < notDealFacili.length; idx++) {
        var facility = new Object()
        facility.name = notDealFacili[idx]
        switch (notDealFacili[idx]) {
          case "实时监控":
            facility.image = "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_camear%402x.png";
            break;
          case "门禁":
            facility.image = "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_entranceguard%402x.png";
            break;
          case "急救包":
            facility.image = "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_emergency%402x.png";
            break;
          case "防摔地板":
            facility.image = "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_floor%402x.png";
            break;
          default:
            facility.image = "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_camear%402x.png";
            break;
        }
        facilities.push(facility)
      }
      this.setData({
        facilities: facilities
      })
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})