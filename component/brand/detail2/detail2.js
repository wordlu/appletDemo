// component/brand/detail2/detail2.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    brand: {
      type: "Object",
      value: null,
      observer: function (news, olds, path) {

      }
    },
    yard: {
      type: "Object",
      value: null,
      observer: function (news, olds, path) {

      }
    },
    teachers: {
      type: "Object",
      value: null,
      observer: function (news, old, path) {

      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
      isShowMore: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showMore: function(){
      let that = this
      let change = !this.data.isShowMore
      that.setData({
        isShowMore: change,
      })
    },
  }
})
