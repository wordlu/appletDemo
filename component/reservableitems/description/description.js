// component/reservableitems/description/description.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isCourse: {
      type: String,
      value: 'true',
    },
    exp: {
      type: "Array",
      value: [],
      observer: function (news, olds, path) {
        console.log("this is in about-container .js")
        console.log(news, olds)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    expending: false,
    bonus: "课程包含免费饮品",
    fee: "费用说明内容文字",
    des: "魅力魔方，一个集观测、动作、思维于一体的过程。魔方转动的过程中，慢慢认识立方体结构，提升孩子的空间思维能力；解魔方需要观察力、独立思考能力、专注力、记忆力…",
    child: "魅力魔方，一个集观测、动作、思维于一体的过程。魔方转动的过程中，慢慢认识立方体结构。",
    classes: "魅力魔方，一个集观测、动作、思维于一体的过程。魔方转动的过程中，慢慢认识立方体结构，提升孩子的空间思维能力；解魔方需要观察力、独立思考能力、专注力、记忆力…"
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

