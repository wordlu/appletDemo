// component/classes/cla-reward/cla-reward.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    exp: {
      type: "Array",
      value: [],
      observer: function (news, olds, path) {
          let that = this;
          if (news != null) {
             if (news.sessioninfo.acquisition == '' || news.sessioninfo.acquisition == null) {
                that.setData({
                    ifreward: false,
                })
             }
          }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
      "img": "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_gift.png",
      "title": "宝贝将获得",
      "reward": [
        "机器人搭建工具一套", "证书", "奖品",
      ],
      ifreward: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
