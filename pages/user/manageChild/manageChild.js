// pages/user/manageChild/manageChild.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    android: getApp().globalData.android,
    iosX: getApp().globalData.iosX,
    customNavBarHeight: getApp().globalData.customNavBarHeight,
    pageContantHeight: getApp().globalData.pageContantHeight,
    bar: '管理孩子',
    kids: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this,
    store = require('../../../models/bm-data.js').store;
    store.clearStore()
    store.Query('kids', 'applicant-id=' + wx.getStorageSync('dd_id')).then(result => {
      that.setData({ 
        kids: result
      })
    })
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

  goback: function() {
    wx.switchTab({
      url: '/pages/user/info/info',
    })
  },

  addChild: function() {
    wx.navigateTo({
      url: '/pages/booking/appointment/addkid/addkid?wherefrom=managerkids&candel=0',
    })
  }
})