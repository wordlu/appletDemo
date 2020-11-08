// pages/locations/details/details.js

var OSS = require('../../../models/ali-oss.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    yard: null,
    title: "PRO科学空间站青年路站",
    address: "朝阳区东直门外大街第三方大厦A座 1101室",
    tag: ["购物中心", "室内"],
    traffic: "距地铁6号线潞城站B口步行500m",
    certImgs: [],
    schoolTags: [{
        img: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_campus_%20certification.jpg",
        name: "儿童适宜标准"
      },
      {
        img: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_campus_%20certification.jpg",
        name: "儿童适宜标准"
      }
    ],
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
    customNavBarHeight: getApp().globalData.customNavBarHeight,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    var lm = require('../../../models/bm_applyee_schema.js');
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

    let bmconfig = require('../../../models/bm_config.js')
    let store = require('../../../models/bm-data.js').store;
    store.clearStore()
    store.Find('yards', bmconfig.bm_baizao_yard_id).then(res => {
      let tagimgs = res.images.filter(function(e) {
        return e.flag == 0;
      })
      let undealCertImgs = res.images.filter(function(e) {
        return e.flag == 2;
      })
      let newimgs = tagimgs.map((ele) => {
          let tagImg = ele.img;
          ele.dealImg = client.signatureUrl(tagImg);
          return ele
      })
      let certImgs = undealCertImgs.map((ele) => {
        let img = ele.img;
        ele.dealImg = client.signatureUrl(img);
        return ele;
      })
      //获取设施
      let notDealFacili = res.facilities
      let facilities = []
      for(let idx = 0; idx < notDealFacili.length; idx++) {
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
      for(let idx = 0; idx < facilities.length; idx++){
        console.log(facilities[idx].name)
      }
      that.setData({
        yard: res,
        yardimages: newimgs,
        certImgs: certImgs,
        facilities: facilities,
      })
      wx.hideLoading();
    })

    that.setData({
      //bar: wx.getStorageSync('mername')
      bar: "校区详情"
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

  moreFacility: function (e) {
    let bmconfig = require('../../../models/bm_config.js')
    wx.navigateTo({
      url: "/pages/locations/facilities/facilities?yardid=" + bmconfig.bm_baizao_yard_id
    })
  },
})