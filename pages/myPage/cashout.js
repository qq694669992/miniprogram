import api from '../../api/apiList'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    userBalance: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getStorage({
      key: 'userId',
      success(res) {
        console.log(res.data)
        that.setData({
          userId: res.data
        })
        that.getUserBalance()
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getUserBalance() {
    let query = {
      userid: this.data.userId
    }
    api.getUserBalance(query).then(res => {
      let data = res.data
      if (data.code === 'S0A00000') {
        this.setData({
          userBalance: data.userBalance
        })
      }
    })
  },
  cashout(e) {
    if (e.detail.value.amount === '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 1000
      })
    } else if (e.detail.value.relName === '') {
      wx.showToast({
        title: '请输入银行卡',
        icon: 'none',
        duration: 1000
      })
    } else if (e.detail.value.bankCard === '') {
      wx.showToast({
        title: '请输入提现金额',
        icon: 'none',
        duration: 1000
      })
    } else {
      let query = {
        userid: this.data.userId,
        amount: e.detail.value.amount,
        relName: e.detail.value.relName,
        bankCard: e.detail.value.bankCard,
      }
      api.cashWithdrawal(query).then(res => {
        let data = res.data
        if (data.code === 'S0A00000') {
          wx.showToast({
            title: '提现成功',
            icon: 'none',
            duration: 1000
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1000)
        }
      })
    }
  }
})