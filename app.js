//app.js
App({
  globalData: {
    userInfo: null,
    hasLogin: false,
    openId: null,
    orderNo:'',
<<<<<<< HEAD
    base:'http://gqwqfw.natappfree.cc'
=======
<<<<<<< HEAD
    base:'https://xcx.keeko.ai'
=======
    base:'http://gqwqfw.natappfree.cc'
>>>>>>> 1.1
>>>>>>> 1.1
  },
  onLaunch: function () {
    var self=this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

  }
})