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


    //获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          //说明用户信息已经授权，可直接调用wx.getUserInfo获取，
          wx.getUserInfo({
            success: res => {
              console.log(res)
              this.globalData.userInfo = res.userInfo;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
  }

})