// component/brand-banner/brand-banner.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
		name: '滴答科学乐园',
		slogan: 'whatever',
		hls: [
			{
				content:'专业外教',
			},
			{
				content:'自主研发'
			},
			{
				content:'模块化课程'
			}
		]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showSlogan: function(event) {
      wx.navigateTo({
        url: '/pages/brand/detail/detail'
      })
    }
  }
})
