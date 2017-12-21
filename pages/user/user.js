// pages/user/user.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    granted: false,
    resolve: "已解决",
    infoList: [{
      subtitle: "在操场丢了钱包一个校园卡一",
      infoType: "丢失",
      state: "已解决",
      author: "McHades",
      date: "2017-08-20",
      description: "数计学院校园卡如图所示，失主请联系1200202124**",
      pic: ["../image/logo.jpg"]
    }, {
      subtitle: "在风雨操场捡到帽子",
      infoType: "拾到",
      state: "未解决",
      author: "McHades",
      date: "2017-08-20 17：23",
      description: "在风雨操场的东边捡到傻帽一顶，放在主席台旁边请自己去拿",
      pic: ["../image/hat.png"]
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onload')
  },
  regiser: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
        granted: true,
      })
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 点击授权登录按钮
   */
  toVip: function () {
    wx.navigateTo
      ({
        url: '../vip/vip'
      })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data.userInfo)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})