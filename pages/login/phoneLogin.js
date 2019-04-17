Page({
  data: {
    disabled: true,
  },
  keyInput (e) {
    if (e.detail.value.length === 11) {
      this.setData({
        disabled: false
      })
    } else {
      this.setData({
        disabled: true
      })
    }
  },
  toNext (e) {
    console.log(e.detail.value)
    wx.navigateTo({
      url: 'verificationCode?phoneNum=' + e.detail.value.phone
    })
  }
})