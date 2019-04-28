Page({

  /**
   * 页面的初始数据
   */
  data: {
    labelArray: [
      {
        name: '擦窗'
      },
      {
        name: '洗空调'
      },
      {
        name: '洗空调'
      },
      {
        name: '清洗抽油烟机'
      },
      {
        name: '零工'
      },
      {
        name: '临时工'
      },
      {
        name: '洗冰箱'
      },
      {
        name: '清洗办公室'
      }
    ],
    isAgree: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  switchChange(e) {
    this.setData({
      isAgree: e.detail.value
    })
    console.log(this.data.isAgree)
  },
})