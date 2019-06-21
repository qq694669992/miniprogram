Page({

  /**
   * 页面的初始数据
   */
  data: {
    isBack: false,
    formUrl: ''
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
    let that = this
    let pages = getCurrentPages()
    let prevpage = pages[0].__displayReporter.showReferpagepath.substring(pages[0].__displayReporter.showReferpagepath.indexOf('/') + 1)
    let prevPage = prevpage.substring(0, prevpage.indexOf('.'))
    //如果 isBack 为 true，就返回上一页
    if (wx.getStorageSync('userId') === '') {
      wx.showToast({
        title: '请先登陆',
        icon: 'none',
        duration: 1000,
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '../login/index',
        })
      }, 1000)
    } else {
      if (that.data.isBack) {
        console.log(that.data.isBack)
        console.log(that.data.formUrl)
        wx.switchTab({
          url: '../' + that.data.formUrl
        })
        that.setData({
          isBack: false
        })
      } else {
        wx.navigateTo({
          url: 'writeInformation?formUrl=' + prevPage
        })
      }
    }
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
    
  }
})