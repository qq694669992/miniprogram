import api from '../../api/apiList'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: '0',
    list: [],
    compSorting: 'YES',
    distanceSorting: 'NO',
    evaluateSorting: 'NO',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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
    wx.navigateTo({
      url: '../orderTaking/search'
    })
  },
  chosenView: function (event) {
    let id = event.currentTarget.id
    if (id === 'all') {
      this.setData({
        activeIndex: '0',
        compSorting: 'YES',
        distanceSorting: 'NO',
        evaluateSorting: 'NO',
      })
    } else if (id === 'near') {
      this.setData({
        activeIndex: '1',
        compSorting: 'NO',
        distanceSorting: 'YES',
        evaluateSorting: 'NO',
      })
    } else if (id === 'praise') {
      this.setData({
        activeIndex: '2',
        compSorting: 'NO',
        distanceSorting: 'NO',
        evaluateSorting: 'YES',
      })
    }
    this.getList()
  },
  getList: function () {
    let that = this
    let params = {
      compSorting: that.data.compSorting,
      distanceSorting: that.data.distanceSorting,
      evaluateSorting: that.data.evaluateSorting,
    }
    api.workcomplete(params).then((res) => {
      let data = res.data
      if (data.code === 'S0A00000') {
        that.setData({
          list: data.works
        })
      }
    })
  },
})