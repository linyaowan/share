const app = getApp()

Page({
  onShareAppMessage() {
    return {
      title: '微信登录',
      path: 'pages/login/login'
    }
  },

  onLoad() {
    this.setData({
      hasLogin: app.globalData.hasLogin
    })
  },
  data: {},
  login() {
    const that = this
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     console.log(res);
    //   }
    // })
    // 登录
    wx.login({
      success: res => {
        app.globalData.hasLogin = true
        that.setData({
          hasLogin: true
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: "https://xcx.keeko.ai/api/getOpenId",
          data: {
            code: res.code
          },
          method: 'GET',
          success: function (result) {
            var data = result.data;
            if (data.code == 200) {
              self.globalData.openId = data.msg      
            }
          }
        })
      }
    })
  },

  selfGetInfo(e) {
    // this.login();
    //出现授权弹窗，用户点了允许
    if (e.detail.userInfo) {
      app.globalData.userinfo = e.detail.userInfo;
      this.setData({
        avatarUrl: e.detail.userInfo.avatarUrl
      })
      wx.request({
        url: "https://xcx.keeko.ai/api/saveUserInfo",
        data: {
          avatarUrl: e.detail.userInfo.avatarUrl,
          userNickName: e.detail.userInfo.userNickName,
          userGender: e.detail.userInfo.userGender,
          userCity: e.detail.userInfo.userCity,
          userProvince: e.detail.userInfo.userProvince
        },
        method: 'post',
        success: function (result) {
          this.setData({
            mac: app.globalData.mac
          })
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
      })
    } else {
      //用户点了拒绝 ，则wx.getUserInfo这个方法，不会出现弹窗，直接进入fail的回调中
      this.selfModal();
    }
  },
  selfModal: function () {   
    wx.showModal({
      title: '提示',
      content: '请接受授权，否则会影响你的使用效果',
      showCancel: false,//不显示取消按钮
      success: res => {
        if (res.confirm) {
          console.log('用户点击了确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
    
})
