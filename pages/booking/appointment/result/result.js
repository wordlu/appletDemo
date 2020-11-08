// pages/booking/appointment/result/result.js

let OSS = require('../../../../models/ali-oss.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reservable: null,
    infoTitle: "乐高机器人搭建课",
    infoTime: "2018-03-08 周六",
    listTitle: "PRO科学空间 五道口校区",
    listAddress: "海淀区成府路121-3 华清大厦A座 1106",
    mapIcon: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_map%402x.png",
    noteIcon: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_warning_border%402x.png",
    callIcon: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_call%402x.png",
    successIcon: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_success.png",
    android: getApp().globalData.android,
    iosX: getApp().globalData.iosX,
    customNavBarHeight: getApp().globalData.customNavBarHeight,
    pageContantHeight: getApp().globalData.pageContantHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this,
      lm = require('../../../../models/bm_applyee_schema.js'),
      store = require('../../../../models/bm-data.js').store,
      tmp_reservable = null;
    if (!lm.checkIsLogin()) {
      wx.redirectTo({
        url: '/pages/register/register'
      })
      return
    }
    let client = new OSS({
      region: 'oss-cn-beijing',
      accessKeyId: 'LTAINO7wSDoWJRfN',
      accessKeySecret: 'PcDzLSOE86DsnjQn8IEgbaIQmyBzt6',
      bucket: 'bmsass'
    });
    store.clearStore()
    store.Find('applies', options.appliesid).then(res => {
      let brandId = res['brand-id'];
      var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      var date = new Date(res['except-time']);
      var seperator1 = "-";
      var seperator2 = ":";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var week = date.getDay();

      function addZero(m) {
        return m < 10 ? '0' + m : m;
      }

      tmp_reservable = {
        dealdate: year + seperator1 + addZero(month) + seperator1 + (strDate) + ' ' + weekDay[week],
        yard: {},
        title: res['course-name']
      };
      that.setData({
        reservable: tmp_reservable
      })
      return store.Query('yards', 'brand-id=' + brandId)
    }).then(res => {
      tmp_reservable.yard = res[0];
      that.setData({
        reservable: tmp_reservable
      })
    }).catch(error => {
      console.log(error)
    })
    that.setData({
      bar: options.fromServerList ? "服务详情" : '订单结果页',
      reLaunch: true,
      backtoAppliesList: options.fromServerList || 0
    })
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
  callService: function(e) {
    let phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone,
      success: function() {
        //  console.log("拨打电话成功！")
      },
      fail: function() {
        //  console.log("拨打电话失败！")
      }
    })
  }
})