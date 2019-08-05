//用户扫一扫进入该页面 获取小程序二维码带来的参数
const app = getApp()
Page({
  onLoad: function (options) {   
    var mac = decodeURIComponent(options.mac)
    app.globalData.mac = mac;
    wx.redirectTo({
      url: '/pages/login/login'
    })
  }
})