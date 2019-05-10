import api from '../../api/apiList'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    activeIndex: '0',
    compSorting: 'YES',
    distanceSorting: 'NO',
    evaluateSorting: 'NO',
    imageUrl: 'http://img1.imgtn.bdimg.com/it/u=2735633715,2749454924&fm=26&gp=0.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      keyword: options.keyword,
    })
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
    wx.navigateBack({
      
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
  getList() {
    let query = {
      compSorting: this.data.compSorting,
      distanceSorting: this.data.distanceSorting,
      evaluateSorting: this.data.evaluateSorting,
      keyword: this.data.keyword,
    }
    api.searchList(query).then((res) => {
      console.log(res)
    })
  }
})