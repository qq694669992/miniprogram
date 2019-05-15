//app.js
App({
  data: {
    isAuthorization: false
  },
  onLaunch: function () {
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