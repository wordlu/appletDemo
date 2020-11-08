// pages/booking/appointment/order/order.js
let reservableid;
let kidArray;
let expect_date;
let detailName;
let detailSort;
let phone;
let datePicker;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    yardname: wx.getStorageSync('yardname'),
    detailSort: wx.getStorageSync('detailSort'),
    detailName: wx.getStorageSync('detailName'),
    add_icon: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/add%402x.png",
    note_icon: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_warning_border%402x.png",
    note_text: "注意事项：现场付费",
    date: '',
    choosedKidsId: [],
    bar: '提交订单',
    showTelModal: false,
    errorInfo: false,
    now: '',
    price: '免费',
    android: getApp().globalData.android,
    iosX: getApp().globalData.iosX,
    customNavBarHeight: getApp().globalData.customNavBarHeight,
    pageContantHeight: getApp().globalData.pageContantHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    reservableid = options.reservableid;
    detailSort = wx.getStorageSync('detailSort');
    detailName = wx.getStorageSync('detailName');
    /**
     * TODO: 传过来的为时间戳转换后的字符串，这里又转换为时间戳。黑人问号。
     * 现在是时间戳的传递
     */
    datePicker = options.datePicker;
    expect_date = Number(datePicker);
    let that = this,
    lm = require('../../../../models/bm_applyee_schema.js'),
    bmconfig = require('../../../../models/bm_config.js'),
    store = require('../../../../models/bm-data.js').store,
    nowdate = this.getNowFormatDate(datePicker, true),
    now = this.getNowFormatDate(new Date(), false);
    phone = wx.getStorageSync('phone');

    bmconfig.bm_baizao_actvPrice.map((ele) => {
      if (reservableid === ele.actvId) {
        that.setData({
          price: ele.price
        })
      }
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
        exp_date: nowdate,
        phone: wx.getStorageSync('phone'),
        detailName: wx.getStorageSync('detailName'),
        now: now
      })
    })
    if (!lm.checkIsLogin()) {
      wx.redirectTo({
        url: '/pages/register/register'
      })
      return
    }
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
  /**
   * 将字符串转为时间戳 再转为字符串加上周几
   */
  getNowFormatDate: function(e, hasWeek) {
    var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    var date = new Date(Number(e));
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var week = date.getDay();

    function addZero(m) {
      return m < 10 ? '0' + m : m;
    }
    let stringTime = '';
    if (hasWeek) {
      stringTime = year + seperator1 + addZero(month) + seperator1 + (strDate) + ' ' + weekDay[week];
    } else {
      stringTime = year + seperator1 + addZero(month) + seperator1 + (strDate);
    }
    return stringTime;
  },
  bindExceptDateChange: function(e) {
    var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    var date = new Date(e.detail.value);
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var week = date.getDay();

    function addZero(m) {
      return m < 10 ? '0' + m : m;
    }
    expect_date = new Date(e.detail.value).getTime();
    this.setData({
      exp_date: year + seperator1 + addZero(month) + seperator1 + (strDate) + ' ' + weekDay[week]
    })
  },

  addChild: function() {
    wx.redirectTo({
      url: '/pages/booking/appointment/addkid/addkid?wherefrom=order&reservableid=' + reservableid + '&datePicker=' + datePicker,
    })
  },

  inputTel: function() {
    let that = this,
      kid = this.data.choosedKidsId;
    if (kid.length == 0) {
      this.setData({
        errorInfo: true
      })
      setTimeout(function() {
        that.setData({
          errorInfo: false
        })
      }, 1600)
    } else {
      if (expect_date != undefined && detailName != undefined && detailSort != undefined && reservableid != undefined) {
        this.setData({
          showTelModal: true
        })
      }
    }
  },

  commitReserve: function() {
    let that = this,
    bmconfig = require('../../../../models/bm_config.js');

    if (expect_date != undefined && detailName != undefined && detailSort != undefined && reservableid != undefined && phone != undefined && phone != '') {
      let store = require('../../../../models/bm-data.js').store,
        tmp_appliesdatum = {
          "apply-time": new Date().getTime(),
          "except-time": expect_date,
          "brand-id": bmconfig.bm_baizao_id,
          "course-name": detailName,
          "course-type": detailSort,
          "reservable-id": reservableid,
          "status": 0,
          "contact": phone,
          "kid-ids": this.data.choosedKidsId,
          "applicant-id": wx.getStorageSync('dd_id'),
        },
        appliesdata = store.createRecord('applies', tmp_appliesdatum);
        store.clearStore()
        store.Save('applies', appliesdata).then(res => {
          that.setData({
            showTelModal: false
          })
        wx.navigateTo({
          url: '/pages/booking/appointment/result/result?appliesid=' + res.id,
        })
      })
    }
  },

  kidRadioChange: function(e) {
    let choosedKidId = e.detail.value,
      kids = this.data.kids,
      choosedKidsId = [];

    choosedKidsId = kids.map(ele => {
      if (ele.id === choosedKidId) {
        return ele.id
      }
    })
    this.setData({
      choosedKidsId: choosedKidsId.filter(function(ele) {
        if(ele) {
          return ele;
        }
      })
    })
    return choosedKidsId;
  },

  bindKeyInput: function(e) {
    phone = e.detail.value
    this.setData({
      phone: e.detail.value
    })
  },

  closeTelModal: function(e){
    this.setData({
      showTelModal: false,
    })
  },
})