// detail.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mine: false,
    info: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    options.pic = options.pic.split(",")
    let mine = (options.openid === app.globalData.openid)
    console.log(options.openid)
    console.log(app.globalData.openid)
    console.log(mine)
    console.log(this.data)
    this.setData({
      info: options,
      mine: mine
    })

  },
  //改变消息状态
  edit: function () {
    wx.showModal({
      title: '提示',
      content: '消息状态只能修改一次，确定修改为已解决？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //删除消息
  delete: function () {
    console.log(this.data.info)
    var that = this
    wx.showModal({
      title: '提示',
      content: '万分确定删除该条消息？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            method: "post",
            url: 'https://172.25.50.90:443/LostAndFound/delete',
            header: {
              'content-Type': 'application/json',
              'charset': 'UTF - 8'
            },
            data: {
              number: that.data.info.num
            },
            success: function (res) {
              wx.showToast({
                title: '已删除',
                icon: 'success',
                duration: 2000
              })
              app.globalData.userLatest=false
              app.globalData.indexLates = false
              wx.navigateBack()
              console.log(res.data);  //data
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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