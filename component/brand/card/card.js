// component/common/brand-card/brand-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: "Array",
      value: [
        {
          "category": {
            "title": "11111",
          },
          "title": "22222",
          "slogan": "33333",
          "brand-tags": ["4","5","6"]
        }
      ],
      observer: function(news, olds, path) {
        this.setData({
          list: news
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    logo: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/logo.png",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showBrandDetail: function(event) {
      let brandid = event.currentTarget.dataset.brandid;
      let bmconfig = require('../../../models/bm_config.js');
      bmconfig.bm_baizao_id = brandid;
      wx.navigateTo({
        url: '/pages/brand/info/info',
      })
    }
  }
})