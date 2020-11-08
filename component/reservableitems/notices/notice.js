// component/classes/cla-notices/cla-notice.js
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
        if(news != null) {
            if (news.sessioninfo.accompany == 1) {
                that.setData({
                    acc: "需要家长陪同"
                })
            } else {
                that.setData({
                    acc: "不需要家长陪同"
                })
            }
          if (news.sessioninfo.carrying == "" || news.sessioninfo.carrying == null ) {
                that.setData({
                  bring: false
                })
          }
          if (news.sessioninfo.notice != '' && news.sessioninfo.notice != null) {
              that.setData({
                otherNotice: true
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
      acc: '不需要家长陪同',
    "bringImg": "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_bring%402x.png",
    "bringTitle": "参与者需自带",
    "bringList": [
      "蜡笔", "手套", "铅笔"
    ],
    "noticeImg": "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_warning%402x.png",
    "noticeTitle": "参与须知",
    "noticeList": [
      "需家长陪同", "着装建议、身体情况限制、接送说明",
    ],
    bring: true,
    notice: true,
    otherNotice: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
