const app = getApp()

Page({

  onLoad() {
    this.setData({
      hasLogin: app.globalData.hasLogin,
      mac: app.globalData.mac
    })
    this.login();
  },
  data: {},
  login() {
    const that = this
    
    var mac = that.data.mac;
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
            app.globalData.openId = data.msg 
            if (data.code == 200) {
              var status = '1'
              if (status=='0'){
                  //有用户信息 跳转订单页面
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
          }
        })
      }
    })
  },

  selfGetInfo(e) {
     var that=this;
     var mac=this.data.mac;
    //出现授权弹窗，用户点了允许
    if (e.detail.userInfo) {
      app.globalData.userinfo = e.detail.userInfo;     
      console.log("jahsjdkaskdhkash++++++++++" + e.detail.userInfo.province)
      wx.request({
        url: "https://xcx.keeko.ai/api/saveUserInfo",
        data: {
          userAvatarUrl: e.detail.userInfo.avatarUrl,
          userNickName: e.detail.userInfo.nickName,
          userGender: e.detail.userInfo.gender,
          userCity: e.detail.userInfo.city,
          userProvince: e.detail.userInfo.province,
          openId:app.globalData.openId

        },
        method: 'post',
        success: function (result) {
          console.log(mac)
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
