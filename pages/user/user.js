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
    infoList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onload')

  },
  //点击授权登陆
  regiser: function () {
    var that = this
    if (app.globalData.userInfo) {

    } else {
      wx.showLoading({
        title: '正在登录',
      })
      wx.login({
        success: function (res) {
          console.log('login success' + res.code)
          if (res.code) {
            //发起网络请求
            wx.request({
              method: "post",
              url: 'https://172.17.174.142:443/LostAndFound/onMessage',
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
                console.log('拉取个人信息成功')
                console.log(res)
                console.log(res.data.openid)
                if (typeof res.data.openid == "undefined") {
                  wx.showToast({
                    title: '网络错误',
                    image: '../image/warn.png'
                  })
                } else {
                  app.globalData.granted = true;
                  app.globalData.openid = res.data.openid;
                  app.globalData.role = res.data.role;
                  app.getUserInfo(function (userInfo) {
                    //更新数据
                    that.setData({
                      userInfo: userInfo,
                      granted: true,
                      note: '点击首页图标发布信息',
                      infoList: res.data.case
                    })
                  })
                }
                wx.hideLoading()
              },
              fail: function (res) {
                console.log('个人信息请求失败' + res.errMsg)
              }
            })
          } else {
            console.log('没有获取到code' + res)
          }
        },
        fail: function (res) {
          console.log('login failed' + res.code)
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    if (app.globalData.userLatest === false) {
      console.log("123")
      wx.request({
        method: "post",
        url: 'https://172.17.174.142:443/LostAndFound/refresh',
        data: {
          openID: app.globalData.openid,
        },
        header: {
          'content-Type': 'application/json',
          'charset': 'UTF - 8'
        },
        success: function (res) {
          app.globalData.role = ''
          that.setData({
            infoList: res.data,
          })
          app.globalData.userLatest = true
          console.log(res)
        },
        fail: function (res) {
          console.log('个人信息请求失败' + res.errMsg)
        }
      })
    }
  },
  //跳转到信息详情页
  todetail: function (e) {
    let infoType = e.currentTarget.dataset.infoType;
    let subtitle = '&subtitle=' + e.currentTarget.dataset.subtitle;
    let date = '&date=' + e.currentTarget.dataset.date;
    let state = '&state=' + e.currentTarget.dataset.state;
    let pic = '&pic=' + e.currentTarget.dataset.pic;
    let description = '&description=' + e.currentTarget.dataset.description;
    let author = '&author=' + e.currentTarget.dataset.author;
    let num = '&num=' + e.currentTarget.dataset.num;
    let openid = '&openid=' + e.currentTarget.dataset.openid;
    wx.navigateTo({
      url: '../detail/detail?infoType=' + infoType + subtitle + date + state + pic + description + author + num + openid
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this
    if (app.globalData.granted) {
      console.log("个人中心发起刷新请求")
      //发起刷新请求
      wx.request({
        method: "post",
        url: 'https://172.17.174.142:443/LostAndFound/refresh',
        data: {
          openID: app.globalData.openid,
        },
        header: {
          'content-Type': 'application/json',
          'charset': 'UTF - 8'
        },
        success: function (res) {
          that.setData({
            infoList: res.data,
          })
          app.globalData.userLatest = true
          console.log(res)
        },
        fail: function (res) {
          wx.showToast({
            title: '网络错误',
            image: '../image/warn.png'
          })
          console.log('个人信息请求失败' + res.errMsg)
        }
      })
    }
    wx.stopPullDownRefresh() //停止下拉刷新
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