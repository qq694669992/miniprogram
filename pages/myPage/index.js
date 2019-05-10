import api from '../../api/apiList'
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
        console.log(res.data)
        that.setData({
          userId: res.data
        })
        that.getUserInfo()
        console.log(that.data.msgList)
      },
    })
    console.log(this.data.userId)
  },
  getUserInfo: function() {
    let that = this
    let query = {
      userid: that.data.userId
    }
    api.getUserCenter(query).then((res) => {
      console.log(res.data)
      let data = res.data
      if (data.code === 'S0A00000') {
        that.setData({
          msgList: data.data
        })
      }
    })
  },
  toPage: function(event) {
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
      wx.navigateTo({
        url: event.currentTarget.dataset.url
      })
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
    wx.navigateTo({
      url: '../login/index',
    })
  }
})