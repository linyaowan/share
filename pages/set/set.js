//用户扫一扫进入该页面 获取小程序二维码带来的参数
const app = getApp()
Page({
  onLoad: function (options) {
    var mac = decodeURIComponent(options.mac)
    app.globalData.mac = mac;
    this.setData({
      userInfo: app.globalData.userInfo
    })
    if(userInfo=='null'){
      wx.redirectTo({
        url: '/pages/login/login'
      })
    }else{
      // options 中的 scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
      if (mac != "undefined") {
        wx.redirectTo({
          url: '/pages/order/order?mac=' + mac
        })
      } else {
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    }
  }
})