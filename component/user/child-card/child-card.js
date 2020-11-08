// component/user/child-card/child-card.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        kids: {
            type: Array,
            value: [],
            observer: function (news, olds, path) {
                let that = this;
                //console.log("1*************")
                if(news != null && news.length != 0) {
                    console.log("2*************")
                    news.map((ele) => {
                        if (ele.gender === 0) {
                          //console.log("11*************")
                          ele.sex = '女'
                        } else if (ele.gender === 1) {
                          //console.log("21*************")
                          ele.sex = '男'
                        } else {
                          //console.log("31*************")
                          ele.sex = '未知'
                        }

                        let dob = new Date(ele.dob);
                        let dn = new Date();
                        let res_age = dn.getFullYear() - dob.getFullYear();
                        ele.age = res_age
                    }) 
                    that.setData({
                        noValue: false,
                        child: news,
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
        noValue: false,
        sex: '',
        age: '',
        icon: "https://bm-mini.oss-cn-beijing.aliyuncs.com/demo/icon_chevron_right_dark%402x.png",
        child: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        addChild: function (event) {
            let childid = event.currentTarget.dataset.childid;
            wx.navigateTo({
              url: '/pages/booking/appointment/addkid/addkid?wherefrom=managerkids&&candel=1&childid=' + childid
            })
        }
    }
})
