Page({

  /**
  * 页面的初始数据
  */
  data: {
    send: false,
    alreadySend: false,
    second: 60,
    disabled: true,
    buttonType: 'default',
    phoneNum: '',
    code: '',
    reSend: false,
  },


  // 手机号部分
  inputPhoneNum: function (e) {
    let phoneNum = e.detail.value
    if (phoneNum.length === 11) {
      let checkedNum = this.checkPhoneNum(phoneNum)
      if (checkedNum) {
        this.setData({
          phoneNum: phoneNum
        })
        console.log('phoneNum=' + this.data.phoneNum)
        this.showSendMsg()
        this.activeButton()
      }
    } else {
      this.setData({
        phoneNum: ''
      })
      this.hideSendMsg()
    }
  },
  


  checkPhoneNum: function (phoneNum) {
    let str = /^1[34578]\d{9}$/
    if (str.test(phoneNum)) {
      return true
    } else {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
      return false
    }
  },

  showSendMsg: function () {
    if (!this.data.alreadySend) {
      this.setData({
        send: true
      })
    }
  },

  hideSendMsg: function () {
    this.setData({
      send: false,
      disabled: true,
      buttonType: 'default'
    })
  },

  sendMsg: function () {
    this.setData({
      alreadySend: true,
      send: false,
      reSend: false,
    })
    this.countdown()
    
    let callback = {
      onPushSuccess: function (res) {
        console.log(res)
        wx.hideLoading();
      },
      onPushFail: function (err) {
        console.log(err);
        wx.hideLoading();
      }
    }
    let lm = require('../../models/bm_applyee_schema.js');
    lm.pushPhoneNum(this.data.phoneNum, callback);
  },

  countdown: function () {
    var that = this
    var second = this.data.second
    if (second == 0) {
      that.setData({
        second: 60,
        alreadySend: false,
        send: false,
        reSend: true
      })
      return
    }
    var time = setTimeout(function () {
      that.setData({
        second: second - 1
      })
      that.countdown(that)
    }, 1000)
  },

  // 验证码
  addCode: function (e) {
    this.setData({
      code: e.detail.value
    })
    this.activeButton()
  },

  // 按钮
  activeButton: function () {
    //let{} es6的解构赋值。大括号中的key对应item的key 其值也是相对应的
    let { phoneNum, code } = this.data
    console.log(this.data)
    if (phoneNum) {
      this.setData({
        disabled: false,
        buttonType: 'primary'
      })
    } else {
      this.setData({
        disabled: true,
        buttonType: 'default'
      })
    }
  },
  // 提交
  onSubmit: function () {
    console.log('onSubmit')
    // 模拟校验验证码
    if (this.data.code == '123456') {
      wx.showToast({
        title: '验证成功',
        icon: 'success'
      })
    } else {
      wx.showToast({
        title: '验证失败',
        icon: 'none'
      })
    }

  },
  showInfo: function (event) {
    let that = this;
    // let callback = {
    //   onCheckSuccess: function (res) {
    //     if(res.data.status == 'ok') {
    //       wx.setStorageSync('phone', that.data.phoneNum);
    //       let openid = wx.getStorageSync('dd_open_id')
    //       var lm = require('../../models/bm_applyee_schema.js');
    //       let uinfo = JSON.parse(wx.getStorageSync('dd_uinfo'));
    //       let cb = {
    //         onPushSuccess: function () {
    //           getApp().onLoginSuccess = true;
    //           wx.hideLoading();
    //           wx.switchTab({
    //             url: '/pages/brand/lst/lst',
    //           })
    //         },
    //         onPushFail: function () {
    //           console.log('push failed');
    //           wx.hideLoading();
    //         }
    //       }
    //       lm.pushApplee(openid, uinfo, that.data.phoneNum, cb); //改成了在电话号码录入的时候进行用户验证
    //       //lm.changePhoneNum(uinfo, that.data.phoneNum, callback); //标记待完善

    //     } else if (res.data.status == 'error') {
    //       wx.showToast({
    //         title: '验证码错误',
    //         icon: 'none'
    //       })
    //     }
    //     // wx.hideLoading();
    //   },
    //   onCheckFail: function (err) {
    //     console.log(err);
    //     // wx.hideLoading();
    //   }
    // }
    // let lm = require('../../models/bm_applyee_schema.js');
    // lm.checkPhoneNum(this.data.phoneNum, this.data.code, callback);
    wx.hideLoading();
    wx.switchTab({
      url: '/pages/brand/lst/lst',
    })
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {

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

  }
})