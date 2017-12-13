//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    resolve:"已解决",
    infoList:[{
      subtitle:"在风雨操场丢了钱包一个校园卡一张",
      infoType:"丢失",
      state:"已解决",
      date:"2017-08-20",
      pic:["../image/logo.jpg"]
      },{
      subtitle: "在风雨操场捡到帽子",
      infoType: "拾到",
      state: "未解决",
      date: "2017-08-20 17：23",
      pic: ["../image/logo.jpg"]
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toissue:function() {
    wx.navigateTo({
      url: '../issue/issue'
    })
  },
  todetail: function () {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  onLoad: function (){
    console.log('onLoad')
  }
})
