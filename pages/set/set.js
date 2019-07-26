//用户扫一扫进入该页面 获取小程序二维码带来的参数
Page({
  onLoad: function (options) {
    // options 中的 scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    var deviceNo = decodeURIComponent(options.deviceNo)
    var type = decodeURIComponent(options.type)
    if (deviceNo) {
      wx.redirectTo({
        url: 'pages/order/order?deviceNo=' + deviceNo + "&type=" + type

      })
      console.log("deviceNo:=============" + deviceNo);
    }
    console.log("deviceNo:=============" + deviceNo);
  }
})