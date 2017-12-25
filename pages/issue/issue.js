// issue.js
var util=require('../../utils/util.js');
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picNum:0,
    newInfo: { 
      state: "未解决",
      subtitle:"",
      description:"",
      infoType:""
    }
  },
  // 上传图片
  chooseImg:function(){
    var that=this
    wx.chooseImage({
      count:5,
      success: function(res) {
        that.setData({
          'newInfo.pic': res.tempFilePaths,
          picNum: res.tempFilePaths.length
        })
      },
    })
  },
  //保存消息类型
  radioChange:function(e){
    this.setData({
      'newInfo.infoType':e.detail.value
    })
  },

  //保存消息标题
  setTitle:function(e){
    this.setData({
      'newInfo.subtitle': e.detail.value
    })
  },
  setDescription:function(e) {
    this.setData({
      'newInfo.description': e.detail.value
    })
  },

  //点击发布
  issue(){
    //判断信息是否填写完整
    if (this.data.newInfo.infoType === ""){
      wx.showToast({
        title: '请选择信息类型',
        image: '../image/warn.png',
        duration: 2000
      })
    } else if (this.data.newInfo.subtitle === ""){
      wx.showToast({
        title: '请填写信息标题',
        image: '../image/warn.png',
        duration: 2000
      })
    } else if (this.data.newInfo.description === ""){
      wx.showToast({
        title: '请填写信息内容',
        image: '../image/warn.png',
        duration: 2000
      })
    }else{
      //获取发布时间
      var time = util.formatTime(new Date());
      this.setData({
        'newInfo.date': time,
        'newInfo.openid': app.globalData.openid,
        'newInfo.author': app.globalData.userInfo.nickName
      })
      //无图片则设置默认图片
      var that = this
      if (this.data.picNum === 0){
        this.setData({
          'newInfo.pic': ["../image/logo.jpg"],
        })
      }
      //将发布信息添加到首页消息列表中
      app.globalData.userLatest=false
      app.globalData.allInfo.unshift(that.data.newInfo)
      let pages = getCurrentPages()
      let prePage = pages[pages.length - 2]
      let preInfo = prePage.data.infoList
      preInfo.unshift(that.data.newInfo)
      prePage.setData({
        infoList: preInfo
      })
      //同步至服务端
      wx.request({
        method: "post",
        url: 'https://172.25.50.90:443/LostAndFound/addInform',
        data: {
          openID: 'oe9QO0dt18vMu1UmgGi6Xb2UvPaE',
          session_key: '',
          author: that.data.newInfo.author,
          subtitle: that.data.newInfo.subtitle,
          infoType: that.data.newInfo.infoType,
          description: that.data.newInfo.description,
          pic: that.data.newInfo.pic,
          date: that.data.newInfo.date,
          state: that.data.newInfo.state
        },
        header: {
          'content-Type': 'application/json',
          'charset': 'UTF - 8'
        },
        success: function (res) {
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 3000
          })
          wx.navigateBack()
          console.log(res.data);  //data
        }
      })
    }    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    //console.log(app.globalData.openid) 
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