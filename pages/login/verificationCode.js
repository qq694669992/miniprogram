Page({
  data: {
    phoneNum: "",
    inputLen: 4,
    iptValue: "",
    isFocus: false,
    text: '30s后 重新获取验证码',
    currentTime: 31,
    disabledSend: true,
    disabled: true
  },
  onLoad (options) {
    let beforePhone = options.phoneNum.substring(0,3)
    let afterPhone = options.phoneNum.substring(7)
    this.setData({
      phoneNum: beforePhone + "****" + afterPhone
    })
    this.countDown()
  },
  onFocus: function (e) {
    var that = this;
    that.setData({
      isFocus: true 
    });
  },
  setValue: function (e) {
    var that = this;
    that.setData({
      iptValue: e.detail.value 
    });
    if (that.data.iptValue.length === 4) {
      that.setData({
        disabled: false
      })
    }
  },
  countDown: function () {
    let that = this
    let currentTime = that.data.currentTime
    let interval = setInterval(function () {
      currentTime--
      that.setData({
        text: currentTime + 's后 重新获取验证码'
      })
      if (currentTime <=0) {
        clearInterval(interval)
        that.setData({
          text: '重新获取验证码',
          currentTime: 31,
          disabledSend: false,
        })
      }
    }, 1000)
  },
  sendCode: function () {
    let that = this
    that.setData({
      disabledSend: true
    })
    that.countDown()
  }
})