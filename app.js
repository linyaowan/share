//app.js
App({
  globalData: {
    userInfo: null,
    hasLogin: false,
    openId: null,
  },
  onLaunch: function () {
    var self=this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

  }
})