//app.js
App({
  data: {
    isAuthorization: false
  },
  onLaunch: function () {
  //   // 展示本地存储能力
  //   var logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)

  //   // 登录
  //   wx.login({
  //     success: res => {
  //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //     }
  //   })
  //   // 获取用户信息
  //   wx.getSetting({
  //     success: res => {
  //       let that = this
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             // 可以将 res 发送给后台解码出 unionId
  //             this.globalData.userInfo = res.userInfo
  //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //             // 所以此处加入 callback 以防止这种情况
  //             console.log(this.globalData.userInfo)
  //             if (this.userInfoReadyCallback) {
  //               this.userInfoReadyCallback(res)
  //             }
  //           }
  //         })
  //         that.data.isAuthorization = true
  //         console.log(1111)
  //       } else {
  //         that.data.isAuthorization = false
  //       }
  //       console.log(this.data.isAuthorization)
  //       if (this.data.isAuthorization) {
  //         wx.redirectTo({
  //           url: '../index/index',
  //         })
  //       } else {
  //         wx.redirectTo({
  //           url: 'authorization',
  //         })
  //       }
  //     }
      
  //   })
  //   // this.getCode()
  // },
  // getCode: function() {
  //   wx.request({
  //     url: 'https://www.paizhao66.net/hpService/wxLogin/033kRjSb242z1N0sLoQb2zM9Sb2kRjSM',
  //     success: function(res) {
  //       console.log(res.data)
  //     }
  //   })
  // },
  // globalData: {
  //   userInfo: null    
  // },
  // onReady: function () {
  //   console.log(this.data.isAuthorization)
   
  },
})