import api from '../../api/apiList'
Page({
  data: {
    mobile: '',
    phoneNum: "",
    inputLen: 4,
    iptValue: "",
    isFocus: false,
    text: '60s后 重新获取验证码',
    currentTime: 61,
    disabledSend: true,
    disabled: true,
    codeSession: '',
  },
  onLoad (options) {
    let beforePhone = options.phoneNum.substring(0,3)
    let afterPhone = options.phoneNum.substring(7)
    this.setData({
      mobile: options.phoneNum,
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
    let query = {
      mobile: that.data.mobile
    }
    api.getVcode(query).then((res) => {
      let data = res.data
      if (data.code === 'S0A00000') {
        let currentTime = that.data.currentTime
        let interval = setInterval(function () {
          currentTime--
          that.setData({
            text: currentTime + 's后 重新获取验证码'
          })
          if (currentTime <= 0) {
            clearInterval(interval)
            that.setData({
              text: '重新获取验证码',
              currentTime: 61,
              disabledSend: false,
            })
          }
        }, 1000)
        that.setData({
          codeSession: data.sessionId
        })
      }
    })
  },
  sendCode: function () {
    let that = this
    that.setData({
      disabledSend: true
    })
    that.countDown()
  },
  toLogin (e) {
    let query = {
      mobile: this.data.mobile,
      vcode: this.data.iptValue,
      sessionId: this.data.codeSession
    }
    api.logincode(query).then((res) => {
      console.log(res)
      let data = res.data
      if (data.code === 'S0A00000') {
        wx.setStorage({
          key: 'userId',
          data: data.userId,
        })
        wx.switchTab({
          url: '/pages/myPage/index'
        })
      } else {
      }
    })
  }
})