//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    searching:false,
    keyword:'',
    confirmSearch:false,
    resultNum:0,
    serchInfo:[],
    allInfo:[],
    resolve:"已解决",
    infoList:[{
      subtitle:"在操场丢了钱包一个校园卡一",
      infoType:"丢失",
      state:"已解决",
      author:"小明",
      date:"2017-08-20",
      description:"数计学院校园卡如图所示，失主请联系1200202124**",
      pic:["../image/logo.jpg"]
      },{
      subtitle: "在风雨操场捡到帽子",
      infoType: "拾到",
      state: "未解决",
      author:"大明",
      date: "2017-08-20 17：23",
      description: "在风雨操场的东边捡到傻帽一顶，放在主席台旁边请自己去拿",
      pic: ["../image/hat.png"]
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //跳转到信息发布页
  toissue:function() {
    if (app.globalData.userInfo === null){
      wx.showToast({
        title: '请先登录',
        image:'../image/warn.png',
        duration: 2000
      })
    }else{
      wx.navigateTo({
        url: '../issue/issue'
      })
    }    
  },
  //显示搜索页
  showSearch:function(){
    this.setData({
      searching:true
    })
  },
  //取消搜索
  cancel:function(){
    this.setData({
      searching: false,
      confirmSearch: false,
      //infoList: this.data.allInfo
    })
  },
  //开始搜索
  search:function(e){
    wx.request({
      method: "post",
      url: 'https://172.17.174.220:443/LostAndFound/search',
      data: {
        keyword: '裤子',
      },
      header: {
        'content-Type': 'application/json',
        'charset': 'UTF - 8'
      },
      success: function (res) {
        /* res.data的内容为ok */
        this.setData({
          infoList: res.data,
          confirmSearch:true,
          resultNum: res.data.length
        })
        console.log(res.data);  //data
        console.log(resultNum);
      }
    })
  },
  //跳转到信息详情页
  todetail: function (e) {    
    let infoType = e.currentTarget.dataset.infoType;
    let subtitle = '&subtitle='+ e.currentTarget.dataset.subtitle;
    let date = '&date=' + e.currentTarget.dataset.date;
    let state = '&state='+e.currentTarget.dataset.state;
    let pic = '&pic='+e.currentTarget.dataset.pic;
    let description = '&description='+e.currentTarget.dataset.description;
    let author = '&author=' + e.currentTarget.dataset.author;
    wx.navigateTo({
      url: '../detail/detail?infoType=' + infoType + subtitle + date + state + pic + description + author
    })
  },
  onLoad: function (){
    console.log('onLoad')
    console.log(this.data.userInfo)
    this.setData({
      infoList: app.globalData.allInfo
    })
  },
  onShow:function(){
    console.log(this.data.userInfo)
    console.log(app.globalData.userInfo)
  }
})
