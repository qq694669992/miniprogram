Page({
  data: {

  },
  toMyMsg: function() {
    wx.navigateTo({
      url: 'myMsg'
    })
  },
  logOut: function() {
    wx.navigateTo({
      url: '../login/index',
    })
  }
})