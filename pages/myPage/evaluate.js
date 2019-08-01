import api from '../../api/apiList.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    orderNo: '',
    isGood: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId: wx.getStorageSync('userId'),
      orderNo: options.orderNo,
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

  checkIcon() {
    this.setData({
      isGood: !this.data.isGood
    })
  },

  sumbit(e) {
    let query = {
      orderNo: this.data.orderNo,
      isPraise: this.data.isGood ? 'Y' : 'N',
      remark: e.detail.value.remark,
      userid: this.data.userId,
    }
    api.addComment(query).then(res => {
      console.log(res)
      if (res.data.code === 'S0A00000') {
        wx.showToast({
          title: '评价成功',
          icon: 'none',
          duration: 1000,
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }
    })
  }
})