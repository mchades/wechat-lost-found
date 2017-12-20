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
      state: "未解决"
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
    //获取发布时间
    var time=util.formatTime(new Date());
    this.setData({
      'newInfo.date': time,
      'newInfo.author': app.globalData.userInfo.nickName
    })
    //将发布信息传到首页
    var that=this
    let pages = getCurrentPages()
    let prePage = pages[pages.length - 2]
    let preInfo = prePage.data.infoList
    let author = prePage.data.infoList
    preInfo.unshift(that.data.newInfo)
    prePage.setData({
      infoList: preInfo
    })
    wx.navigateBack()
    console.log(preInfo)
    // console.log(data.newInfo)
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