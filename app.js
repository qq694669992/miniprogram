//app.js
var QQMapWX = require('./utils/qqmap-wx-jssdk.js')
App({
  data: {
    isAuthorization: false
  },
  onLaunch: function () {
    this.getLocation()
  },

  getLocation() {
    var that = this, qqmapsdk;
    qqmapsdk = new QQMapWX({
      key: '3WEBZ-TJ3C4-2ETUI-XMQGU-4K3FS-AQBFQ'
    })
    wx.getLocation({
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude,
          },
          success: function(res) {
            var address = []
            var province = res.result.address_component.province || ''
            var city = res.result.address_component.city || ''
            var district = res.result.address_component.district || ''
            address.push(province, city, district)
            wx.setStorageSync('location', address)
          }
        })
      },
    })
  },

  // 检查是去登录还是授权
  goAuthPages() {
    wx.getSetting({
      success(res) {
        console.log(res)
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '/pages/authorization/authorization',
          })
        } else {
          wx.navigateTo({
            url: '/pages/login/index'
          })
        }
      }
    })
  },

})