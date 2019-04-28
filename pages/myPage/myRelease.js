Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: '0',
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
  chosenView: function (event) {
    let id = event.currentTarget.id
    if (id === 'all') {
      this.setData({
        activeIndex: '0'
      })
    } else if (id === 'jxz') {
      this.setData({
        activeIndex: '1'
      })
    } else if (id === 'wwc') {
      this.setData({
        activeIndex: '2'
      })
    } else if (id === 'ywc') {
      this.setData({
        activeIndex: '3'
      })
    }
  }
})