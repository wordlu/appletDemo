// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headImg: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/brand_logo.png",
    headName: "Kent",
    icon_enter: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_chevron_right_dark%402x.png",
    list: [{
        name: "我的服务",
        detail: "../ms/ms"
      },
      {
        name: "管理孩子",
        detail: "../manageChild/manageChild"
      }
    ],
    android: getApp().globalData.android,
    iosX: getApp().globalData.iosX,
    customNavBarHeight: getApp().globalData.customNavBarHeight,
    pageContantHeight: getApp().globalData.pageContantHeight,
    bar: '咚哒精选',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      android: getApp().globalData.android,
      iosX: getApp().globalData.iosX,
      //bar: wx.getStorageSync('mername')
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  backToList() {
    wx.redirectTo({
      url: '/pages/brand/lst/lst',
    })
  },

  onShareAppMessage: function() {
    return {
      title: "转发给好友",
      // imageUrl: "/utils/image/mineselected.png",
      path: "/pages/register/register"
    }
  },

  phoneCall: function() {
    wx.makePhoneCall({
      phoneNumber: '18701093983',
      success: function() {
        console.log("拨打电话成功！")
      },
      fail: function() {
        console.log("拨打电话失败！")
      }
    })
  }
})