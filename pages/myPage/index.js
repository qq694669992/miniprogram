import api from '../../api/apiList'
const app = getApp()
Page({
  data: {
    userId: '',
    msgList: {}
  },
  onShow () {
    let that = this
    wx.getStorage({
      key: 'userId',
      success (res) {
        that.setData({
          userId: res.data
        })
        that.getUserInfo()
      },
    })
  },
  getUserInfo: function() {
    let that = this
    let query = {
      userid: that.data.userId
    }
    api.getUserCenter(query).then((res) => {
      console.log(res.data)
      let data = res.data
      wx.setStorageSync('account', data.data.account)
      wx.setStorageSync('headImage', data.data.headImage)
      wx.setStorageSync('phone', data.data.phone)
      if (data.code === 'S0A00000') {
        that.setData({
          msgList: data.data
        })
      }
    })
  },
  toPage: function(event) {
    console.log(event.currentTarget.dataset.url)
    console.log(this.data.msgList.isverified)
    if (this.data.userId === '') {
      wx.showToast({
        title: '请先登陆',
        icon: 'none',
        duration: 1000,
      })
      setTimeout(function() {
        wx.navigateTo({
          url: '../login/index',
        })
      }, 1000)
    } else {
      if (event.currentTarget.dataset.url === 'myAuthentication' && this.data.msgList.isverified === 1) {
        wx.showToast({
          title: '已认证',
          icon: 'none',
          duration: 1000
        })
      } else {
        wx.navigateTo({
          url: event.currentTarget.dataset.url
        })
      }
    }
  },
  logOut: function() {
    var that = this
    wx.showModal({
      title: '',
      content: '是否退出登陆？',
      success(res) {
        if (res.confirm) {
          api.loginOut().then((res) => {
            if (res.data.code === 'S0A00000') {
              wx.removeStorage({
                key: 'userId',
                success: function (res) {
                  that.setData({
                    userId: ''
                  })
                },
              })
            }
          })
        } else {

        }
      }
    })
  },
  login: function () {
    app.goAuthPages()
    // wx.navigateTo({
    //   url: '../login/index',
    // })
  }
})