import api from '../../api/apiList.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    activeIndex: '',
    pageNo: 1,
    orderList: [],
    totalCount: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        that.setData({
          userId: res.data
        })
        that.getList()
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
  chosenView: function (event) {
    let id = event.currentTarget.id
    this.setData({
      activeIndex: id,
      orderList: [],
      pageNo: 1,
    })
    console.log(this.data.activeIndex)
    this.getList()
  },
  getList() {
    let query = {
      userid: this.data.userId,
      workstatus: this.data.activeIndex,
      pageNo: this.data.pageNo,
      pageSize: 10,
    }
    api.getWorks(query).then(res => {
      let orderList = this.data.orderList
      if (this.data.pageNo === '1') {
        orderList = []
      }
      if (res.data.data.works && res.data.data.works.length) {
        orderList = [...orderList, ...res.data.data.works]
      }
      this.setData({
        orderList: orderList,
        totalCount: res.data.data.totalCount
      })
    })
  },
  onReachBottom() {
    if (parseInt(this.data.totalCount / 10) > this.data.pageNo) {
      this.setData({
        pageNo: this.data.pageNo + 1
      })
      this.getList()
    }
  },
  toReleaseDetails: function (e) {
    wx.navigateTo({
      url: '../orderTaking/releaseDetails?recruitId=' + e.currentTarget.dataset.recruitid,
    })
  }
})