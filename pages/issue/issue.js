// issue.js
var util = require('../../utils/util.js');
const qiniuUploader = require("../../utils/qiniuUploader");

// 初始化七牛相关参数
function initQiniu() {
  console.log('initQiniu 调用')
  var options = {
    region: 'SCN', // 华北区
    uptokenURL: 'https://172.17.174.142/LostAndFound/token',
    // uptoken: 'xxxx',
    domain: 'http://p1i3zjqui.bkt.clouddn.com',
    shouldUseQiniuFileName: false
  };
  qiniuUploader.init(options);
}
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    picNum: 0,
    newInfo: {
      state: "未解决",
      subtitle: "",
      description: "",
      infoType: "",
      pic:''
    }
  },
  // 上传图片
  didPressChooesImage: function () {
    var that = this;
    didPressChooesImage(that);
  },
  //保存消息类型
  radioChange: function (e) {
    this.setData({
      'newInfo.infoType': e.detail.value,
    })
  },

  //保存消息标题
  setTitle: function (e) {
    this.setData({
      'newInfo.subtitle': e.detail.value
    })
  },
  setDescription: function (e) {
    this.setData({
      'newInfo.description': e.detail.value
    })
  },

  //点击发布
  issue() {
    //判断信息是否填写完整
    if (this.data.newInfo.infoType === "") {
      wx.showToast({
        title: '请选择信息类型',
        image: '../image/warn.png',
      })
    } else if (this.data.newInfo.subtitle === "") {
      wx.showToast({
        title: '请填写信息标题',
        image: '../image/warn.png',
      })
    } else if (this.data.newInfo.description === "") {
      wx.showToast({
        title: '请填写信息内容',
        image: '../image/warn.png',
      })
    } else {
      //获取发布时间
      var time = util.formatTime(new Date());
      this.setData({
        'newInfo.date': time,
        'newInfo.openid': app.globalData.openid,
        'newInfo.author': app.globalData.userInfo.nickName
      })
      var that = this
      //将发布信息添加到首页消息列表中
      app.globalData.userLatest = false
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
        url: 'https://172.17.174.142:443/LostAndFound/addInform',
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
          console.log(res.data);  //data
        }
      })
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 1000
      })
      wx.navigateBack()
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
    if (app.globalData.indexLatest === false){
      console.log('indexLatest false')

    }
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

function didPressChooesImage(that) {
  console.log('didPressChooesImage 调用')
  initQiniu();
  // 微信 API 选文件
  wx.chooseImage({
    count: 1,
    success: function (res) {
      var filePath = res.tempFilePaths[0];
      // 交给七牛上传
      qiniuUploader.upload(filePath, (res) => {
        that.setData({
          'picNum':1,
          'newInfo.pic': res.imageURL
        });
        console.log(that.data.imageObject)
      }, (error) => {
        console.error('error: ' + JSON.stringify(error));
      }
      );
    }
  })
}