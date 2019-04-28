Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    userList: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getStorage({
      key: 'userId',
      success(res) {
        that.setData({
          userId: res.data
        })
        that.getUserInfo()
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
  getUserInfo: function () {
    let that = this
    wx.request({
      url: 'https://www.paizhao66.net/server/usercenter/getUserInfo',
      data: {
        "id": that.data.userId
      },
      method: 'GET',
      success: function(res) {
        console.log(res)
        let data = res.data
        if (data.code === 'S0A00000') {
          that.setData({
            userList: data.user
          })
        }
      }
    })
  },
  logOut: function () {
    wx.navigateTo({
      url: '../login/index',
    })
  }
})