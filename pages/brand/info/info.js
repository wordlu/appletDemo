// pages/brand/brand.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mername: "",
    brandId: null,
    brand: {
      logobg: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/logo_bg.png",
      logourl: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/logo%403x.png",
      brandbg: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_home_brand_bg.png"
    },
    scanImg: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_scan%402x.png",
    tab: 1,
    barColor: '#fff',
    barBgColor: 'transparent',
    iconColor: 1,
    exps: null,
    actvs: null,
    brandInfo: null,
    android: getApp().globalData.android,
    iosX: getApp().globalData.iosX,
    customNavBarHeight: getApp().globalData.customNavBarHeight,
  },
  tab_slide: function(e) { //滑动切换tab 
    var that = this;
    that.setData({
      tab: e.detail.current
    });
  },
  tab_click: function(e) { //点击tab切换
    var that = this;
    if (that.data.tab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        tab: e.target.dataset.current
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this,
      lm = require('../../../models/bm_applyee_schema.js'),
      OSS = require('../../../models/ali-oss.js'),
      bmconfig = require('../../../models/bm_config.js'),
      brandId = bmconfig.bm_baizao_id,
      store = require('../../../models/bm-data.js').store;
    that.setData({
      brandId: brandId
    })
    if (!lm.checkIsLogin()) {
      wx.redirectTo({
        url: '/pages/register/register'
      })
      return
    }

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });
    let client = new OSS({
      region: 'oss-cn-beijing',
      accessKeyId: 'LTAINO7wSDoWJRfN',
      accessKeySecret: 'PcDzLSOE86DsnjQn8IEgbaIQmyBzt6',
      bucket: 'bmsass'
    });
    store.clearStore()
    store.Query('reservableitems', 'page[number]=1&page[size]=3&ne[end-date]=-1&ne[start-date]=-1&status=1&brand-id=' + brandId).then(result => {
      let _originRes = result, newres = [];

      newres = _originRes.map((ele) => {
        let _originImg = ele.sessioninfo.cover;
        ele.sessioninfo.dealCover = client.signatureUrl(_originImg);
        if (ele.sessioninfo.aub == -1 && ele.sessioninfo.alb == -1) {
          ele.sessioninfo.hasAge = false;
        } else {
          ele.sessioninfo.hasAge = true;
        }
        return ele;
      })

      that.setData({
        exps: newres,
      })
    })

    // store.Query('reservableitems', 'page[number]=1&page[size]=3&ne[end-date]=-1&ne[start-date]=-1&status=0&brand-id=' + brandId).then(result => {
    //   let _originRes = result,
    //     newres = [];

    //   newres = _originRes.map((ele) => {
    //     let _originImg = ele.sessioninfo.cover;
    //     ele.sessioninfo.dealCover = client.signatureUrl(_originImg);
    //     if (ele.sessioninfo.aub == -1 && ele.sessioninfo.alb == -1) {
    //       ele.sessioninfo.hasAge = false;
    //     } else {
    //       ele.sessioninfo.hasAge = true;
    //     }
    //     return ele;
    //   })

    //   that.setData({
    //     actvs: newres,
    //   })
    // })
    that.setData({
      actvs: [{
        "sessioninfo": {
          "category": {
            "title": "222",
          },
          "alb": 2,
          "aub": 3,
          "title": "444",
        }
      }],
    })
    store.Find('brands', bmconfig.bm_baizao_id).then(res => {
      let logo = res.logo;
      res.newLogo = client.signatureUrl(logo);
      that.setData({
        brandInfo: res,
        mername: res.title,
        bar: wx.getStorageSync('mername')
      })
      wx.setStorage({
        key: "mername",
        data: res.title,
        bar: wx.getStorageSync('mername')
      })
    })

    store.Find('yards', bmconfig.bm_baizao_yard_id).then(res => {

      let tagimgs = res.images.filter(function (e) {
        //过滤作用
        return e.flag == 0;
      })
      let newimgs = tagimgs.map((ele) => {
        let tagImg = ele.img;
        ele.dealImg = client.signatureUrl(tagImg);
        return ele
      })

      if (res.images.length > 0) {
        res.cover1 = res.images[0].dealImg;
      }
      if (res.images.length > 1) {
        res.cover2 = res.images[1].dealImg;
      }
      if (res.images.length > 2) {
        res.cover3 = res.images[2].dealImg;
      }

      wx.setStorage({
        key: "yardname",
        data: res.address
      })
      wx.setStorage({
        key: 'yardtag',
        data: res.Tagimgs,
      })
      that.setData({
        yardInfo: res,
      })
    })

    wx.stopPullDownRefresh();
    wx.hideNavigationBarLoading();
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
    wx.showNavigationBarLoading();
    this.onLoad();
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

  scanclick: function(res) {
    wx.scanCode({
      success: (res) => {
        let parse = require('url-parse')
        let url = parse(res.path, true);

        let tmp = url.query.redir
        let tid = url.query.reservableid
        let dir = ''
        if (tmp && tmp.startsWith('exp') && tid && tid != "") {
          dir = '/pages/reservableitems/detail/detail?expid=' + tid
        } else if (tmp && tmp.startsWith('actv') && tid && tid != "") {
          dir = '/pages/activity/detail/detail?actvid=' + tid
        } else if (tmp && tmp.startsWith('pre')) {
          dir = '/pages/preregister/preregister'
        } else {
          dir = '/pages/brand/info/info'
        }
        console.log(dir)
        if (dir.length > 0) {
          wx.navigateTo({
            url: dir,
          })
        } else {
          console.log('二维码错误')
        }
      }
    })
  },

  backToList() {
    wx.redirectTo({
      url: '/pages/brand/lst/lst'
    })
  },

  brandApply(event){
    wx.navigateTo({
      url: '/pages/booking/appointment/brandorder/brandorder'
    })
  },

  onPageScroll: function (e) {
    let that = this
    if(e.scrollTop > 182) {
      if(that.data.barBgColor === 'transparent'){
        that.setData({
          barBgColor: '#fff',
          barColor: '#000',
          iconColor: 2,
        })
      }
    }
    if (e.scrollTop < 182) {
      if (that.data.barBgColor === '#fff') {
        that.setData({
          barBgColor: 'transparent',
          barColor: '#fff',
          iconColor: 1,
        })
      }
    }
  },
})