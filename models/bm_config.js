var host = 'https://api.dongdakid.com'
// var host = 'http://192.168.100.174:2019'
// var brandid = '5be6a00b8fb80736e2ec9ba5'
var brandid = wx.getStorageSync('brandid')
var yardid = '5bebbe3d8fb8074f6440dcca'

var actvPrice = [
  {
    actvId: "5bec89ae8fb80730e07b9e56",
    price: "免费"
  },
  {
    actvId: "5beea5ab8fb80759ab78e5db",
    price: "免费"
  },
  {
    actvId: "5bf4232b21235c000163c24b",
    price: "108起"
  },
  {
    actvId: "5bf43aa721235c000163c33c",
    price: "VIP免費使用"
  },
  {
    actvId: "5bf68dc6b078430001508ff1",
    price: "49起"
  },
]

module.exports = {
  bm_service_host: host,
  bm_baizao_id: brandid,
  bm_baizao_yard_id: yardid,
  bm_baizao_actvPrice: actvPrice
}