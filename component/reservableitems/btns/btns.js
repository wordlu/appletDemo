// component/activity-banner/acti-btns/acti-btns.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isCourse: {
      type: String,
      value: "true",
    },
    exp: {
      type: "Object",
      value: null,
      observer: function (news, olds, path) {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // price: 134,
    
    // isCourse: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
