// pages/brand-detail/brand-detail.js
// import { JsonApiDataStore } from '../../../miniprogram_npm/jsonapi-datastore/index.js'
var OSS = require('../../../models/ali-oss.js')
// var bmstore = new JsonApiDataStore();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		brand: null,
    yard: null,
    teachers: [],
    barColor: '#fff',
    barBgColor: 'transparent',
    iconColor: 1,
    customNavBarHeight: getApp().globalData.customNavBarHeight,
    pageContantHeight: getApp().globalData.pageContantHeight,
    brandbg: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_home_brand_bg.png"
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    // bmstore.reset();
		this.setData({
			android: getApp().globalData.android,
			iosX: getApp().globalData.iosX
		});
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
    
		let that = this
		let store = require('../../../models/bm-data.js').store;
		let bmconfig = require('../../../models/bm_config.js')
    store.clearStore()
		store.Find('brands', bmconfig.bm_baizao_id).then(res => {
      console.log("{&&&&&&&&&&&&"+res['brand-tags'])
			let logo = res.logo;
			res.newLogo = client.signatureUrl(logo);
			let images = res.images;
			if(images != null) {
					images.map((ele) => {
							let honorsImg = ele.img;
							ele.dealImg = client.signatureUrl(honorsImg);
							return ele
					})
			}

      //过滤
			function honorFunc (tmp) {
					return tmp.flag == 1;
			}
			function certFunc(tmp) {
					return tmp.flag == 2;
			}
			res.Honors = images.filter(honorFunc);
			res.Certifications = images.filter(certFunc);

			let found = res.found;
			res.time = new Date(found).getFullYear();
			that.setData({
					brand: res
			})
      //场馆查询
      store.clearStore()
      store.Find('yards', bmconfig.bm_baizao_yard_id).then(res => {
        console.log(res)
        that.setData({
          yard: res,
        })
      })

      //教师查询
      store.clearStore()
      store.Query('teachers', "brand-id="+bmconfig.bm_baizao_id).then(res => {
        console.log(res)
        let teachers = res;
        //对教师icon做处理
        teachers.map((ele) => {
          let icon = ele.icon
          if (icon != null && icon.length > 0) {
            ele.dealImg = client.signatureUrl(icon);
          }else {
            ele.dealImg = "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/4.png"
          }
          return ele
        })
        
        that.setData({
          teachers: teachers,
        })
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

  onPageScroll: function (e) {
    let that = this
    if (e.scrollTop > 385) {
      if (that.data.barBgColor === 'transparent') {
        that.setData({
          barBgColor: '#fff',
          barColor: '#000',
          iconColor: 2,
        })
      }
    }
    if (e.scrollTop < 385) {
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