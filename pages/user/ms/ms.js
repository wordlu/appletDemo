// pages/user/myService/myService.js
var OSS = require('../../../models/ali-oss.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    android: getApp().globalData.android,
    iosX: getApp().globalData.iosX,
    customNavBarHeight: getApp().globalData.customNavBarHeight,
    //pageContantHeight: getApp().globalData.pageContantHeight,
    bar: '我的服务'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this,
    lm = require('../../../models/bm_applyee_schema.js'),
    bmconfig = require('../../../models/bm_config.js');

    if (!lm.checkIsLogin()) {
      wx.redirectTo({
        url: '/pages/register/register'
      })
      return
    }
    let store = require('../../../models/bm-data.js').store,
    tmp_applies = [];
    wx.showLoading({
      title: '加载中',
    });
    store.clearStore()
    store.Query('applies', 'applicant-id=' + wx.getStorageSync('dd_id')).then(res => {
      // 如果不进行这一步会报错
      tmp_applies = res.map(ele => {
        ele.applicant = [];
        return ele;
      });

      let reservablePromise = tmp_applies.map(ele => {
        let reservableitemId = ele['reservable-id'];
        return store.Find('reservableitems', reservableitemId)
      })

      return Promise.all(reservablePromise)
    }).then(res => {
      res.forEach(ele => {
        tmp_applies.forEach(item => {
          if (item['reservable-id'] == ele.id) {
            item['reservable-cover'] = ele.sessioninfo.cover;
            item['reservable-title'] = ele.sessioninfo.title;
            item['reservable-price'] = ele.price || '免费';
          }
        })
      })
      // that.setData({
      //   list: tmp_applies
      // })
      let yardsPromise = tmp_applies.map(ele => {
        let brandId = ele['brand-id'];
        return store.Query('yards', "brand-id=" + brandId)
      })

      return Promise.all(yardsPromise)
    }).then(res => {
      res.forEach(ele => {
        tmp_applies.forEach(item => {
          // if (item['reservable-id'] == ele.id) {
          item['yard-address'] = ele[0].address;
          // }
        })
      })
      that.setData({
        list: tmp_applies
      })
      wx.hideLoading();
    })
    // bmapply.queryMultiObjects(callback)
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

  }

})