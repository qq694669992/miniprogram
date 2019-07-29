import api from '../../api/apiList'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNo: '',
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderNo: options.orderNo
    })
    console.log(this.data.orderNo)
    this.getDetails()
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
  getDetails() {
    let query = {
      orderNo: this.data.orderNo
    }
    api.getOrderDetails(query).then((res) => {
      console.log(res.data)
      let data = res.data
      if (data.code === 'S0A00000') {
        this.setData({
          list: data.data,
        })
      }
    })
  },
  switchChange(e) {
    this.setData({
      isAgree: e.detail.value
    })
    console.log(this.data.isAgree)
  },
})