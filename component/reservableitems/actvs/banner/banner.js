// component/activities/acti-banner/acti-banner.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    actvs: {
      type: "Array",
      value: [],
      observer: function(news, olds, path) {
        let actv = [ ],
        brandid = '';
        if (news != null) {
          news.map((ele) => {
            brandid = ele['brand-id'];
            if (ele['start-date'] != -1 && ele['end-date'] != -1) {
              actv.push(ele)
            }
          })
          this.setData({
            actv: actv,
            brandid: brandid
          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activityInfo: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showActiDetail: function(event) {
      let actvid = event.currentTarget.dataset.actvid;
      wx.navigateTo({
        url: '/pages/reservableitems/detail/detail?expid=' + actvid
      })
    },
    showLst: function(event) {
      wx: wx.navigateTo({
        url: '/pages/reservableitems/exps/lst/lst?brandid=' + this.data.brandid + '&status=0' + '&bar=精彩活动' //这里复用了list了，不需要做分类
      })
    }
  }
})