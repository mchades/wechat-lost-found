// pages/user/user.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    granted: false,
    note: '登录后可发布信息',
    userInfo: {
      nickName: '授权登录'
    },
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
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: userInfo,
        granted: true,
        note: '点击首页图标发布信息'
      })
    } else {
      wx.login({
        success: function (res) {
          console.log(res.code)
          if (res.code) {
            //发起网络请求
            wx.request({
              method: "post",
              url: 'https://172.17.174.220:443/LostAndFound/onMessage',
              data: {
                js_code: res.code,
                appid: 'wxb00fd2d44e2450a9',
                appSecret: 'd071b4bbe0bb76be90831ad95c5c966d',
                session_key: '',
                openID: 'oe9QO0dt18vMu1UmgGi6Xb2UvPaE',
              },
              header: {
                'content-Type': 'application/json',
                'charset': 'UTF - 8'
              },
              success: function (res) {
                console.log(res)
                app.getUserInfo(function (userInfo) {
                  //更新数据
                  that.setData({
                    userInfo: userInfo,
                    granted: true,
                    note: '点击首页图标发布信息'
                  })
                  app.globalData.granted = true;
                })
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      })
    }



    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo,
    //     granted: true,
    //     note:'点击首页图标发布信息'
    //   })
    //   app.globalData.granted=true;
    // })

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
    console.log(app.globalData)
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