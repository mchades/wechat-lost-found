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
  todetail: function (e) {    
    let infoType = e.currentTarget.dataset.infoType;
    let subtitle = '&subtitle='+ e.currentTarget.dataset.subtitle;
    let date = '&date=' + e.currentTarget.dataset.date;
    let state = '&state='+e.currentTarget.dataset.state;
    let pic = '&pic='+e.currentTarget.dataset.pic;
    let description = '&description='+e.currentTarget.dataset.description;
    wx.navigateTo({
      url: '../detail/detail?infoType=' + infoType + subtitle + date + state + pic + description
    })
  },
  onLoad: function (){
    console.log('onLoad')
  }
})
