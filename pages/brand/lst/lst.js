// pages/info-two/info-two.js 
var OSS = require('../../../models/ali-oss.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true,
    showModalStatus: true,
    bar: "咚哒精选",
    android: getApp().globalData.android,
    iosX: getApp().globalData.iosX,
    customNavBarHeight: getApp().globalData.customNavBarHeight,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      android: getApp().globalData.android,
      iosX: getApp().globalData.iosX
    });

    let tmp = options.redir
    console.log('tmp: ', tmp)
    if (tmp) {
      wx.setStorageSync('qr_page', tmp)
    }
    let tid = options.reservableid
    console.log('tid: ', tid)
    if (tid) {
      wx.setStorageSync('qr_page_id', tid)
    }
    let brandid = options.brandid
    if (brandid) {
      wx.setStorageSync('brandid', brandid)
    }

    let client = new OSS({
      region: 'oss-cn-beijing',
      accessKeyId: 'LTAINO7wSDoWJRfN',
      accessKeySecret: 'PcDzLSOE86DsnjQn8IEgbaIQmyBzt6',
      bucket: 'bmsass'
    });
    let that = this;

    let store = require('../../../models/bm-data.js').store;
    store.clearStore()
    // store.FindAll('brands').then(res => {
    //   let newres = res.map((ele) => {
    //     let logo = ele.logo;
    //     ele.dealLogo = client.signatureUrl(logo);
    //     return ele
    //   })
    //   let list = [];
    //   res.map((ele) => {
    //       if (ele.id != '5c19bbce25c6b0000188f4bc') {
    //           list.push(ele);
    //       }
    //       return list
    //   })
    //   that.setData({
    //       brandList: list
    //   })
    // })
    that.setData({
      brandList: [
        {
          "category": {
            "title": "课程1",
          },
          "title": "如何激发孩子的学习兴趣",
          "slogan": "培养良好的亲子关系，胜过许多教育",
          "brand-tags": ["教育", "培养", "亲子关系"]
        }
      ]
    })
    wx.stopPullDownRefresh();
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
  onShareAppMessage: function(event) {

  },

})