// pages/disinfectStatus/disinfectStatus.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.disinfectStatus()
  },
  disinfectStatus:function(){
    var that=this;
    var timerTem = setInterval(function () {
      wx.request({
        url: 'http://u9z2jv.natappfree.cc/push/getDisinfectStatus/' + app.globalData.orderNo,
        data: {
        },
        method: 'GET',
        success: function (res) {
          if (res.data.data.status==7){
            clearInterval(timerTem);
            that.setData({
              msg:'消毒完成'
            })
          }
        }
      })
    }, 1000)
    // 保存定时器name
  }
})