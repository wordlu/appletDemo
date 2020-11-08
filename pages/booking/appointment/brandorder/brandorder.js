// pages/booking/appointment/brandorder/brandorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kids: [],
    choosedKidId: [],
    brand: {},
    add_icon: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/add%402x.png",
    choosedKidsId: [],
    bar: '报名信息',
    showTelModal: false,
    errorInfo: false,
    now: '',
    noKids: true,
    android: getApp().globalData.android,
    iosX: getApp().globalData.iosX,
    customNavBarHeight: getApp().globalData.customNavBarHeight,
    pageContantHeight: getApp().globalData.pageContantHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,
    lm = require('../../../../models/bm_applyee_schema.js'),
    bmconfig = require('../../../../models/bm_config.js'),
    store = require('../../../../models/bm-data.js').store,
    OSS = require('../../../../models/ali-oss.js');
    let client = new OSS({
        region: 'oss-cn-beijing',
        accessKeyId: 'LTAINO7wSDoWJRfN',
        accessKeySecret: 'PcDzLSOE86DsnjQn8IEgbaIQmyBzt6',
        bucket: 'bmsass'
      });
    store.clearStore()
    store.Find('brands', bmconfig.bm_baizao_id).then(res => {
      if(res.logo.length > 0){
        res.newLogo = client.signatureUrl(res.logo)
      }
      this.setData({
        brand: res,
      })
    })
    store.clearStore()
    store.Query('kids', 'applicant-id=' + wx.getStorageSync('dd_id')).then(result => {
      let res = result;
      res.forEach((ele) => {
        let dob = new Date(ele.dob),
          dn = new Date();

        ele.age = dn.getFullYear() - dob.getFullYear();
      })
      that.setData({
        kids: res,
        noKids: res.length === 0 ? true : false,
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

  },

  kidRadioChange: function (e) { 
    let arr = []
    arr.push(e.detail.value)
    console.log("^^^^^^^^^^^^^^"+e.detail.value)
    this.setData({
      choosedKidId: arr
    })
  },

  addChild: function () {
    wx.redirectTo({
      url: '/pages/booking/appointment/addkid/addkid?wherefrom=brandorder'
    })
  },

  //提交报名
  apply: function() {
    if (this.data.choosedKidId.length == 0) {
      this.setData({
        errorInfo: true
      })
      setTimeout(function () {
        that.setData({
          errorInfo: false
        })
      }, 1600)
    } else {
      let that = this,
        bmconfig = require('../../../../models/bm_config.js');
        let store = require('../../../../models/bm-data.js').store,
          tmp_appliesdatum = {
            "apply-time": new Date().getTime(),
            "brand-id": bmconfig.bm_baizao_id,
            "status": 0,
            "kid-ids": this.data.choosedKidId,
            "applicant-id": wx.getStorageSync('dd_id'),
          },
          appliesdata = store.createRecord('applies', tmp_appliesdatum);
        store.clearStore()
        store.Save('applies', appliesdata).then(res => {
          let that = this,
            bmconfig = require('../../../../models/bm_config.js');
          wx.navigateTo({
            //url: '/pages/booking/appointment/result/result?appliesid=' + res.id,
            url: '/pages/booking/appointment/brandresult/brandresult?brandtitle=' + this.data.brand.title
          })
        })
    }
    
  },
})