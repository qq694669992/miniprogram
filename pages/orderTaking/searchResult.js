Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: '0',
    imageUrl: 'http://img1.imgtn.bdimg.com/it/u=2735633715,2749454924&fm=26&gp=0.jpg'
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
  toSearch: function () {
    wx.navigateBack({
      
    })
  },
  chosenView: function (event) {
    let id = event.currentTarget.id
    if (id === 'all') {
      this.setData({
        activeIndex: '0'
      })
    } else if (id === 'near') {
      this.setData({
        activeIndex: '1'
      })
    } else if (id === 'praise') {
      this.setData({
        activeIndex: '2'
      })
    }
  }
})