// component/reservableitems/show-items/show-items.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isRemarks: {
      type: String,
      value: 'true',
    },
    exp: {
      type: "Array",
      value: [],
      observer: function (news, olds, path) {
        if (news != null) {
          if (news.sessioninfo.including != null) {
            this.setData({
              exp: news,
              hasRemark: true
            })
          } else {
            this.setData({
              hasRemark: false
            })
          }
        } else {
          this.setData({
            hasRemark: false
          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hasRemark: true,
    "remarks": [
      "教学用具", "免费的饮品和零食",
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
