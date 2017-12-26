//app.js
App
(
  {
  onLaunch: function(){
    wx.showNavigationBarLoading()
    var that = this
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //加载数据
    wx.request({
      method: "post",
      url: 'https://172.17.174.142:443/LostAndFound/returnAll',
      header: {
        'content-Type': 'application/json',
        'charset': 'UTF - 8'
      },
      data: {},
      success: function (res) {
        /* res.data的内容为ok */
        that.globalData.allInfo=res.data,
        console.log(res.data);  //data
        console.log(that.globalData.allInfo)
        wx.hideNavigationBarLoading()
      },
      fail:function(res){
        wx.showToast({
          title: '网络错误',
          image: 'pages/image/warn.png'
        })
      }
    })
  },

  getUserInfo: function(cb){
    var that = this
    if (this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else
    {
      //调用登录接口
      wx.getUserInfo
      ({
        withCredentials: false,
        success: function(res){
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: 
  {
    note: '登录后可发布信息',
    granted:false,
    role:'',
    userLatest:true,
    indexLates:true,
    openid:'',
    allInfo:[],
    userInfo: null
  }
})

