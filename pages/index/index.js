//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    searching: false,
    keyword: '',
    confirmSearch: false,
    resultNum: 0,
    serchInfo: [],
    allInfo: [],
    resolve: "已解决",
    infoList: []
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //跳转到信息发布页
  toissue: function () {
    if (app.globalData.userInfo === null) {
      wx.showToast({
        title: '请先登录',
        image: '../image/warn.png',
        duration: 1000
      })
    } else {
      wx.navigateTo({
        url: '../issue/issue'
      })
    }
  },
  //显示搜索页
  showSearch: function () {
    this.setData({
      searching: true
    })
  },
  //取消搜索
  cancel: function () {
    this.setData({
      searching: false,
      confirmSearch: false,
      infoList: app.globalData.allInfo
    })
  },
  //开始搜索
  search: function (e) {
    var that = this
    var keyword = e.detail.value
    wx.request({
      method: "post",
      url: 'https://172.25.50.90:443/LostAndFound/search',
      data: {
        keyword: keyword,
      },
      header: {
        'content-Type': 'application/json',
        'charset': 'UTF - 8'
      },
      success: function (res) {
        /* res.data的内容为ok */
        that.setData({
          infoList: res.data,
          confirmSearch: true,
          resultNum: res.data.length
        })
        console.log(res.data);  //data
      },
      fail: function (res) {
        console.log('首页信息获取失败' + res)
      }
    })
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
  onLoad: function () {
    console.log('onLoad')
    this.setData({
      infoList: app.globalData.allInfo
    })
  },
  onShow: function () {
    var that=this
    if (!app.globalData.indexLatest){
      //发起刷新请求
      wx.request({
        method: "post",
        url: 'https://172.25.50.90:443/LostAndFound/returnAll',
        header: {
          'content-Type': 'application/json',
          'charset': 'UTF - 8'
        },
        data: {},
        success: function (res) {
          /* res.data的内容为ok */
          app.globalData.allInfo = res.data,
            that.setData({
              infoList: res.data
            })
          console.log(res.data);
          app.globalData.indexLatest=true
        }
      })
    }
    console.log(this.data.userInfo)
    console.log(app.globalData.userInfo)
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that=this
    wx.showNavigationBarLoading()
    //发起刷新请求
    wx.request({
      method: "post",
      url: 'https://172.25.50.90:443/LostAndFound/returnAll',
      header: {
        'content-Type': 'application/json',
        'charset': 'UTF - 8'
      },
      data: {},
      success: function (res) {
        /* res.data的内容为ok */
        app.globalData.allInfo = res.data,
        that.setData({
          infoList: res.data
        })
          console.log(res.data);  //data
        console.log(app.globalData.allInfo)
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  }
})
