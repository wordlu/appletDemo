// component/reservableitems/x-scroll/x-scroll.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    exp: {
      type: "Array",
      value: [],
      observer: function (news, olds, path) {

        let normalImgs = news.map(ele=> {
            return {
              dealImg: ele.dealImg,
              tag: ele.tag
            }
        })
        this.setData({
          imgs: normalImgs
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activityInfo: [{
      title: "休息区",
      url: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_campus_type_living.jpg",
    }, {
      title: "教学区",
      url: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_campus_type_teaching.jpg",
    }, {
      title: "教学区",
      url: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_campus_type_teaching.jpg",
    }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
