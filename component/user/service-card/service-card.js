// component/user/service-card/service-card.js
var bmconfig = require('../../../models/bm_config.js')
var OSS = require('../../../models/ali-oss.js')
// let reservableid;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: "Array",
      value: [],
      observer: function(news, olds, path) {
        let that = this;
        let client = new OSS({
          region: 'oss-cn-beijing',
          accessKeyId: 'LTAINO7wSDoWJRfN',
          accessKeySecret: 'PcDzLSOE86DsnjQn8IEgbaIQmyBzt6',
          bucket: 'bmsass'
        });
        if (news != null && news.length != 0) {
          news.map((ele) => {
            console.log(ele);
            console.warn('---')

            ele.dealImage = client.signatureUrl(ele['reservable-cover'])
            var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
            var date = new Date(ele['except-time']);
            var seperator1 = "-";
            var seperator2 = ":";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            var week = date.getDay();
            var hour = date.getHours();
            var minute = date.getMinutes();

            function addZero(m) {
              return m < 10 ? '0' + m : m;
            }
            ele.deal_expect_time = year + seperator1 + addZero(month) + seperator1 + (strDate) + ' ' + weekDay[week] + ' ' + addZero(hour) + seperator2 + addZero(minute);
            return ele;
          })

          that.setData({
            noValue: false,
            lists: news
          })
        } else {
          that.setData({
            noValue: true
          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    lists: null,
    noValue: false,
    card: [{
        title: "探索科学小屋",
        cover: 'https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_brandcard-bg%402x.jpg',
        address: "五道口",
        time: "2019-02-22 周五 10:30",
        price: "¥ 免费",
      },
      {
        title: "探索科学小屋",
        cover: 'https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/img_brandcard-bg%402x.jpg',
        address: "五道口",
        time: "2019-02-22 周五 10:30",
        price: "¥ 免费",
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    serviceDetail: function(event) {
      
      let appliesid = event.currentTarget.dataset.appliesid;
      wx.navigateTo({
        url: '../../booking/appointment/result/result?appliesid=' + appliesid+'&fromServerList=1'
      })
    }
  }
})