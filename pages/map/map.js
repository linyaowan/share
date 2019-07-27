// pages/map/map.js
Page({
  data: {
    hasLocation: false,
  },
  onLoad:function(){
    this.chooseLocation()
  },
  chooseLocation: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          hasLocation: true,
          location: formatLocation(res.longitude, res.latitude),
          locationAddress: res.address
        })
      }
    })
  }
})