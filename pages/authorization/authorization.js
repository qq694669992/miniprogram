Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function () {
    var that = this;
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      let userInfo = e.detail.userInfo
      wx.setStorageSync('nickName', userInfo.nickName)
      wx.setStorageSync('nickIcon', userInfo.avatarUrl)
      wx.navigateTo({
        url: '/pages/login/index',
      })
    } else {
      //用户按了拒绝按钮
      // wx.showModal({
      //   title: '警告',
      //   content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
      //   showCancel: false,
      //   confirmText: '返回授权',
      //   success: function (res) {
      //     // 用户没有授权成功，不需要改变 isHide 的值
      //     if (res.confirm) {
      //       console.log('用户点击了“返回授权”');
      //     }
      //   }
      // });
    }
  }
})