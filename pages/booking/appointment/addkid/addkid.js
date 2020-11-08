// pages/booking/appointment/addkid/addkid.js
let name;
let guardianRole;
let dob;
let gender;
let childid;
let now;
let reservableid;
let datePicker;
let isFromManage;
let isFromOrder;
let isFromBrandOrder;
let candel;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    errorInfo: false,
    date: '',
    nowdate: '',
    checkgirl: '',
    checkboy: '',
    checkfather: '',
    checkmother: '',
    checkother: '',
    rela: [{
        name: '妈妈',
        value: '妈妈',
        checked: 'checked'
      },
      {
        name: '爸爸',
        value: '爸爸',
        checked: ''
      },
      {
        name: '其他',
        value: '其他',
        checked: ''
      },
    ],
    sex: [{
        name: '男生',
        value: '男生',
        checked: 'checked'
      },
      {
        name: '女生',
        value: '女生',
        checked: ''
      },
    ],
    android: getApp().globalData.android,
    iosX: getApp().globalData.iosX,
    customNavBarHeight: getApp().globalData.customNavBarHeight,
    pageContantHeight: getApp().globalData.pageContantHeight,
    name: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let store = require('../../../../models/bm-data.js').store,
      that = this;

    ({
      reservableid,
      datePicker,
      childid,
      candel
    } = options);
    isFromManage = options.wherefrom == 'managerkids' ? true : false;
    isFromOrder = options.wherefrom == 'order' ? true : false;
    isFromBrandOrder = options.wherefrom == 'brandorder' ? true : false;

    now = this.getNowFormatDate();
    if (typeof childid == 'undefined') {
      ({
        name,
        guardianRole,
        gender,
        dob
      } = {
        dob: new Date().getTime()
      });
      this.setData({
        date: now
      })
    } else {
      store.clearStore()
      store.Find('kids', childid).then(kidInfo => {
        let date = new Date(kidInfo.dob),
          tmp_month = date.getMonth() + 1,
          month = tmp_month < 10 ? "0" + tmp_month : tmp_month,
          tmp_strDate = date.getDate(),
          strDate = tmp_strDate < 10 ? "0" + tmp_strDate : tmp_strDate,
          dealdate = date.getFullYear() + '-' + month + '-' + strDate;
        console.log(kidInfo.name);
        console.log(kidInfo['guardian-role']);
        console.log(kidInfo.gender);
        console.log(kidInfo.dob);


        name = kidInfo.name;
        guardianRole = kidInfo['guardian-role'];
        gender = kidInfo.gender;
        dob = kidInfo.dob;
        console.log(name);
        console.log(guardianRole);
        console.log(gender);
        console.log(dob);
        if (kidInfo.gender == 0) {
          that.setData({
            checkgirl: 'checked'
          })
        } else {
          that.setData({
            checkboy: 'checked'
          })
        }

        if (kidInfo['guardian-role'] == '爸爸') {
          that.setData({
            checkfather: 'checked'
          })
        } else if (kidInfo['guardian-role'] == '妈妈') {
          that.setData({
            checkmother: 'checked'
          })
        } else {
          that.setData({
            checkother: 'checked'
          })
        }

        that.setData({
          name: kidInfo.name,
          date: dealdate,
        })
      })
    }

    this.setData({
      isFromManage: isFromManage,
      isFromOrder: isFromOrder,
      isFromBrandOrder: isFromBrandOrder,
      candel: Number(candel),
      bar: '添加孩子',
      nowdate: now
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

  getNowFormatDate: function() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },

  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
    dob = new Date(e.detail.value).getTime();
  },

  radioChange: function(e) {
    guardianRole = e.detail.value
  },

  sexRadioChange: function(e) {
    if (e.detail.value == '男生') {
      gender = 1;
    } else if (e.detail.value == '女生') {
      gender = 0;
    }
  },

  bindKeyInput: function(e) {
    name = e.detail.value;
  },

  saveKid() {
    let store = require('../../../../models/bm-data.js').store,
      tmp_kidsdatum = null,
      kidsdatum = null;

    if (Boolean(name) && Boolean(dob) && gender != undefined && guardianRole.length > 0) {
      tmp_kidsdatum = {
        "id": childid,
        "applicant-id": wx.getStorageSync('dd_id'),
        "name": name,
        "dob": dob,
        "gender": gender,
        "guardian-role": guardianRole
      };
      let kidsdatum = store.createRecord('kids', tmp_kidsdatum);
          // patch = {patch: childid?true:false,id:childid }
      store.clearStore()
      store.Save('kids', kidsdatum).then(res => {
        if (isFromManage) {
          wx.navigateBack({
            delta: 1
          })
        } else if(isFromOrder){
          wx.redirectTo({
            url: '/pages/booking/appointment/order/order?reservableid=' + reservableid + '&datePicker=' + datePicker,
          })
        } else if(isFromBrandOrder){
          wx.redirectTo({
            url: '/pages/booking/appointment/brandorder/brandorder',
          })
        }
      })

    } else {
      let that = this
      this.setData({
        errorInfo: true
      })
      setTimeout(function() {
        that.setData({
          errorInfo: false
        })
      }, 2000)
    }
  },

  deleteKid() {
    let ks = require('../../../../models/bm_kids_schema.js'),
      store = require('../../../../models/bm-data.js').store;
    if (childid != undefined && childid != '') {
      store.clearStore()
      store.DeleteRecord('kids', childid).then(res => {
        name = undefined;
        dob = undefined;
        gender = undefined;
        guardianRole = undefined;
        wx.navigateBack({
          delta: 1
        })
      })
    }
  }
})